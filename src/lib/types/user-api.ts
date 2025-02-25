import { z } from "zod";

export const UserCreateSchema = z.object({
  userId: z.string().uuid(),
  walletAddress: z.string(),
  userType: z.enum(["instructor", "learner"]),
});

export const UpdateUserSchema = z.object({
  userId: z.string().uuid(),
  expoPushToken: z.string().optional(),
  platform: z.enum(["ios", "android"]).optional(),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const UserSchema = z.object({
  id: z.string(),
  wallet_address: z.string(),
  name: z.string().nullable(),
  role: z.enum(["instructor", "learner"]),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
