import get from 'lodash/get';

const createModifiedDataSchema = (contentTypeSchema, retrievedComponents, allComponentsSchema, isInContentTypeView)=>{
    const componentsAssociatedToContentType = retrievedComponents.reduce((acc, current)=>{
        const componentSchema = get(allComponentsSchema, current, {});
        acc[current] = componentSchema;
        return acc;
    }, {});
    const keyName = isInContentTypeView ? 'contentType' : 'component';
    const schema = {
        [keyName]: contentTypeSchema,
        components: componentsAssociatedToContentType
    };
    return schema;
};

export { createModifiedDataSchema };
//# sourceMappingURL=createModifiedDataSchema.mjs.map
