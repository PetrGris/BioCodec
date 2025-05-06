import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { Menu } from '@strapi/design-system';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import { useDataManager } from '../../../../hooks/useDataManager.mjs';
import { isAllowedContentTypesForRelations } from '../../../../utils/isAllowedContentTypesForRelations.mjs';
import { actions } from '../../../FormModal/reducer.mjs';

const RelationTargetPicker = ({ oneThatIsCreatingARelationWithAnother, target })=>{
    const { contentTypes, sortedContentTypesList } = useDataManager();
    const dispatch = useDispatch();
    // TODO: replace with an obj { relation: 'x', bidirctional: true|false }
    const allowedContentTypesForRelation = sortedContentTypesList.filter(isAllowedContentTypesForRelations);
    const { plugin = null, schema: { displayName } = {
        displayName: 'error'
    } } = contentTypes?.[target] ?? {};
    const handleSelect = ({ uid, plugin, title, restrictRelationsTo })=>()=>{
            const selectedContentTypeFriendlyName = plugin ? `${plugin}_${title}` : title;
            dispatch(actions.onChangeRelationTarget({
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
   */ return /*#__PURE__*/ jsxs(Menu.Root, {
        children: [
            /*#__PURE__*/ jsx(MenuTrigger, {
                children: `${displayName} ${plugin ? `(from: ${plugin})` : ''}`
            }),
            /*#__PURE__*/ jsx(Menu.Content, {
                zIndex: "popover",
                children: allowedContentTypesForRelation.map(({ uid, title, restrictRelationsTo, plugin })=>/*#__PURE__*/ jsxs(Menu.Item, {
                        onSelect: handleSelect({
                            uid,
                            plugin,
                            title,
                            restrictRelationsTo
                        }),
                        children: [
                            title,
                            " ",
                            plugin && /*#__PURE__*/ jsxs(Fragment, {
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
const MenuTrigger = styled(Menu.Trigger)`
  max-width: 16.8rem;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export { RelationTargetPicker };
//# sourceMappingURL=RelationTargetPicker.mjs.map
