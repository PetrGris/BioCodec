'use strict';

var jsxRuntime = require('react/jsx-runtime');
var React = require('react');
var strapiAdmin = require('@strapi/admin/strapi-admin');
var designSystem = require('@strapi/design-system');
var Icons = require('@strapi/icons');
var fractionalIndexing = require('fractional-indexing');
var reactDndHtml5Backend = require('react-dnd-html5-backend');
var reactIntl = require('react-intl');
var reactRouterDom = require('react-router-dom');
var styledComponents = require('styled-components');
var dragAndDrop = require('../../constants/dragAndDrop.js');
var useDragAndDrop = require('../../hooks/useDragAndDrop.js');
var translations = require('../../utils/translations.js');
var ComponentIcon = require('../ComponentIcon.js');
var EditFieldForm = require('./EditFieldForm.js');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const Fields = ({ attributes, fieldSizes, components, metadatas = {} })=>{
    const { formatMessage } = reactIntl.useIntl();
    const layout = strapiAdmin.useForm('Fields', (state)=>state.values.layout ?? []);
    const onChange = strapiAdmin.useForm('Fields', (state)=>state.onChange);
    const addFieldRow = strapiAdmin.useForm('Fields', (state)=>state.addFieldRow);
    const removeFieldRow = strapiAdmin.useForm('Fields', (state)=>state.removeFieldRow);
    const existingFields = layout.map((row)=>row.children.map((field)=>field.name)).flat();
    /**
   * Get the fields that are not already in the layout
   * But also check that they are visible before we give users
   * the option to display them. e.g. `id` is not visible.
   */ const remainingFields = Object.entries(metadatas).reduce((acc, current)=>{
        const [name, { visible, ...field }] = current;
        if (!existingFields.includes(name) && visible === true) {
            const type = attributes[name]?.type;
            const size = type ? fieldSizes[type] : 12;
            acc.push({
                ...field,
                label: field.label ?? name,
                name,
                size
            });
        }
        return acc;
    }, []);
    const handleMoveField = ([newRowIndex, newFieldIndex], [currentRowIndex, currentFieldIndex])=>{
        /**
     * Because this view has the constraint that the sum of field sizes cannot be greater
     * than 12, we don't use the form's method to move field rows, instead, we calculate
     * the new layout and set the entire form.
     */ const newLayout = structuredClone(layout);
        /**
     * Remove field from the current layout space using splice so we have the item
     */ const [field] = newLayout[currentRowIndex].children.splice(currentFieldIndex, 1);
        if (!field || field.name === TEMP_FIELD_NAME) {
            return;
        }
        const newRow = newLayout[newRowIndex].children;
        const [newFieldKey] = generateNKeysBetween(newRow, 1, currentFieldIndex, newFieldIndex);
        /**
     * Next we inject the field into it's new row at it's specified index, we then remove the spaces
     * if they exist and recalculate into potentially two arrays ONLY if the sizing is now over 12,
     * the row and the rest of the row that couldn't fit.
     *
     * for example, if i have a row of `[{size: 4}, {size: 6}]` and i add `{size: 8}` a index 0,
     * the new array will look like `[{size: 8}, {size: 4}, {size: 6}]` which breaks the limit of 12,
     * so instead we make two arrays for the new rows `[[{size: 8}, {size: 4}], [{size: 6}]]` which we
     * then inject at the original row point with spacers included.
     */ newRow.splice(newFieldIndex, 0, {
            ...field,
            __temp_key__: newFieldKey
        });
        if (newLayout[newRowIndex].children.reduce((acc, curr)=>acc + curr.size, 0) > 12) {
            const recalculatedRows = chunkArray(newLayout[newRowIndex].children.filter((field)=>field.name !== TEMP_FIELD_NAME));
            const rowKeys = generateNKeysBetween(newLayout, recalculatedRows.length, currentRowIndex, newRowIndex);
            newLayout.splice(newRowIndex, 1, ...recalculatedRows.map((row, index)=>({
                    __temp_key__: rowKeys[index],
                    children: row
                })));
        }
        /**
     * Now we remove our spacers from the rows so we can understand what dead rows exist:
     * - if there's only spacers left
     * - there's nothing in the row, e.g. a size 12 field left it.
     * These rows are then filtered out.
     * After that, we recalculate the spacers for the rows that need them.
     */ const newLayoutWithSpacers = newLayout.map((row)=>({
                ...row,
                children: row.children.filter((field)=>field.name !== TEMP_FIELD_NAME)
            })).filter((row)=>row.children.length > 0).map((row)=>{
            const totalSpaceTaken = row.children.reduce((acc, curr)=>acc + curr.size, 0);
            if (totalSpaceTaken < 12) {
                const [spacerKey] = fractionalIndexing.generateNKeysBetween(row.children.at(-1)?.__temp_key__, undefined, 1);
                return {
                    ...row,
                    children: [
                        ...row.children,
                        {
                            name: TEMP_FIELD_NAME,
                            size: 12 - totalSpaceTaken,
                            __temp_key__: spacerKey
                        }
                    ]
                };
            }
            return row;
        });
        onChange('layout', newLayoutWithSpacers);
    };
    const handleRemoveField = (rowIndex, fieldIndex)=>()=>{
            if (layout[rowIndex].children.length === 1) {
                removeFieldRow(`layout`, rowIndex);
            } else {
                onChange(`layout.${rowIndex}.children`, [
                    ...layout[rowIndex].children.slice(0, fieldIndex),
                    ...layout[rowIndex].children.slice(fieldIndex + 1)
                ]);
            }
        };
    const handleAddField = (field)=>()=>{
            addFieldRow('layout', {
                children: [
                    field
                ]
            });
        };
    return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
        paddingTop: 6,
        direction: "column",
        alignItems: "stretch",
        gap: 4,
        children: [
            /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                alignItems: "flex-start",
                direction: "column",
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                        fontWeight: "bold",
                        children: formatMessage({
                            id: translations.getTranslation('containers.list.displayedFields'),
                            defaultMessage: 'Displayed fields'
                        })
                    }),
                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                        variant: "pi",
                        textColor: "neutral600",
                        children: formatMessage({
                            id: 'containers.SettingPage.editSettings.description',
                            defaultMessage: 'Drag & drop the fields to build the layout'
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Box, {
                padding: 4,
                hasRadius: true,
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "neutral300",
                children: /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                    direction: "column",
                    alignItems: "stretch",
                    gap: 2,
                    children: [
                        layout.map((row, rowIndex)=>/*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Root, {
                                gap: 2,
                                children: row.children.map(({ size, ...field }, fieldIndex)=>/*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Item, {
                                        col: size,
                                        direction: "column",
                                        alignItems: "stretch",
                                        children: /*#__PURE__*/ jsxRuntime.jsx(Field, {
                                            attribute: attributes[field.name],
                                            components: components,
                                            index: [
                                                rowIndex,
                                                fieldIndex
                                            ],
                                            name: `layout.${rowIndex}.children.${fieldIndex}`,
                                            onMoveField: handleMoveField,
                                            onRemoveField: handleRemoveField(rowIndex, fieldIndex)
                                        })
                                    }, field.name))
                            }, row.__temp_key__)),
                        /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Menu.Root, {
                            children: [
                                /*#__PURE__*/ jsxRuntime.jsx(designSystem.Menu.Trigger, {
                                    startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Plus, {}),
                                    endIcon: null,
                                    disabled: remainingFields.length === 0,
                                    fullWidth: true,
                                    variant: "secondary",
                                    children: formatMessage({
                                        id: translations.getTranslation('containers.SettingPage.add.field'),
                                        defaultMessage: 'Insert another field'
                                    })
                                }),
                                /*#__PURE__*/ jsxRuntime.jsx(designSystem.Menu.Content, {
                                    children: remainingFields.map((field)=>/*#__PURE__*/ jsxRuntime.jsx(designSystem.Menu.Item, {
                                            onSelect: handleAddField(field),
                                            children: field.label
                                        }, field.name))
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/**
 * @internal
 * @description Small abstraction to solve within an array of fields where you can
 * add a field to the beginning or start, move back and forth what it's index range
 * should be when calculating it's new temp key
 */ const generateNKeysBetween = (field, count, currInd, newInd)=>{
    const startKey = currInd > newInd ? field[newInd - 1]?.__temp_key__ : field[newInd]?.__temp_key__;
    const endKey = currInd > newInd ? field[newInd]?.__temp_key__ : field[newInd + 1]?.__temp_key__;
    return fractionalIndexing.generateNKeysBetween(startKey, endKey, count);
};
/**
 * @internal
 * @description chunks a row of layouts by the max size we allow, 12. It does not add the
 * spacers again, that should be added separately.
 */ const chunkArray = (array)=>{
    const result = [];
    let temp = [];
    array.reduce((acc, field)=>{
        if (acc + field.size > 12) {
            result.push(temp);
            temp = [
                field
            ];
            return field.size;
        } else {
            temp.push(field);
            return acc + field.size;
        }
    }, 0);
    if (temp.length > 0) {
        result.push(temp);
    }
    return result;
};
const TEMP_FIELD_NAME = '_TEMP_';
/**
 * Displays a field in the layout with drag options, also
 * opens a modal  to edit the details of said field.
 */ const Field = ({ attribute, components, name, index, onMoveField, onRemoveField })=>{
    const [isModalOpen, setIsModalOpen] = React__namespace.useState(false);
    const { formatMessage } = reactIntl.useIntl();
    const { value } = strapiAdmin.useField(name);
    const [{ isDragging }, objectRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop.useDragAndDrop(true, {
        dropSensitivity: 'immediate',
        type: dragAndDrop.ItemTypes.EDIT_FIELD,
        item: {
            index,
            label: value?.label,
            name
        },
        index,
        onMoveItem: onMoveField
    });
    React__namespace.useEffect(()=>{
        dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), {
            captureDraggingState: false
        });
    }, [
        dragPreviewRef
    ]);
    const composedRefs = designSystem.useComposedRefs(dragRef, objectRef);
    const handleRemoveField = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        onRemoveField(e);
    };
    const onEditFieldMeta = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
    };
    const tempRefs = designSystem.useComposedRefs(dropRef, objectRef);
    if (!value) {
        return null;
    }
    if (value.name === TEMP_FIELD_NAME) {
        return /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
            tag: "span",
            height: "100%",
            style: {
                opacity: 0
            },
            ref: tempRefs
        });
    }
    return /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Modal.Root, {
        open: isModalOpen,
        onOpenChange: setIsModalOpen,
        children: [
            /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                borderColor: "neutral150",
                background: "neutral100",
                hasRadius: true,
                style: {
                    opacity: isDragging ? 0.5 : 1
                },
                ref: dropRef,
                gap: 3,
                cursor: "pointer",
                onClick: ()=>{
                    setIsModalOpen(true);
                },
                children: [
                    /*#__PURE__*/ jsxRuntime.jsx(DragButton, {
                        tag: "span",
                        withTooltip: false,
                        label: formatMessage({
                            id: translations.getTranslation('components.DraggableCard.move.field'),
                            defaultMessage: 'Move {item}'
                        }, {
                            item: value.label
                        }),
                        onClick: (e)=>e.stopPropagation(),
                        ref: composedRefs,
                        children: /*#__PURE__*/ jsxRuntime.jsx(Icons.Drag, {})
                    }),
                    /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                        direction: "column",
                        alignItems: "flex-start",
                        grow: 1,
                        overflow: "hidden",
                        children: [
                            /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                                gap: 3,
                                justifyContent: "space-between",
                                width: "100%",
                                children: [
                                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                        ellipsis: true,
                                        fontWeight: "bold",
                                        children: value.label
                                    }),
                                    /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                                        children: [
                                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.IconButton, {
                                                type: "button",
                                                variant: "ghost",
                                                background: "transparent",
                                                onClick: onEditFieldMeta,
                                                withTooltip: false,
                                                label: formatMessage({
                                                    id: translations.getTranslation('components.DraggableCard.edit.field'),
                                                    defaultMessage: 'Edit {item}'
                                                }, {
                                                    item: value.label
                                                }),
                                                children: /*#__PURE__*/ jsxRuntime.jsx(Icons.Pencil, {})
                                            }),
                                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.IconButton, {
                                                type: "button",
                                                variant: "ghost",
                                                onClick: handleRemoveField,
                                                background: "transparent",
                                                withTooltip: false,
                                                label: formatMessage({
                                                    id: translations.getTranslation('components.DraggableCard.delete.field'),
                                                    defaultMessage: 'Delete {item}'
                                                }, {
                                                    item: value.label
                                                }),
                                                children: /*#__PURE__*/ jsxRuntime.jsx(Icons.Cross, {})
                                            })
                                        ]
                                    })
                                ]
                            }),
                            attribute?.type === 'component' ? /*#__PURE__*/ jsxRuntime.jsxs(designSystem.Flex, {
                                paddingTop: 3,
                                paddingRight: 3,
                                paddingBottom: 3,
                                paddingLeft: 0,
                                alignItems: "flex-start",
                                direction: "column",
                                gap: 2,
                                width: "100%",
                                children: [
                                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Root, {
                                        gap: 4,
                                        width: "100%",
                                        children: components[attribute.component].layout.map((row)=>row.map(({ size, ...field })=>/*#__PURE__*/ jsxRuntime.jsx(designSystem.Grid.Item, {
                                                    col: size,
                                                    direction: "column",
                                                    alignItems: "stretch",
                                                    children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                                                        alignItems: "center",
                                                        background: "neutral0",
                                                        paddingTop: 2,
                                                        paddingBottom: 2,
                                                        paddingLeft: 3,
                                                        paddingRight: 3,
                                                        hasRadius: true,
                                                        borderColor: "neutral200",
                                                        children: /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                                            textColor: "neutral800",
                                                            children: field.name
                                                        })
                                                    })
                                                }, field.name)))
                                    }),
                                    /*#__PURE__*/ jsxRuntime.jsx(designSystem.Link, {
                                        // used to stop the edit form from appearing when we click here.
                                        onClick: (e)=>e.stopPropagation(),
                                        startIcon: /*#__PURE__*/ jsxRuntime.jsx(Icons.Cog, {}),
                                        tag: reactRouterDom.NavLink,
                                        to: `../components/${attribute.component}/configurations/edit`,
                                        children: formatMessage({
                                            id: translations.getTranslation('components.FieldItem.linkToComponentLayout'),
                                            defaultMessage: "Set the component's layout"
                                        })
                                    })
                                ]
                            }) : null,
                            attribute?.type === 'dynamiczone' ? /*#__PURE__*/ jsxRuntime.jsx(designSystem.Flex, {
                                paddingTop: 3,
                                paddingRight: 3,
                                paddingBottom: 3,
                                paddingLeft: 0,
                                alignItems: "flex-start",
                                gap: 2,
                                width: "100%",
                                children: attribute?.components.map((uid)=>/*#__PURE__*/ jsxRuntime.jsxs(ComponentLink, {
                                        // used to stop the edit form from appearing when we click here.
                                        onClick: (e)=>e.stopPropagation(),
                                        to: `../components/${uid}/configurations/edit`,
                                        children: [
                                            /*#__PURE__*/ jsxRuntime.jsx(ComponentIcon.ComponentIcon, {
                                                icon: components[uid].settings.icon
                                            }),
                                            /*#__PURE__*/ jsxRuntime.jsx(designSystem.Typography, {
                                                fontSize: 1,
                                                textColor: "neutral600",
                                                fontWeight: "bold",
                                                children: components[uid].settings.displayName
                                            })
                                        ]
                                    }, uid))
                            }) : null
                        ]
                    })
                ]
            }),
            value.name !== TEMP_FIELD_NAME && /*#__PURE__*/ jsxRuntime.jsx(EditFieldForm.EditFieldForm, {
                attribute: attribute,
                name: name,
                onClose: ()=>setIsModalOpen(false)
            })
        ]
    });
};
const DragButton = styledComponents.styled(designSystem.IconButton)`
  height: unset;
  align-self: stretch;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background-color: transparent;
  border-radius: 0px;
  border-right: 1px solid ${({ theme })=>theme.colors.neutral150};
  cursor: all-scroll;

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
const ComponentLink = styledComponents.styled(reactRouterDom.NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme })=>theme.spaces[1]};
  padding: ${(props)=>props.theme.spaces[2]};
  border: 1px solid ${({ theme })=>theme.colors.neutral200};
  background: ${({ theme })=>theme.colors.neutral0};
  width: 14rem;
  border-radius: ${({ theme })=>theme.borderRadius};
  text-decoration: none;

  &:focus,
  &:hover {
    ${({ theme })=>`
      background-color: ${theme.colors.primary100};
      border-color: ${theme.colors.primary200};

      ${designSystem.Typography} {
          color: ${theme.colors.primary600};
      }
    `}

    /* > ComponentIcon */
    > div:first-child {
      background: ${({ theme })=>theme.colors.primary200};
      color: ${({ theme })=>theme.colors.primary600};

      svg {
        path {
          fill: ${({ theme })=>theme.colors.primary600};
        }
      }
    }
  }
`;

exports.Fields = Fields;
exports.TEMP_FIELD_NAME = TEMP_FIELD_NAME;
//# sourceMappingURL=Fields.js.map
