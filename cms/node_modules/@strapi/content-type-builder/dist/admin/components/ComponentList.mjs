import { jsx } from 'react/jsx-runtime';
import get from 'lodash/get';
import { useDataManager } from '../hooks/useDataManager.mjs';
import { List } from './List.mjs';
import { Tr } from './Tr.mjs';

const ComponentList = ({ customRowComponent, component, isFromDynamicZone = false, isNestedInDZComponent = false, firstLoopComponentUid })=>{
    const { modifiedData } = useDataManager();
    const { schema: { attributes } } = get(modifiedData, [
        'components',
        component
    ], {
        schema: {
            attributes: []
        }
    });
    return /*#__PURE__*/ jsx(Tr, {
        $isChildOfDynamicZone: isFromDynamicZone,
        className: "component-row",
        children: /*#__PURE__*/ jsx("td", {
            colSpan: 12,
            children: /*#__PURE__*/ jsx(List, {
                customRowComponent: customRowComponent,
                items: attributes,
                targetUid: component,
                firstLoopComponentUid: firstLoopComponentUid || component,
                editTarget: "components",
                isFromDynamicZone: isFromDynamicZone,
                isNestedInDZComponent: isNestedInDZComponent,
                isSub: true,
                secondLoopComponentUid: firstLoopComponentUid ? component : null
            })
        })
    });
};

export { ComponentList };
//# sourceMappingURL=ComponentList.mjs.map
