import { prisma } from "../../config/prisma";
import { MaintenanceStatus, VehicleStatus } from "@prisma/client";

export const createMaintenance = async (data: any) => {
  return prisma.$transaction(async (tx) => {
    const maintenance = await tx.maintenance.create({
      data,
    });

    await tx.vehicle.update({
      where: { id: data.vehicleId },
      data: {
        status: VehicleStatus.IN_SHOP,
      },
    });

    return maintenance;
  });
};

export const completeMaintenance = async (id: string) => {
  const maintenance = await prisma.maintenance.findUnique({
    where: { id },
  });

  if (!maintenance) throw new Error("Maintenance not found");

  return prisma.$transaction(async (tx) => {
    await tx.maintenance.update({
      where: { id },
      data: {
        status: MaintenanceStatus.COMPLETED,
      },
    });

    await tx.vehicle.update({
      where: {
        id: maintenance.vehicleId,
      },
      data: {
        status: VehicleStatus.AVAILABLE,
      },
    });
  });
};

export const getMaintenances = () => {
  return prisma.maintenance.findMany({
    include: {
      vehicle: true,
    },
  });
};