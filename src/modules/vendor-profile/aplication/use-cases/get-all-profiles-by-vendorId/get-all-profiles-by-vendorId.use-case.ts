import { GetAllProfilesByVendorIdRequest, GetAllProfilesByVendorIdResponse } from "./get-all-profiles-by-vendorId.dto";

export interface IGetAllProfilesByVendorIdUseCase {
    execute(request: GetAllProfilesByVendorIdRequest): Promise<GetAllProfilesByVendorIdResponse[]>;
}
