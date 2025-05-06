'use strict';

var path = require('path');
var _ = require('lodash');
var utils = require('@strapi/utils');
var attributes = require('../../utils/attributes.js');
var constants = require('../constants.js');
var schemaHandler = require('./schema-handler.js');

const { ApplicationError } = utils.errors;
const reuseUnsetPreviousProperties = (newAttribute, oldAttribute)=>{
    _.defaults(newAttribute, _.omit(oldAttribute, [
        'configurable',
        'required',
        'private',
        'unique',
        'pluginOptions',
        'inversedBy',
        'mappedBy'
    ]));
};
function createComponentBuilder() {
    return {
        setRelation ({ key, uid, attribute }) {
            if (!_.has(attribute, 'target')) {
                return;
            }
            const targetCT = this.contentTypes.get(attribute.target);
            const targetAttribute = targetCT.getAttribute(attribute.targetAttribute);
            if (!attribute.targetAttribute) {
                return;
            }
            targetCT.setAttribute(attribute.targetAttribute, generateRelation({
                key,
                attribute,
                uid,
                targetAttribute
            }));
        },
        unsetRelation (attribute) {
            if (!_.has(attribute, 'target')) {
                return;
            }
            const targetCT = this.contentTypes.get(attribute.target);
            const targetAttributeName = attribute.inversedBy || attribute.mappedBy;
            const targetAttribute = targetCT.getAttribute(targetAttributeName);
            if (!targetAttribute) return;
            return targetCT.deleteAttribute(targetAttributeName);
        },
        /**
     * Creates a content type in memory to be written to files later on
     */ createContentType (infos) {
            const uid = createContentTypeUID(infos);
            if (this.contentTypes.has(uid)) {
                throw new ApplicationError('contentType.alreadyExists');
            }
            const contentType = schemaHandler({
                modelName: infos.singularName,
                dir: path.join(strapi.dirs.app.api, infos.singularName, 'content-types', infos.singularName),
                filename: `schema.json`
            });
            this.contentTypes.set(uid, contentType);
            // support self referencing content type relation
            Object.keys(infos.attributes).forEach((key)=>{
                const { target } = infos.attributes[key];
                if (target === '__self__') {
                    infos.attributes[key].target = uid;
                }
            });
            contentType.setUID(uid).set('kind', infos.kind || constants.typeKinds.COLLECTION_TYPE).set('collectionName', infos.collectionName || utils.strings.nameToCollectionName(infos.pluralName)).set('info', {
                singularName: infos.singularName,
                pluralName: infos.pluralName,
                displayName: infos.displayName,
                description: infos.description
            }).set('options', {
                ...infos.options ?? {},
                draftAndPublish: infos.draftAndPublish
            }).set('pluginOptions', infos.pluginOptions).set('config', infos.config).setAttributes(this.convertAttributes(infos.attributes));
            Object.keys(infos.attributes).forEach((key)=>{
                const attribute = infos.attributes[key];
                if (attributes.isRelation(attribute)) {
                    if ([
                        'manyToMany',
                        'oneToOne'
                    ].includes(attribute.relation)) {
                        if (attribute.target === uid && attribute.targetAttribute !== undefined) {
                            // self referencing relation
                            const targetAttribute = infos.attributes[attribute.targetAttribute];
                            if (targetAttribute.dominant === undefined) {
                                attribute.dominant = true;
                            } else {
                                attribute.dominant = false;
                            }
                        } else {
                            attribute.dominant = true;
                        }
                    }
                    this.setRelation({
                        key,
                        uid,
                        attribute
                    });
                }
            });
            return contentType;
        },
        editContentType (infos) {
            const { uid } = infos;
            if (!this.contentTypes.has(uid)) {
                throw new ApplicationError('contentType.notFound');
            }
            const contentType = this.contentTypes.get(uid);
            const oldAttributes = contentType.schema.attributes;
            const newAttributes = _.omitBy(infos.attributes, (attr, key)=>{
                return _.has(oldAttributes, key) && !attributes.isConfigurable(oldAttributes[key]);
            });
            const newKeys = _.difference(Object.keys(newAttributes), Object.keys(oldAttributes));
            const deletedKeys = _.difference(Object.keys(oldAttributes), Object.keys(newAttributes));
            const remainingKeys = _.intersection(Object.keys(oldAttributes), Object.keys(newAttributes));
            // remove old relations
            deletedKeys.forEach((key)=>{
                const attribute = oldAttributes[key];
                const targetAttributeName = attribute.inversedBy || attribute.mappedBy;
                // if the old relation has a target attribute. we need to remove it in the target type
                if (attributes.isConfigurable(attribute) && attributes.isRelation(attribute) && !_.isNil(targetAttributeName)) {
                    this.unsetRelation(attribute);
                }
            });
            remainingKeys.forEach((key)=>{
                const oldAttribute = oldAttributes[key];
                const newAttribute = newAttributes[key];
                if (!attributes.isRelation(oldAttribute) && attributes.isRelation(newAttribute)) {
                    return this.setRelation({
                        key,
                        uid,
                        attribute: newAttributes[key]
                    });
                }
                if (attributes.isRelation(oldAttribute) && !attributes.isRelation(newAttribute)) {
                    return this.unsetRelation(oldAttribute);
                }
                if (attributes.isRelation(oldAttribute) && attributes.isRelation(newAttribute)) {
                    const oldTargetAttributeName = oldAttribute.inversedBy || oldAttribute.mappedBy;
                    const sameRelation = oldAttribute.relation === newAttribute.relation;
                    const targetAttributeHasChanged = oldTargetAttributeName !== newAttribute.targetAttribute;
                    if (!sameRelation || targetAttributeHasChanged) {
                        this.unsetRelation(oldAttribute);
                    }
                    // keep extra options that were set manually on oldAttribute
                    reuseUnsetPreviousProperties(newAttribute, oldAttribute);
                    if (oldAttribute.inversedBy) {
                        newAttribute.dominant = true;
                    } else if (oldAttribute.mappedBy) {
                        newAttribute.dominant = false;
                    }
                    return this.setRelation({
                        key,
                        uid,
                        attribute: newAttribute
                    });
                }
            });
            // add new relations
            newKeys.forEach((key)=>{
                const attribute = newAttributes[key];
                if (attributes.isRelation(attribute)) {
                    if ([
                        'manyToMany',
                        'oneToOne'
                    ].includes(attribute.relation)) {
                        if (attribute.target === uid && attribute.targetAttribute !== undefined) {
                            // self referencing relation
                            const targetAttribute = newAttributes[attribute.targetAttribute];
                            if (targetAttribute.dominant === undefined) {
                                attribute.dominant = true;
                            } else {
                                attribute.dominant = false;
                            }
                        } else {
                            attribute.dominant = true;
                        }
                    }
                    this.setRelation({
                        key,
                        uid,
                        attribute
                    });
                }
            });
            contentType.set('kind', infos.kind || contentType.schema.kind).set([
                'info',
                'displayName'
            ], infos.displayName).set([
                'info',
                'description'
            ], infos.description).set('options', {
                ...infos.options ?? {},
                draftAndPublish: infos.draftAndPublish
            }).set('pluginOptions', infos.pluginOptions).setAttributes(this.convertAttributes(newAttributes));
            return contentType;
        },
        deleteContentType (uid) {
            if (!this.contentTypes.has(uid)) {
                throw new ApplicationError('contentType.notFound');
            }
            this.components.forEach((compo)=>{
                compo.removeContentType(uid);
            });
            this.contentTypes.forEach((ct)=>{
                ct.removeContentType(uid);
            });
            return this.contentTypes.get(uid).delete();
        }
    };
}
/**
 * Returns a uid from a content type infos
 *
 * @param {object} options options
 * @param {string} options.singularName content-type singularName
 * @returns {string} uid
 */ const createContentTypeUID = ({ singularName })=>`api::${singularName}.${singularName}`;
