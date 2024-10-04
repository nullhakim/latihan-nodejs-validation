import Joi from "joi";

describe("Joi", () => {
  it("should return custom message validation error", () => {
    const schema = Joi.string().min(3).max(7).required().messages({
      "string.min": "{{#label}} panjang harus minimal {{#limit}} karakter",
      "string.max": "{{#label}} panjang harus maksimal {{#limit}} karakter",
    });

    const request = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
    const result = schema.validate(request, {
      abortEarly: false,
    });

    if (result.error) {
      console.info(result.error);
      console.info(result.value);
    }
  });

  it("should return custom message in object validation error", () => {
    const schema = Joi.object({
      username: Joi.string().required().email().messages({
        "any.required": "{{#label}} harus diisi",
        "string.email": "{{#label}} harus valid email",
      }),

      password: Joi.string().required().min(6).max(10).messages({
        "any.required": "{{#label}} harus diisi",
        "string.min": "{{#label}} harus lebih dari {{#limit}} karakter",
        "string.max": "{{#label}} harus kurang dari {{#limit}} karakter",
      }),
    });
    const request = {
      username: "john",
      password: "zzzuuuufasdd",
    };
    const result = schema.validate(request, {
      abortEarly: false,
    });

    if (result.error) {
      console.info(result.error);
      console.info(result.value);
    }
  });
});
