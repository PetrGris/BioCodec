'use strict';

var jsxRuntime = require('react/jsx-runtime');
var designSystem = require('@strapi/design-system');
var reactRedux = require('react-redux');
var styledComponents = require('styled-components');
var useDataManager = require('../../../../hooks/useDataManager.js');
var isAllowedContentTypesForRelations = require('../../../../utils/isAllowedContentTypesForRelations.js');
var reducer = require('../../../FormModal/reducer.js');

const RelationTargetPicker = ({ oneThatIsCreatingARelationWithAnother, target })=>{
    const { contentTypes, sortedContentTypesList } = useDataManager.useDataManager();
    const dispatch = reactRedux.useDispatch();
    // TODO: replace with an obj { relation: 'x', bidirctional: true|false }
    const allowedContentTypesForRelation = sortedContentTypesList.filter(isAllowedContentTypesForRelations.isAllowedContentTypesForRelations);
    const { plugin = null, schema: { displayName } = {
        displayName: 'error'
    } } = contentTypes?.[target] ?? {};
    const handleSelect = ({ uid, plugin, title, restrictRelationsTo })=>()=>{
            const selectedContentTypeFriendlyName = plugin ? `${plugin}_${title}` : title;
            dispatch(reducer.actions.onChangeRelationTarget({
                target: {
                    value: uid,
                    oneThatIsCreatingARelationWithAnother,
                    selectedContentTypeFriendlyName,
                    targetContentTypeAllowedRelations: restrictRelationsTo
                }
            }));
        };
    /**
   * TODO: This should be a Select but the design doesn't match the
   * styles of the select component and there isn't the ability to
   * change it correctly.
   */ return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Menu.Root, {
        children: [
            /*#__PURE__*/ jsxRuntime.jsx(MenuTrigger, {
                children: `${displayName} ${plugin ? `(from: ${plugin})` : ''}`
            }),
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Menu.Content, {
                zIndex: "popover",
                children: allowedContentTypesForRelation.map(({ uid, title, restrictRelationsTo, plugin })=>/*#__PURE__*/ jsxRuntime.jsxs(designSystem.Menu.Item, {
                        onSelect: handleSelect({
                            uid,
                            plugin,
                            title,
                            restrictRelationsTo
                        }),
                        children: [
                            title,
                            " ",
                            plugin && /*#__PURE__*/ jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                children: [
                                    "(from: ",
                                    plugin,
                                    ")"
                                ]
                            })
                        ]
                    }, uid))
            })
        ]
    });
};
const MenuTrigger = styledComponents.styled(designSystem.Menu.Trigger)`
  max-width: 16.8rem;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

exports.RelationTargetPicker = RelationTargetPicker;
//# sourceMappingURL=RelationTargetPicker.js.map
