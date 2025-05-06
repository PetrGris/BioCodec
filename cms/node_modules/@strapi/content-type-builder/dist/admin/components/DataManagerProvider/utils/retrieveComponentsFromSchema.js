'use strict';

var get = require('lodash/get');
var makeUnique = require('../../../utils/makeUnique.js');

const retrieveComponentsFromSchema = (attributes, allComponentsData)=>{
    const allComponents = attributes.reduce((acc, current)=>{
        const type = current.type;
        if (type === 'component') {
            const currentComponentName = current.component;
            // Push the existing compo
            acc.push(currentComponentName);
            const currentComponentAttributes = get(allComponentsData, [
                currentComponentName,
                'schema',
                'attributes'
            ], []);
            // Retrieve the nested ones
            acc.push(...retrieveComponentsFromSchema(currentComponentAttributes, allComponentsData));
        }
        if (type === 'dynamiczone') {
            const dynamicZoneComponents = current.components;
            const componentsFromDZComponents = dynamicZoneComponents.reduce((acc2, currentUid)=>{
                const compoAttrs = get(allComponentsData, [
                    currentUid,
                    'schema',
                    'attributes'
                ], []);
                return [
                    ...acc2,
                    ...retrieveComponentsFromSchema(compoAttrs, allComponentsData)
                ];
            }, []);
            return [
                ...acc,
                ...dynamicZoneComponents,
                ...componentsFromDZComponents
            ];
        }
        return acc;
    }, []);
    return makeUnique.makeUnique(allComponents);
};

exports.retrieveComponentsFromSchema = retrieveComponentsFromSchema;
//# sourceMappingURL=retrieveComponentsFromSchema.js.map
