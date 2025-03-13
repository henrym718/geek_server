import { VendorProfile } from "@Core/entities/profile-vendor";
import { Skill } from "@Core/entities/skill";
import { IRepository } from "@Shared/repositories/repository";

export interface IVendorProfilesRepository extends IRepository<VendorProfile> {
    findByIdWithSkillsId(id: string): Promise<VendorProfile | null>;
}
