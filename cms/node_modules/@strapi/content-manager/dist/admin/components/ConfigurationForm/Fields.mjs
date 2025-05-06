import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { useForm, useField } from '@strapi/admin/strapi-admin';
import { IconButton, Typography, Flex, Box, Grid, Menu, useComposedRefs, Modal, Link } from '@strapi/design-system';
import { Plus, Drag, Pencil, Cross, Cog } from '@strapi/icons';
import { generateNKeysBetween as generateNKeysBetween$1 } from 'fractional-indexing';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { ItemTypes } from '../../constants/dragAndDrop.mjs';
import { useDragAndDrop } from '../../hooks/useDragAndDrop.mjs';
import { getTranslation } from '../../utils/translations.mjs';
import { ComponentIcon } from '../ComponentIcon.mjs';
import { EditFieldForm } from './EditFieldForm.mjs';

const Fields = ({ attributes, fieldSizes, components, metadatas = {} })=>{
    const { formatMessage } = useIntl();
    const layout = useForm('Fields', (state)=>state.values.layout ?? []);
    const onChange = useForm('Fields', (state)=>state.onChange);
    const addFieldRow = useForm('Fields', (state)=>state.addFieldRow);
    const removeFieldRow = useForm('Fields', (state)=>state.removeFieldRow);
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
                const [spacerKey] = generateNKeysBetween$1(row.children.at(-1)?.__temp_key__, undefined, 1);
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
    return /*#__PURE__*/ jsxs(Flex, {
        paddingTop: 6,
        direction: "column",
        alignItems: "stretch",
        gap: 4,
        children: [
            /*#__PURE__*/ jsxs(Flex, {
                alignItems: "flex-start",
                direction: "column",
                justifyContent: "space-between",
                children: [
                    /*#__PURE__*/ jsx(Typography, {
                        fontWeight: "bold",
                        children: formatMessage({
                            id: getTranslation('containers.list.displayedFields'),
                            defaultMessage: 'Displayed fields'
                        })
                    }),
                    /*#__PURE__*/ jsx(Typography, {
                        variant: "pi",
                        textColor: "neutral600",
                        children: formatMessage({
                            id: 'containers.SettingPage.editSettings.description',
                            defaultMessage: 'Drag & drop the fields to build the layout'
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsx(Box, {
                padding: 4,
                hasRadius: true,
                borderStyle: "dashed",
                borderWidth: "1px",
                borderColor: "neutral300",
                children: /*#__PURE__*/ jsxs(Flex, {
                    direction: "column",
                    alignItems: "stretch",
                    gap: 2,
                    children: [
                        layout.map((row, rowIndex)=>/*#__PURE__*/ jsx(Grid.Root, {
                                gap: 2,
                                children: row.children.map(({ size, ...field }, fieldIndex)=>/*#__PURE__*/ jsx(Grid.Item, {
                                        col: size,
                                        direction: "column",
                                        alignItems: "stretch",
                                        children: /*#__PURE__*/ jsx(Field, {
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
                        /*#__PURE__*/ jsxs(Menu.Root, {
                            children: [
                                /*#__PURE__*/ jsx(Menu.Trigger, {
                                    startIcon: /*#__PURE__*/ jsx(Plus, {}),
                                    endIcon: null,
                                    disabled: remainingFields.length === 0,
                                    fullWidth: true,
                                    variant: "secondary",
                                    children: formatMessage({
                                        id: getTranslation('containers.SettingPage.add.field'),
                                        defaultMessage: 'Insert another field'
                                    })
                                }),
                                /*#__PURE__*/ jsx(Menu.Content, {
                                    children: remainingFields.map((field)=>/*#__PURE__*/ jsx(Menu.Item, {
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
    return generateNKeysBetween$1(startKey, endKey, count);
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
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { formatMessage } = useIntl();
    const { value } = useField(name);
    const [{ isDragging }, objectRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(true, {
        dropSensitivity: 'immediate',
        type: ItemTypes.EDIT_FIELD,
        item: {
            index,
            label: value?.label,
            name
        },
        index,
        onMoveItem: onMoveField
    });
    React.useEffect(()=>{
        dragPreviewRef(getEmptyImage(), {
            captureDraggingState: false
        });
    }, [
        dragPreviewRef
    ]);
    const composedRefs = useComposedRefs(dragRef, objectRef);
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
    const tempRefs = useComposedRefs(dropRef, objectRef);
    if (!value) {
        return null;
    }
    if (value.name === TEMP_FIELD_NAME) {
        return /*#__PURE__*/ jsx(Flex, {
            tag: "span",
            height: "100%",
            style: {
                opacity: 0
            },
            ref: tempRefs
        });
    }
    return /*#__PURE__*/ jsxs(Modal.Root, {
        open: isModalOpen,
        onOpenChange: setIsModalOpen,
        children: [
            /*#__PURE__*/ jsxs(Flex, {
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
                    /*#__PURE__*/ jsx(DragButton, {
                        tag: "span",
                        withTooltip: false,
                        label: formatMessage({
                            id: getTranslation('components.DraggableCard.move.field'),
                            defaultMessage: 'Move {item}'
                        }, {
                            item: value.label
                        }),
                        onClick: (e)=>e.stopPropagation(),
                        ref: composedRefs,
                        children: /*#__PURE__*/ jsx(Drag, {})
                    }),
                    /*#__PURE__*/ jsxs(Flex, {
                        direction: "column",
                        alignItems: "flex-start",
                        grow: 1,
                        overflow: "hidden",
                        children: [
                            /*#__PURE__*/ jsxs(Flex, {
                                gap: 3,
                                justifyContent: "space-between",
                                width: "100%",
                                children: [
                                    /*#__PURE__*/ jsx(Typography, {
                                        ellipsis: true,
                                        fontWeight: "bold",
                                        children: value.label
                                    }),
                                    /*#__PURE__*/ jsxs(Flex, {
                                        children: [
                                            /*#__PURE__*/ jsx(IconButton, {
                                                type: "button",
                                                variant: "ghost",
                                                background: "transparent",
                                                onClick: onEditFieldMeta,
                                                withTooltip: false,
                                                label: formatMessage({
                                                    id: getTranslation('components.DraggableCard.edit.field'),
                                                    defaultMessage: 'Edit {item}'
                                                }, {
                                                    item: value.label
                                                }),
                                                children: /*#__PURE__*/ jsx(Pencil, {})
                                            }),
                                            /*#__PURE__*/ jsx(IconButton, {
                                                type: "button",
                                                variant: "ghost",
                                                onClick: handleRemoveField,
                                                background: "transparent",
                                                withTooltip: false,
                                                label: formatMessage({
                                                    id: getTranslation('components.DraggableCard.delete.field'),
                                                    defaultMessage: 'Delete {item}'
                                                }, {
                                                    item: value.label
                                                }),
                                                children: /*#__PURE__*/ jsx(Cross, {})
                                            })
                                        ]
                                    })
                                ]
                            }),
                            attribute?.type === 'component' ? /*#__PURE__*/ jsxs(Flex, {
                                paddingTop: 3,
                                paddingRight: 3,
                                paddingBottom: 3,
                                paddingLeft: 0,
                                alignItems: "flex-start",
                                direction: "column",
                                gap: 2,
                                width: "100%",
                                children: [
                                    /*#__PURE__*/ jsx(Grid.Root, {
                                        gap: 4,
                                        width: "100%",
                                        children: components[attribute.component].layout.map((row)=>row.map(({ size, ...field })=>/*#__PURE__*/ jsx(Grid.Item, {
                                                    col: size,
                                                    direction: "column",
                                                    alignItems: "stretch",
                                                    children: /*#__PURE__*/ jsx(Flex, {
                                                        alignItems: "center",
                                                        background: "neutral0",
                                                        paddingTop: 2,
                                                        paddingBottom: 2,
                                                        paddingLeft: 3,
                                                        paddingRight: 3,
                                                        hasRadius: true,
                                                        borderColor: "neutral200",
                                                        children: /*#__PURE__*/ jsx(Typography, {
                                                            textColor: "neutral800",
                                                            children: field.name
                                                        })
                                                    })
                                                }, field.name)))
                                    }),
                                    /*#__PURE__*/ jsx(Link, {
                                        // used to stop the edit form from appearing when we click here.
                                        onClick: (e)=>e.stopPropagation(),
                                        startIcon: /*#__PURE__*/ jsx(Cog, {}),
                                        tag: NavLink,
                                        to: `../components/${attribute.component}/configurations/edit`,
                                        children: formatMessage({
                                            id: getTranslation('components.FieldItem.linkToComponentLayout'),
                                            defaultMessage: "Set the component's layout"
                                        })
                                    })
                                ]
                            }) : null,
                            attribute?.type === 'dynamiczone' ? /*#__PURE__*/ jsx(Flex, {
                                paddingTop: 3,
                                paddingRight: 3,
                                paddingBottom: 3,
                                paddingLeft: 0,
                                alignItems: "flex-start",
                                gap: 2,
                                width: "100%",
                                children: attribute?.components.map((uid)=>/*#__PURE__*/ jsxs(ComponentLink, {
                                        // used to stop the edit form from appearing when we click here.
                                        onClick: (e)=>e.stopPropagation(),
                                        to: `../components/${uid}/configurations/edit`,
                                        children: [
                                            /*#__PURE__*/ jsx(ComponentIcon, {
                                                icon: components[uid].settings.icon
                                            }),
                                            /*#__PURE__*/ jsx(Typography, {
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
            value.name !== TEMP_FIELD_NAME && /*#__PURE__*/ jsx(EditFieldForm, {
                attribute: attribute,
                name: name,
                onClose: ()=>setIsModalOpen(false)
            })
        ]
    });
};
const DragButton = styled(IconButton)`
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
const ComponentLink = styled(NavLink)`
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

      ${Typography} {
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

export { Fields, TEMP_FIELD_NAME };
//# sourceMappingURL=Fields.mjs.map
