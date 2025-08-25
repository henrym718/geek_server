import { ProformaRequest, ProformaResponse, Vendor } from "@Common/dtos/global.dtos";

export interface GetAcceptedResponsesRequest {
    clientId: string;
}

export interface GetAcceptedResponsesResponse {
    response: Pick<ProformaResponse, "message" | "updatedAt">;
    vendor: Pick<Vendor, "firstName" | "lastName" | "phone" | "city">;
    request: Omit<ProformaRequest, "id" | "scope" | "countResponses" | "status" | "createdAt">;
}
