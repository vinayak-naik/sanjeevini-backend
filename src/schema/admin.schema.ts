import { object, string, TypeOf } from "zod";

export const createAdminSchema = object({
  body: object({
    firstName: string({ required_error: "First Name is Required" }).min(1),
    lastName: string({ required_error: "Last Name is Required" }).min(1),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
  }),
});

export const loginAdminSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
  }),
});

export const verifyOTPSchema = object({
  body: object({
    verificationCode: string({ required_error: "First Name is Required" }),
    email: string({
      required_error: "Email is required",
    }).email("Invalid email or password"),
  }),
});

export type CreateAdminInput = TypeOf<typeof createAdminSchema>["body"];
export type LoginAdminInput = TypeOf<typeof loginAdminSchema>["body"];
export type VerifyOTPInput = TypeOf<typeof verifyOTPSchema>["body"];
