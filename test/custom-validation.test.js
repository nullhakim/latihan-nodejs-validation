import Joi from "joi";

describe("Joi", () => {
  it("should return custom validation", () => {
    const registerSchema = Joi.object({
      username: Joi.string().required().email().min(3).max(100),
      password: Joi.string()
        .required()
        .min(6)
        .max(100)
        .custom((value, helpers) => {
          if (value.startsWith("john")) {
            return helpers.error("password.wrong");
          }
        })
        .messages({
          "password.wrong": "password can not start with john",
        }),
      confirmPassword: Joi.string().required().min(6).max(100),
    })
      .custom((value, helpers) => {
        if (value.password !== value.confirmPassword) {
          return helpers.error("register.password.different");
        }
        return value;
      })
      .messages({
        "register.password.different":
          "password and confirmPassword is different",
      });

    const request = {
      username: "john@mail.com",
      password: "12345john",
      confirmPassword: "12345john",
    };

    const result = registerSchema.validate(request, {
      abortEarly: false,
    });
    console.info(result);
  });
});
