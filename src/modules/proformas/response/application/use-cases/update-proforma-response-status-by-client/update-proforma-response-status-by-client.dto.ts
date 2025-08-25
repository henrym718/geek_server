export interface UpdateStatusByClientRequest {
    clientId: string;
    proformaRequestId: string;
    proformaResponseId: string;
    newStatus: "ACCEPTED" | "REJECTED";
}

export interface UpdateStatusByClientResponse {
    details: string;
}
