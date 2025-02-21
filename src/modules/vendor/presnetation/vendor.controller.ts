import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateVendorDto } from "@Vendor/application/use-cases/create-vendor/create-vendor.dto";
import { ICreateVendorUseCase } from "@Vendor/application/use-cases/create-vendor/create-vendor.use-case";
import { VENDOR_SYMBOLS } from "@Vendor/infraestructure/container/vendor.symbol";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class VendorController {
    constructor(@inject(VENDOR_SYMBOLS.CreateVendorUseCase) private readonly createVendorUseCase: ICreateVendorUseCase) {
        this.createVendor = this.createVendor.bind(this);
    }

    async createVendor(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateVendorDto = req.body;
            const vendorProfile = await this.createVendorUseCase.execute(data);
            HttpResponse.success(res, vendorProfile);
        } catch (error) {
            next(error);
        }
    }
}
