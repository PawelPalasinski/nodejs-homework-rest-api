const Joi = require("joi");

const contactSchemaPost = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .required(),
  phone: Joi.string()
    .length(9)
    .pattern(/^[0-9]+$/)
    .required(),
});

const contactSchemaPut = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .optional(),
  email: Joi.string()
    .pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .optional(),
  phone: Joi.string()
    .length(9)
    .pattern(/^[0-9]+$/)
    .optional(),
});

const validationForPost = (contact) => contactSchemaPost.validate(contact);
const validationForPut = (contact) => contactSchemaPut.validate(contact);

module.exports = {
  validationForPost,
  validationForPut,
};
