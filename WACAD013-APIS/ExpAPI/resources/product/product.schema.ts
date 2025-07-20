import Joi from 'joi';

const schemaCreate = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
    stockQuantity: Joi.number().integer().min(0).required()
});
const schemaUpdate = Joi.object({
    
    name: Joi.string().min(3).max(50).optional(),
    price: Joi.number().optional(),
    stockQuantity: Joi.number().integer().min(0).optional()
});

export  { schemaCreate, schemaUpdate };