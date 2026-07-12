import { prisma } from "../../config/prisma";
import { z } from "zod";
import { createDriverSchema } from "./driver.validation";

type CreateDriverInput = z.infer<typeof createDriverSchema>;

export const createDriver = async (data: CreateDriverInput) => {
  return prisma.driver.create({
    data,
  });
};

export const getDrivers = async () => {
  return prisma.driver.findMany();
};

export const getDriver = async (id: string) => {
  return prisma.driver.findUnique({
    where: { id },
  });
};

export const updateDriver = async (
  id: string,
  data: Partial<CreateDriverInput>
) => {
  return prisma.driver.update({
    where: { id },
    data,
  });
};

export const deleteDriver = async (id: string) => {
  return prisma.driver.delete({
    where: { id },
  });
};