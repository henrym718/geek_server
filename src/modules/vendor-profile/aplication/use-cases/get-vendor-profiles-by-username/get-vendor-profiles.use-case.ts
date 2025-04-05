import { GetVendorProfilesRequest, GetVendorProfilesResponse } from "./get-vendor-profiles.dto";

export interface IGetVendorProfilesUseCase {
    execute(data: GetVendorProfilesRequest): Promise<GetVendorProfilesResponse[]>;
}
