import { GetVendorProfileRequest, GetVendorProfileResponse } from "./get-vendor-profiles-by-id.dto";

export interface IGetVendorProfileByIdUseCase {
    execute(data: GetVendorProfileRequest): Promise<GetVendorProfileResponse>;
}
