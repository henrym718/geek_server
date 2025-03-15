import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateVendorProfileDto } from "@VendorProfile/aplication/use-cases/create-vendor-profile/create-vendor-profile.dto";
import { ICreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile/create-vendor-profile.use-case";
import { SearchRequest } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.dto";
import { ISearchVendorProfilesUseCase } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.use-case";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class VendorProfileController {
    constructor(
        @inject(VENDOR_PROFILE_SYMBOLS.CreateVendorProfile)
        private readonly createVendorProfileUseCase: ICreateVendorProfileUseCase,

        @inject(VENDOR_PROFILE_SYMBOLS.SearchVendorProfiles)
        private readonly searchVendorProfilesUseCase: ISearchVendorProfilesUseCase
    ) {
        this.createVendorprofile = this.createVendorprofile.bind(this);
        this.searchVendorProfiles = this.searchVendorProfiles.bind(this);
    }

    async createVendorprofile(req: Request, res: Response, next: NextFunction) {
        try {
            const vendorId = req.user?.userId;
            const data: ReqCreateVendorProfileDto = { ...req.body, vendorId };
            const { detail } = await this.createVendorProfileUseCase.execute(data);
            HttpResponse.success(res, null, detail);
        } catch (error) {
            next(error);
        }
    }

    async searchVendorProfiles(req: Request, res: Response, next: NextFunction) {
        try {
            const vendorProfiles = await this.searchVendorProfilesUseCase.execute(req.query as SearchRequest);
            HttpResponse.success(res, vendorProfiles);
        } catch (error) {
            next(error);
        }
    }
}
