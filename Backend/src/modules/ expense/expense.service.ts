import { prisma } from "../../config/prisma";

export const createExpense = async (data: any) => {
  return prisma.expense.create({
    data,
  });
};

export const getExpenses = async () => {
  return prisma.expense.findMany({
    include: {
      trip: true,
    },
  });
};