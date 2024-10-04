import Joi from "joi";

describe("Joi", () => {
  it("should can validate object", () => {
    const hobbiesSchema = Joi.array()
      .items(Joi.string().required().min(3).max(100))
      .min(1)
      .unique();

    const hobbies = ["A", "Reading", "Gaming", "Gaming"];
    const result = hobbiesSchema.validate(hobbies, {
      abortEarly: false,
    });

    console.info(result);
  });

  it("should can validate array of object", () => {
    const addressSchema = Joi.array()
      .min(1)
      .items(
        Joi.object({
          street: Joi.string().required().max(100),
          city: Joi.string().required().max(100),
          country: Joi.string().required().max(100),
          zipCode: Joi.string().required().max(100),
        })
      );
    const addresses = [
      {
        street: "Jalan Belum Ada",
        city: "Jalan Belum Ada",
      },
    ];
    const result = addressSchema.validate(addresses, {
      abortEarly: false,
    });

    console.info(result);
  });
});
