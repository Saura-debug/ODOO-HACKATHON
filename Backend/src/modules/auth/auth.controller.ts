import { Request, Response } from "express";
import { loginService } from "./auth.service";
import { loginSchema } from "./auth.validation";
import { AuthRequest } from "../../middlewares/ auth.middleware";
import { getMeService } from "./auth.service";

export const loginController = async (
  req: Request,
  res: Response
) => {
  try {
    const body = loginSchema.parse(req.body);

    const result = await loginService(body);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const meController = async (
  req: AuthRequest,
  res: Response
) => {
  const user = await getMeService(req.user.id);

  res.json(user);
};