import { ReqCreateVendorDto, ResCreateVendorDto } from "./create-vendor.dto";

export interface ICreateVendorUseCase {
    execute(req: ReqCreateVendorDto): Promise<ResCreateVendorDto>;
}
