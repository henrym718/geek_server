import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateProfileVendorDto } from "@ProfileVendor/aplication/use-cases/create-profile-vendor.dto";
import { ICreateProfileVendorUseCase } from "@ProfileVendor/aplication/use-cases/create-profile-vendor.use-case";
import { PROFILE_VENDOR_SYMBOLS } from "@ProfileVendor/infraestructure/container/profile-vendor.symbols";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class ProfileVendorController {
    constructor(@inject(PROFILE_VENDOR_SYMBOLS.createProfileVendorUseCase) private readonly createProfileVendorUseCase: ICreateProfileVendorUseCase) {
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const vendorId = req.user?.userId;
            const data: ReqCreateProfileVendorDto = { ...req.body, vendorId };
            const { detail } = await this.createProfileVendorUseCase.execute(data);
            HttpResponse.success(res, null, detail);
        } catch (error) {
            next(error);
        }
    }
}
