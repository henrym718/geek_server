export interface GetAllProfilesByVendorIdRequest {
    vendorId: string;
}

export interface GetAllProfilesByVendorIdResponse {
    id: string;
    firstName: string;
    lastName: string;
    bannerImage: string;
    photo: string;
    city: string;
    title: string;
}
