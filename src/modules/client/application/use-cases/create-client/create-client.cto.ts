import { Client } from "@Core/entities/client";

export interface CreateClientRequest {
    id: string;
    firstName: string;
    lastName: string;
    city: string;
    phone: string;
    photo?: string;
}

export interface CreateClientResponse {
    client: Client;
}
