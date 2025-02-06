import { HttpException } from "@Common/http.exception";
import { HttpResponse } from "@Common/http.response";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof HttpException) {
        HttpResponse.failure(res, error.status, error.message);
    } else {
        HttpResponse.failure(res, 500, "Internal server error");
    }
};
