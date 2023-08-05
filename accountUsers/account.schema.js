import joi from "joi";

export const accountRegisterSchema = joi.object({
  shopname: joi
    .string()
    .label("Account Shop Name")
    .min(5)
    .max(50)
    .lowercase()
    .required()
    // .regex(/[${};<>`]/, { invert: true })
    .trim()
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    }),
  tagline:joi
    .string()
    .label("Account Tagline")
    .min(5)
    .max(100)
    .lowercase()
    .regex(/[${};<>`]/, { invert: true })
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    })
    .trim(),
  username: joi
    .string()
    .label("Account Username")
    .min(5)
    .max(50)
    .required()
    // .regex(/[${};<>`]/, { invert: true })
    .trim()
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    }),
  email: joi
    .string()
    .label("Account Email")
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .lowercase()
    .trim(),
  mobile: joi
    .string()
    .label("Account Mobile Number")
    .min(8)
    .max(13)
    .lowercase()
    .required()
    .regex(/^\d{10}$/)
    //.regex(/[^\d{8,13}$]/)
    .trim()
    // .pattern(/^\+\d+$/)
    .messages({
      "string.pattern.base":
        `{{#label}} should only contains 10 digits`,
    }),
  profilePicUrl: joi
    .string()
    .label("Account Profile Picture")
    .min(12)
    // .max() TBD
    .lowercase()
    // .regex(/[${};<>`]/, { invert: true })
    .trim()
    .messages({
      "string.pattern.invert.base":
        `{{#label}} should not contains symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' )",
    }),
  password: joi
    .string()
    .label("Account Password")
    .min(8)
    .max(15)

});

export const accountSignInSchema = joi.object({
  mobile: joi
    .string()
    .label("Account Mobile Number")
    .min(8)
    .max(13)
    .lowercase()
    .required()
    //.regex(/[${};<>`]/, { invert: true })
    //.regex(/[^\d{8,13}$]/)
    .trim()
    // .pattern(/^\+\d+$/)
    .messages({
      "string.pattern.base":
        `{{#label}} should not contains characters and symbols like ( '$' , '}' , '{' , ';' , '<' , '>' ,` +
        " '`' ) and should follow mobile number format",
    }),
  password: joi
    .string()
    .label("Account Password")
    .min(8)
    .max(15)
});