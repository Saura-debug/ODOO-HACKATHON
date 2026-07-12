import { prisma } from "../../config/prisma";

export const createFuel = async (data: any) => {
  return prisma.fuelLog.create({
    data,
  });
};

export const getFuelLogs = async () => {
  return prisma.fuelLog.findMany({
    include: {
      vehicle: true,
      trip: true,
    },
  });
};