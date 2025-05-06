const validateSchema = (schema)=>{
    const dynamicZoneAttributes = Object.values(schema.attributes).filter((attribute)=>attribute.type === 'dynamiczone');
    return dynamicZoneAttributes.every((attribute)=>Array.isArray(attribute.components) && attribute.components.length > 0);
};

export { validateSchema };
//# sourceMappingURL=validateSchema.mjs.map
