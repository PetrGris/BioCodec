'use strict';

var jsxRuntime = require('react/jsx-runtime');
var get = require('lodash/get');
var useDataManager = require('../hooks/useDataManager.js');
var List = require('./List.js');
var Tr = require('./Tr.js');

const ComponentList = ({ customRowComponent, component, isFromDynamicZone = false, isNestedInDZComponent = false, firstLoopComponentUid })=>{
    const { modifiedData } = useDataManager.useDataManager();
    const { schema: { attributes } } = get(modifiedData, [
        'components',
        component
    ], {
        schema: {
            attributes: []
        }
    });
    return /*#__PURE__*/ jsxRuntime.jsx(Tr.Tr, {
        $isChildOfDynamicZone: isFromDynamicZone,
        className: "component-row",
        children: /*#__PURE__*/ jsxRuntime.jsx("td", {
            colSpan: 12,
            children: /*#__PURE__*/ jsxRuntime.jsx(List.List, {
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

exports.ComponentList = ComponentList;
//# sourceMappingURL=ComponentList.js.map
