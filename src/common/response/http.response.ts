import { Response } from "express";

export class HttpResponse {
    public static success(res: Response, data: any, details?: string) {
        res.status(200).json({
            success: true,
            data,
            details,
        });
    }

    public static failure(res: Response, status: number, message: string) {
        res.status(status).json({
            success: false,
            message,
        });
    }
}
