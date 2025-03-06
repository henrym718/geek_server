import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateVendorProfileDto } from "@VendorProfile/aplication/use-cases/create-vendor-profile.dto";
import { ICreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile.use-case";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class VendorProfileController {
    constructor(@inject(VENDOR_PROFILE_SYMBOLS.CreateVendorProfileUseCase) private readonly createVendorProfileUseCase: ICreateVendorProfileUseCase) {
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const vendorId = req.user?.userId;
            const data: ReqCreateVendorProfileDto = { ...req.body, vendorId };
            const { detail } = await this.createVendorProfileUseCase.execute(data);
            HttpResponse.success(res, null, detail);
        } catch (error) {
            next(error);
        }
    }
}
