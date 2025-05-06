'use strict';

var _ = require('lodash');
var strapiUtils = require('@strapi/utils');
require('@strapi/types');
require('../../services/utils/configuration/attributes.js');
require('../../services/utils/configuration/settings.js');

const { PaginationError, ValidationError } = strapiUtils.errors;
const TYPES = [
    'singleType',
    'collectionType'
];
/**
 * Validates type kind
 */ const kindSchema = strapiUtils.yup.string().oneOf(TYPES).nullable();
const bulkActionInputSchema = strapiUtils.yup.object({
    documentIds: strapiUtils.yup.array().of(strapiUtils.yup.strapiID()).min(1).required()
}).required();
const generateUIDInputSchema = strapiUtils.yup.object({
    contentTypeUID: strapiUtils.yup.string().required(),
    field: strapiUtils.yup.string().required(),
    data: strapiUtils.yup.object().required()
});
const checkUIDAvailabilityInputSchema = strapiUtils.yup.object({
    contentTypeUID: strapiUtils.yup.string().required(),
    field: strapiUtils.yup.string().required(),
    value: strapiUtils.yup.string().matches(/^[A-Za-z0-9-_.~]*$/).required()
});
const validateUIDField = (contentTypeUID, field)=>{
    const model = strapi.contentTypes[contentTypeUID];
    if (!model) {
        throw new ValidationError('ContentType not found');
    }
    if (!_.has(model, [
        'attributes',
        field
    ]) || _.get(model, [
        'attributes',
        field,
        'type'
    ]) !== 'uid') {
        throw new ValidationError(`${field} must be a valid \`uid\` attribute`);
    }
};
const validateKind = strapiUtils.validateYupSchema(kindSchema);
const validateBulkActionInput = strapiUtils.validateYupSchema(bulkActionInputSchema);
const validateGenerateUIDInput = strapiUtils.validateYupSchema(generateUIDInputSchema);
const validateCheckUIDAvailabilityInput = strapiUtils.validateYupSchema(checkUIDAvailabilityInputSchema);

exports.validateBulkActionInput = validateBulkActionInput;
exports.validateCheckUIDAvailabilityInput = validateCheckUIDAvailabilityInput;
exports.validateGenerateUIDInput = validateGenerateUIDInput;
exports.validateKind = validateKind;
exports.validateUIDField = validateUIDField;
//# sourceMappingURL=index.js.map
