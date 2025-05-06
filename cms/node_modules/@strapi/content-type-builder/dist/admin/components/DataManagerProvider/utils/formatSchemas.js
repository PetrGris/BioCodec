'use strict';

/**
 * Format the attributes to array instead of an object
 */ const formatSchemas = (schemas)=>{
    return Object.keys(schemas).reduce((acc, current)=>{
        const schema = schemas[current].schema;
        acc[current] = {
            ...schemas[current],
            schema: {
                ...schema,
                attributes: toAttributesArray(schema.attributes)
            }
        };
        return acc;
    }, {});
};
const toAttributesArray = (attributes)=>{
    return Object.keys(attributes).reduce((acc, current)=>{
        acc.push({
            ...attributes[current],
            name: current
        });
        return acc;
    }, []);
};

exports.formatSchemas = formatSchemas;
exports.toAttributesArray = toAttributesArray;
//# sourceMappingURL=formatSchemas.js.map
