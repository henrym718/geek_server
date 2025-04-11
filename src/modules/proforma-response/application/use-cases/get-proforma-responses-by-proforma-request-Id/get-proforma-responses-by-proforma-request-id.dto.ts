export interface ReqGetProformaResponsesByRequestIdDto {
    requestId: string;
}

export interface ResGetProformaResponsesByRequestIdDto {
    id: string;
    budget: number | undefined;
    message: string;
    status: string;
    createdAt: Date | undefined;
    vendor: {
        id: string;
        firstName: string;
        lastName: string;
        photo: string;
    };
    vendorProfile: {
        id: string;
    };
}
