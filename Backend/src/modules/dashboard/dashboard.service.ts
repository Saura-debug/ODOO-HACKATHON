import { prisma } from "../../config/prisma";
import {
  VehicleStatus,
  DriverStatus,
  TripStatus,
} from "@prisma/client";

export const getDashboard = async () => {
  const [
    totalVehicles,
    availableVehicles,
    vehiclesOnTrip,
    vehiclesInShop,

    totalDrivers,
    availableDrivers,

    activeTrips,
    completedTrips,

    maintenanceCount,

    fuelCost,

    expenseAmount,
  ] = await Promise.all([

    prisma.vehicle.count(),

    prisma.vehicle.count({
      where: {
        status: VehicleStatus.AVAILABLE,
      },
    }),

    prisma.vehicle.count({
      where: {
        status: VehicleStatus.ON_TRIP,
      },
    }),

    prisma.vehicle.count({
      where: {
        status: VehicleStatus.IN_SHOP,
      },
    }),

    prisma.driver.count(),

    prisma.driver.count({
      where: {
        status: DriverStatus.AVAILABLE,
      },
    }),

    prisma.trip.count({
      where: {
        status: TripStatus.DISPATCHED,
      },
    }),

    prisma.trip.count({
      where: {
        status: TripStatus.COMPLETED,
      },
    }),

    prisma.maintenance.count(),

    prisma.fuelLog.aggregate({
      _sum: {
        cost: true,
      },
    }),

    prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
    }),
  ]);

  return {
    totalVehicles,
    availableVehicles,
    vehiclesOnTrip,
    vehiclesInShop,

    totalDrivers,
    availableDrivers,

    activeTrips,
    completedTrips,

    maintenanceCount,

    fuelCost: fuelCost._sum.cost ?? 0,

    totalExpense: expenseAmount._sum.amount ?? 0,
  };
};