import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateVendorProfileDto } from "@VendorProfile/aplication/use-cases/create-vendor-profile/create-vendor-profile.dto";
import { ICreateVendorProfileUseCase } from "@VendorProfile/aplication/use-cases/create-vendor-profile/create-vendor-profile.use-case";
import { GetAllProfilesByVendorIdRequest } from "@VendorProfile/aplication/use-cases/get-all-profiles-by-vendorId/get-all-profiles-by-vendorId.dto";
import { IGetAllProfilesByVendorIdUseCase } from "@VendorProfile/aplication/use-cases/get-all-profiles-by-vendorId/get-all-profiles-by-vendorId.use-case";
import { GetVendorProfileRequest } from "@VendorProfile/aplication/use-cases/get-vendor-profile-by-id/get-vendor-profiles-by-id.dto";
import { IGetVendorProfileByIdUseCase } from "@VendorProfile/aplication/use-cases/get-vendor-profile-by-id/get-vendor-profiles-by-id.use-case";
import { SearchRequest } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.dto";
import { ISearchVendorProfilesUseCase } from "@VendorProfile/aplication/use-cases/search-vendor-profiles/search-vendor-profiles.use-case";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class VendorProfileController {
    constructor(
        @inject(VENDOR_PROFILE_SYMBOLS.CreateVendorProfile) private readonly createVendorProfileUseCase: ICreateVendorProfileUseCase,
        @inject(VENDOR_PROFILE_SYMBOLS.SearchVendorProfiles) private readonly searchVendorProfilesUseCase: ISearchVendorProfilesUseCase,
        @inject(VENDOR_PROFILE_SYMBOLS.GetVendorProfileById) private readonly getVendorProfileByIdUseCase: IGetVendorProfileByIdUseCase,
        @inject(VENDOR_PROFILE_SYMBOLS.GetAllProfilesByVendorId) private readonly getAllProfilesByVendorIdUseCase: IGetAllProfilesByVendorIdUseCase
    ) {
        this.createVendorprofile = this.createVendorprofile.bind(this);
        this.searchVendorProfiles = this.searchVendorProfiles.bind(this);
        this.getVendorProfileById = this.getVendorProfileById.bind(this);
        this.getAllProfilesByVendorId = this.getAllProfilesByVendorId.bind(this);
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

    async getVendorProfileById(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetVendorProfileRequest = { profileId: req.params.id };
            const vendorProfile = await this.getVendorProfileByIdUseCase.execute(data);
            HttpResponse.success(res, vendorProfile);
        } catch (error) {
            next(error);
        }
    }

    async getAllProfilesByVendorId(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetAllProfilesByVendorIdRequest = { vendorId: req.user?.userId as string };
            const vendorProfiles = await this.getAllProfilesByVendorIdUseCase.execute(data);
            HttpResponse.success(res, vendorProfiles);
        } catch (error) {
            next(error);
        }
    }
}
