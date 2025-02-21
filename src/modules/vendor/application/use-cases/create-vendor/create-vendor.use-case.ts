import { ReqCreateVendorDto, ResCreateVendorDto } from "./create-vendor.dto";

export interface ICreateVendorUseCase {
    execute(data: ReqCreateVendorDto): Promise<ResCreateVendorDto>;
}
