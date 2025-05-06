'use strict';

var zod = require('zod');
var errors = require('./errors.js');

const validateZod = (schema)=>(data)=>{
        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof zod.z.ZodError) {
                const { message, errors: errors$1 } = formatZodErrors(error);
                throw new errors.ValidationError(message, {
                    errors: errors$1
                });
            }
            throw error;
        }
    };
const formatZodErrors = (zodError)=>({
        errors: zodError.errors.map((error)=>{
            return {
                path: error.path,
                message: error.message,
                name: 'ValidationError'
            };
        }),
        message: 'Validation error'
    });

exports.validateZod = validateZod;
//# sourceMappingURL=zod.js.map
