import { ReqCreateProfileVendorDto, ResCreateProfileVendorDto } from "./create-profile-vendor.dto";

export interface ICreateProfileVendorUseCase {
    execute(data: ReqCreateProfileVendorDto): Promise<ResCreateProfileVendorDto>;
}
