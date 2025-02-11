import { HttpException } from "@Common/exceptions/http.exception";
import { logger } from "@Common/logs/logger";
import { HttpResponse } from "@Common/response/http.response";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    logger.error(error);
    if (error instanceof HttpException) {
        HttpResponse.failure(res, error.status, error.message);
    } else {
        HttpResponse.failure(res, 500, "Internal server error");
    }
};