const generateRelation = ({ key, attribute, uid, targetAttribute = {} })=>{
    const opts = {
        type: 'relation',
        target: uid,
        autoPopulate: targetAttribute.autoPopulate,
        private: targetAttribute.private || undefined,
        pluginOptions: targetAttribute.pluginOptions || undefined
    };
    switch(attribute.relation){
        case 'oneToOne':
            {
                opts.relation = 'oneToOne';
                if (attribute.dominant) {
                    opts.mappedBy = key;
                } else {
                    opts.inversedBy = key;
                }
                break;
            }
        case 'oneToMany':
            {
                opts.relation = 'manyToOne';
                opts.inversedBy = key;
                break;
            }
        case 'manyToOne':
            {
                opts.relation = 'oneToMany';
                opts.mappedBy = key;
                break;
            }
        case 'manyToMany':
            {
                opts.relation = 'manyToMany';
                if (attribute.dominant) {
                    opts.mappedBy = key;
                } else {
                    opts.inversedBy = key;
                }
                break;
            }
    }
    // we do this just to make sure we have the same key order when writing to files
    const { type, relation, target, ...restOptions } = opts;
    return {
        type,
        relation,
        target,
        ...restOptions
    };
};

module.exports = createComponentBuilder;
//# sourceMappingURL=content-type-builder.js.map
