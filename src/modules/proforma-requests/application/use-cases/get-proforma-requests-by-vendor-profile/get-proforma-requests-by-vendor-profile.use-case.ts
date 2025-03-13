import { GetByVendorProfilerRequest, GetByVendorProfilerResponse } from "./get-proforma-requests-by-vendor-profile.dto";

export interface IGetProformaRequestsByVendorProfileUseCase {
    execute(data: GetByVendorProfilerRequest): Promise<GetByVendorProfilerResponse[]>;
}
