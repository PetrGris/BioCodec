'use strict';

var getTrad = require('../../../utils/getTrad.js');

const categoryForm = {
    base: {
        sections: [
            {
                sectionTitle: null,
                items: [
                    {
                        autoFocus: true,
                        name: 'name',
                        type: 'text',
                        intlLabel: {
                            id: 'global.name',
                            defaultMessage: 'Name'
                        },
                        // validations: {
                        //   required: true,
                        // },
                        description: {
                            id: getTrad.getTrad('modalForm.editCategory.base.name.description'),
                            defaultMessage: 'No space is allowed for the name of the category'
                        }
                    }
                ]
            }
        ]
    }
};

exports.categoryForm = categoryForm;
//# sourceMappingURL=form.js.map
