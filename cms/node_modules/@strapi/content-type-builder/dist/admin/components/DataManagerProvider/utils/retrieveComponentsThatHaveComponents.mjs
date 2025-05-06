import get from 'lodash/get';

const retrieveComponentsThatHaveComponents = (allComponents)=>{
    const componentsThatHaveNestedComponents = Object.keys(allComponents).reduce((acc, current)=>{
        const currentComponent = get(allComponents, [
            current
        ]);
        const compoWithChildren = getComponentWithChildComponents(currentComponent);
        if (compoWithChildren.childComponents.length > 0) {
            acc.push(compoWithChildren);
        }
        return acc;
    }, []);
    return componentsThatHaveNestedComponents;
};
const getComponentWithChildComponents = (component)=>{
    const attributes = get(component, [
        'schema',
        'attributes'
    ], []);
    return {
        component: component.uid,
        childComponents: attributes.filter((attribute)=>{
            const { type } = attribute;
            return type === 'component';
        }).map((attribute)=>{
            return {
                component: attribute.component
            };
        })
    };
};

export { getComponentWithChildComponents, retrieveComponentsThatHaveComponents };
//# sourceMappingURL=retrieveComponentsThatHaveComponents.mjs.map
