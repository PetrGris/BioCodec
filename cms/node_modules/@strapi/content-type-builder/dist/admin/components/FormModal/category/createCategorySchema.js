'use strict';

var strapiAdmin = require('@strapi/admin/strapi-admin');
var yup = require('yup');
var regex = require('./regex.js');

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

var yup__namespace = /*#__PURE__*/_interopNamespaceDefault(yup);

const createCategorySchema = (usedCategoryNames)=>{
    const shape = {
        name: yup__namespace.string().matches(regex.CATEGORY_NAME_REGEX, strapiAdmin.translatedErrors.regex.id).test({
            name: 'nameNotAllowed',
            message: strapiAdmin.translatedErrors.unique.id,
            test (value) {
                if (!value) {
                    return false;
                }
                return !usedCategoryNames.includes(value?.toLowerCase());
            }
        }).required(strapiAdmin.translatedErrors.required.id)
    };
    return yup__namespace.object(shape);
};

exports.createCategorySchema = createCategorySchema;
//# sourceMappingURL=createCategorySchema.js.map
