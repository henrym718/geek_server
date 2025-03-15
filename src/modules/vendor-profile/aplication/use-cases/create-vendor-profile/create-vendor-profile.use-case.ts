import { ReqCreateVendorProfileDto, ResCreateVendorProfileDto } from "./create-vendor-profile.dto";

export interface ICreateVendorProfileUseCase {
    execute(data: ReqCreateVendorProfileDto): Promise<ResCreateVendorProfileDto>;
}
