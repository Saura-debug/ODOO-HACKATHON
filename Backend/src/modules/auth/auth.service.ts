import { prisma } from "../../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { LoginInput } from "./auth.validation";

export const loginService = async (data: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role.name,
    },
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user,
  };
};
export const getMeService = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: {
      role: true,
    },
  });
};