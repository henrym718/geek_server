import { User, Client, Vendor } from "@Common/dtos/global.dtos";

export interface GetCurrentAccountRequest {
    email: string;
}

export interface GetCurrentAccountResponse {
    user: User;
    client?: Client;
    vendor?: Vendor;
}
