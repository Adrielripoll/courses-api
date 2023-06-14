import Joi, { LanguageMessages, ObjectSchema } from 'joi'
import { Request, Response, NextFunction } from 'express'

export const ValidationMiddleware = (Schema: ObjectSchema) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { error } = Schema.validate(request.body)
        if(!error){
            next()
        } else {
            const message = error.details.map(m => m.message).join(',').replace(/["]+/g, '')
            return response.status(422).json({ message: message })
        }
    }
}

const messages: LanguageMessages = {
    'any.required':'{{#label}} é um campo obrigatório',
    'string.empty': '{{#label}} não pode ser um campo vazio',
    'string.pattern.base': 'Senha deve conter somente letras e números e ter entre 8 e 30 caracteres',
    'string.alphanum': '{{#label}} deve conter caracteres alfa-numéricos',
    'string.base': '{{#label}} deve ser uma string',
    'string.email': '{{#label}} deve ser válido',
    'string.length': '{{#label}} deve ter exatamente {{#limit}} caracteres',
    'string.max': '{{#label}} deve ter no máximo {{#limit}} caracteres',
    'string.min': '{{#label}} deve ter pelo menos {{#limit}} caracteres',
}

export const userSchema = Joi.object({
    name: Joi.string().min(3).label('Name').required(),
    email: Joi.string().label('Email').email().required(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/)).min(8).max(30).label('Password').required(),
    passwordConfirm: Joi.valid(Joi.ref('password')).label('Password confirmation').required().messages({ 'any.only': 'Passwords do not match' }),
}).messages(messages)
