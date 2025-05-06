'use strict';

const LOCALIZED_FIELDS = [
    'biginteger',
    'boolean',
    'component',
    'date',
    'datetime',
    'decimal',
    'dynamiczone',
    'email',
    'enumeration',
    'float',
    'integer',
    'json',
    'media',
    'number',
    'password',
    'richtext',
    'blocks',
    'string',
    'text',
    'time'
];
const doesPluginOptionsHaveI18nLocalized = (opts)=>typeof opts === 'object' && opts !== null && 'i18n' in opts && typeof opts.i18n === 'object' && opts.i18n !== null && 'localized' in opts.i18n && typeof opts.i18n.localized === 'boolean';

exports.LOCALIZED_FIELDS = LOCALIZED_FIELDS;
exports.doesPluginOptionsHaveI18nLocalized = doesPluginOptionsHaveI18nLocalized;
//# sourceMappingURL=fields.js.map
