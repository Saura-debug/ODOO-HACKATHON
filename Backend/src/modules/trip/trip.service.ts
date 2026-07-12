import { prisma } from "../../config/prisma";
import { DriverStatus, TripStatus, VehicleStatus } from "@prisma/client";
import { ApiError } from "../../utils/ApiError";

export const createTrip = async (data: any) => {

  // Vehicle
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: data.vehicleId },
  });

  if (!vehicle)
    throw new ApiError(404, "Vehicle not found");

  if (vehicle.status !== VehicleStatus.AVAILABLE)
    throw new ApiError(400, "Vehicle not available");

  if (data.cargoWeight > vehicle.maxLoadCapacity)
    throw new ApiError(400, "Vehicle capacity exceeded");

  // Driver
  const driver = await prisma.driver.findUnique({
    where: { id: data.driverId },
  });

  if (!driver)
    throw new ApiError(404, "Driver not found");

  if (driver.status !== DriverStatus.AVAILABLE)
    throw new ApiError(400, "Driver not available");

  if (driver.licenseExpiry < new Date())
    throw new ApiError(400, "Driver license expired");

  // Transaction
  return prisma.$transaction(async (tx) => {

    const trip = await tx.trip.create({
      data: {
        ...data,
        status: TripStatus.DISPATCHED,
        startOdometer: vehicle.odometer,
      },
    });

    await tx.vehicle.update({
      where: { id: vehicle.id },
      data: {
        status: VehicleStatus.ON_TRIP,
      },
    });

    await tx.driver.update({
      where: { id: driver.id },
      data: {
        status: DriverStatus.ON_TRIP,
      },
    });

    return trip;
  });

};
export const completeTrip = async (
  tripId: string,
  endOdometer: number
) => {

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
  });

  if (!trip)
    throw new ApiError(404, "Trip not found");

  return prisma.$transaction(async (tx) => {

    await tx.trip.update({
      where: { id: tripId },
      data: {
        endOdometer,
        completedAt: new Date(),
        status: TripStatus.COMPLETED,
      },
    });

    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: {
        status: VehicleStatus.AVAILABLE,
        odometer: endOdometer,
      },
    });

    await tx.driver.update({
      where: { id: trip.driverId },
      data: {
        status: DriverStatus.AVAILABLE,
      },
    });

  });

};
export const getTrips = async () => {

  return prisma.trip.findMany({

    include: {
      driver: true,
      vehicle: true,
    },

  });

};