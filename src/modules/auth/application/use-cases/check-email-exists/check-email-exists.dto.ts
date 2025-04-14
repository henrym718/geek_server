import { ExistsResponse } from "@Common/dtos/global.dtos";

export interface CheckEmailRequest {
    email: string;
}

export interface CheckEmailResponse extends ExistsResponse {}
