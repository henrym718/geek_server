import { User } from "@Core/entities/user";
import { Vendor } from "@Core/entities/vendor";
import { IRepository } from "@Shared/repositories/repository";

export interface IVendorRepository extends IRepository<Vendor> {
    findVendorByidWithUser(id: string): Promise<{ user: User; vendor: Vendor } | null>;
}
