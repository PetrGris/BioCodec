import { translatedErrors } from '@strapi/admin/strapi-admin';
import * as yup from 'yup';
import { CATEGORY_NAME_REGEX } from './regex.mjs';

const createCategorySchema = (usedCategoryNames)=>{
    const shape = {
        name: yup.string().matches(CATEGORY_NAME_REGEX, translatedErrors.regex.id).test({
            name: 'nameNotAllowed',
            message: translatedErrors.unique.id,
            test (value) {
                if (!value) {
                    return false;
                }
                return !usedCategoryNames.includes(value?.toLowerCase());
            }
        }).required(translatedErrors.required.id)
    };
    return yup.object(shape);
};

export { createCategorySchema };
//# sourceMappingURL=createCategorySchema.mjs.map
