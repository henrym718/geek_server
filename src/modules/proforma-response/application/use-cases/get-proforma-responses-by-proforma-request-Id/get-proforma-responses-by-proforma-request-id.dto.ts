export interface ReqGetProformaResponsesByRequestIdDto {
    requestId: string;
}

export interface ResGetProformaResponsesByRequestIdDto {
    id: string;
    budget: number;
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
