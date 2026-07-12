import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { createExpenseSchema } from "./expense.validation";
import {
  createExpense,
  getExpenses,
} from "./expense.service";

export const createExpenseController = asyncHandler(
  async (req: Request, res: Response) => {
    const body = createExpenseSchema.parse(req.body);

    const expense = await createExpense(body);

    res.status(201).json(expense);
  }
);

export const getExpensesController = asyncHandler(
  async (_: Request, res: Response) => {
    res.json(await getExpenses());
  }
);