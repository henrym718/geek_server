import { ExistsResponse } from "@Common/dtos/global.dtos";

export interface CheckUsernameExistsRequest {
    username: string;
}

export interface CheckUsernameExistsResponse extends ExistsResponse {}
