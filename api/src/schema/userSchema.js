import Joi from 'joi'

const userCreateSchema = Joi.object().keys({
    email: Joi.string().email().required().label('Email'),
    username: Joi.string().alphanum().min(4).max(30).required().label('Username'),
    password: Joi.string().alphanum().min(4).required().label('Password'),
});

const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().alphanum().min(4).required().label('Password'),
});

export default {
  userCreateSchema,
  userLoginSchema
}