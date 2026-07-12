import { Request, Response } from "express";
import { loginService } from "./auth.service";
import { loginSchema } from "./auth.validation";
import { AuthRequest } from "../../middlewares/ auth.middleware";
import { getMeService } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";

export const loginController = asyncHandler( async (
  req: Request,
  res: Response
) => {
  
    const body = loginSchema.parse(req.body);

    const result = await loginService(body);

    res.status(200).json(result);

   
  }
);



export const meController = async (
  req: AuthRequest,
  res: Response
) => {
  const user = await getMeService(req.user.id);

  res.json(user);
};