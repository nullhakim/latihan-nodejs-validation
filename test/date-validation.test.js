import Joi from "joi";

describe("Joi", () => {
  it("should can valildation date", () => {
    const birthDateSchema = Joi.date().required().max("now").min("1-1-1988");

    const result = birthDateSchema.validate("1-1-1987");
    console.info(result);

    const result2 = birthDateSchema.validate("1-1-1995");
    console.info(result2);
  });
});
