import { CreateVendorRequest, CreateVendorResponse } from "./create-vendor.dto";

export interface ICreateVendorUseCase {
    execute(data: CreateVendorRequest): Promise<CreateVendorResponse>;
}
