import { HttpException } from "@Common/exceptions/http.exception";
import { logger } from "@Common/logs/logger";
import { HttpResponse } from "@Common/response/http.response";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);
    HttpResponse.failure(res, error.status || 500, error.message || "Internal server error");
};
