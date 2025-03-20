import { z            } from "zod";




export const signInFormSchema = z.object({
    email: z.string().email().min(3, "Email must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
  });

  
  export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email().min(3, "Email must be at least 3 characters"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(3, "Confirm password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const studentProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username cannot be longer than 20 characters" })
    .regex(/^[a-zA-Z0-9_\-🌟🚀🔥🌈🐒💫⭐]+$/, { 
      message: "Username can only contain letters, numbers, emoji, underscores and hyphens" 
    }),
  grade: z.string().min(1, { message: "Please select your grade" }),
  ageGroup: z.enum(["5-7", "8-10", "11-13", "14-16", "17-19", "20-24"], { 
    required_error: "Please select your age bracket" 
  }),
  school: z.string().optional(),
  avatarColor: z.string().optional(),
});

export type StudentProfileFormData = z.infer<typeof studentProfileSchema>;