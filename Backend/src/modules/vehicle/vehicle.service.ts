import { prisma } from "../../config/prisma";
import { z } from "zod";
import { createVehicleSchema } from "./vehicle.validation";

type CreateVehicleInput = z.infer<typeof createVehicleSchema>;

export const createVehicleService = async (
  data: CreateVehicleInput
) => {
  return prisma.vehicle.create({
    data,
  });
};

export const getAllVehiclesService = async () => {
  return prisma.vehicle.findMany();
};

export const getVehicleByIdService = async (id: string) => {
  return prisma.vehicle.findUnique({
    where: {
      id,
    },
  });
};

export const updateVehicleService = async (
  id: string,
  data: Partial<CreateVehicleInput>
) => {
  return prisma.vehicle.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteVehicleService = async (id: string) => {
  return prisma.vehicle.delete({
    where: {
      id,
    },
  });
};