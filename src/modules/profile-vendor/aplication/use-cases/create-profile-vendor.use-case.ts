import { ReqCreateProfileVendorDto, ResCreateProfileVendorDto } from "@ProfileVendor/aplication/use-cases/create-profile-vendor.dto";

export interface ICreateProfileVendorUseCase {
    execute(data: ReqCreateProfileVendorDto): Promise<ResCreateProfileVendorDto>;
}
