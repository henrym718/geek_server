import { logger } from "@Common/logger";
import { NextFunction, Request, Response } from "express";

export const errorLog = (error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);
    next(error);
};
