import { ProformaResponse } from "@Core/entities/proforma-response";
import { IRepository } from "@Shared/repositories/repository";

export interface IProformaResponseRepository extends IRepository<ProformaResponse> {
    findByProformaRequestIdAndProfileVendorId(proformaRequestId: string, profileVendorId: string): Promise<boolean>;
}
