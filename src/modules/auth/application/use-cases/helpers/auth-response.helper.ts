import { GetCurrentAccountResponse } from "../get-current-account/get-current-account.dto";
import { User } from "@Core/entities/user";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";

export function buildResGetCurrentAccount(user: User, client?: Client, vendor?: Vendor) {
    const response: GetCurrentAccountResponse = {
        user: {
            id: user.id.getValue(),
            email: user.email.getValue(),
            role: user.role.getValue(),
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            username: user.username.getValue(),
            profileCompleted: !!client || !!vendor,
        },
    };

    if (client) {
        response.client = {
            id: client.id.getValue(),
            firstName: client.firstName.getValue(),
            lastName: client.lastName.getValue(),
            city: client.city.getValue(),
            photo: client.photo?.getValue(),
            phone: client.phone.getValue(),
        };
    }

    if (vendor) {
        response.vendor = {
            id: vendor.id.getValue(),
            firstName: vendor.firstName.getValue(),
            lastName: vendor.lastName.getValue(),
            city: vendor.city.getValue(),
            photo: vendor.photo?.getValue(),
            phone: vendor.phone.getValue(),
        };
    }

    return response;
}

export function buildAuthResponse(user: User, accessToken: string, client?: Client, vendor?: Vendor) {
    return {
        ...buildResGetCurrentAccount(user, client, vendor),
        accessToken,
    };
}
