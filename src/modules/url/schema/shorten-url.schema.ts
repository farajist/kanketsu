import * as Joi from 'joi';

const shortenSchema = Joi.object({
  url: Joi.string().uri().required(),
});

export default shortenSchema;
