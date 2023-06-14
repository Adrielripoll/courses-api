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
    'any.required':'{{#label}} is required',
    'string.empty': '{{#label}} is not allowed to be empty',
    'string.pattern.base': 'Passowrd must contain only alpha-numeric and must be between 8 and 30 characters',
    'string.alphanum': '{{#label}} must only contain alpha-numeric characters',
    'string.base': '{{#label}} must be a string',
    'string.email': '{{#label}} must be a valid email',
    'string.length': '{{#label}} length must be {{#limit}} characters long',
    'string.max': '{{#label}} length must be less than or equal to {{#limit}} characters long',
    'string.min': '{{#label}} length must be at least {{#limit}} characters long',
}

export const userSchema = Joi.object({
    name: Joi.string().min(3).label('Name').required(),
    email: Joi.string().label('Email').email().required(),
    password: Joi.string().pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/)).min(8).max(30).label('Password').required(),
    passwordConfirm: Joi.valid(Joi.ref('password')).label('Password confirmation').required().messages({ 'any.only': 'Passwords do not match' }),
}).messages(messages)
