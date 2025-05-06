import { z } from 'zod';
import { ValidationError } from './errors.mjs';

const validateZod = (schema)=>(data)=>{
        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const { message, errors } = formatZodErrors(error);
                throw new ValidationError(message, {
                    errors
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

export { validateZod };
//# sourceMappingURL=zod.mjs.map
