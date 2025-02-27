import { HttpException } from "@Common/exceptions/http.exception";
import { RoleEnum } from "@Core/value-objects";
import { NextFunction, Request, Response } from "express";

export const checkRoles = (...roles: RoleEnum[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) throw HttpException.unauthorized("Not authenticated");
        if (!roles.includes(req.user.role as RoleEnum)) throw HttpException.forbidden("Not authorized");
        next();
    };
};
