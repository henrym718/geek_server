import { PrismaBootstrap } from "@Bootstraps/prisma.bootsrap";
import { Vendor } from "@Core/entities/vendor";
import { IVendorRepository } from "modules/vendor/application/repositories/vendor.repository";
import { VendorMapper } from "./vendor.mapper";
import { UserMapper } from "@User/infrastructure/persistence/user.mapper";
import { User } from "@Core/entities/user";
import { HttpException } from "@Common/exceptions/http.exception";
import { Prisma } from "@prisma/client";

export class VendorPrismaRepository implements IVendorRepository {
    private get prisma() {
        return PrismaBootstrap.prisma;
    }

    async create(data: Vendor, ctx?: Prisma.TransactionClient): Promise<void> {
        const client = ctx || this.prisma;

        await client.vendor.create({ data: VendorMapper.toPersistece(data) });
    }

    async update(entity: Vendor): Promise<void> {
        throw new Error("Method not implemented.");
    }

    save(entity: Vendor): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<Vendor | null> {
        const vendor = await this.prisma.vendor.findUnique({ where: { id } });
        return vendor ? VendorMapper.toDomain(vendor) : null;
    }

    async findVendorByidWithUser(id: string): Promise<{ user: User; vendor: Vendor } | null> {
        const response = await this.prisma.vendor.findUnique({ where: { id }, include: { user: true } });
        if (!response) return null;
        const { user, ...vendor } = response;
        return { user: UserMapper.toDomain(user), vendor: VendorMapper.toDomain(vendor) };
    }

    async findAll(): Promise<Vendor[]> {
        throw new Error("Method not implemented.");
    }
}
