import { ResGetCurrentAccountDTO } from "../get-current-account/get-current-account.dto";
import { User } from "@Core/entities/user";
import { Client } from "@Core/entities/client";
import { Vendor } from "@Core/entities/vendor";

export function buildResGetCurrentAccount(user: User, client?: Client, vendor?: Vendor): ResGetCurrentAccountDTO {
    const response: ResGetCurrentAccountDTO = {
        id: user.id.getValue(),
        email: user.email.getValue(),
        role: user.role.getValue(),
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        profileCompleted: !!client || !!vendor,
    };

    if (client) {
        response.clientProfile = {
            firstName: client.firstName.getValue(),
            lastName: client.lastName.getValue(),
            city: client.city.getValue(),
            photo: client.photo?.getValue(),
        };
    }

    if (vendor) {
        response.vendorProfile = {
            firstName: vendor.firstName.getValue(),
            lastName: vendor.lastName.getValue(),
            city: vendor.city.getValue(),
            phone: vendor.phone.getValue(),
            photo: vendor.photo?.getValue(),
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
