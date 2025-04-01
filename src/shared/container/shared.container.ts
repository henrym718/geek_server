import { Container } from "inversify";
import { SHARED_SYMBOLS } from "./shared.symbols";
import { TokenServiceImpl } from "@Shared/services/token/token.service.impl";
import { UUIDServiceImpl } from "@Shared/services/uuid/uuid.service.impl";
import { HashServiceImpl } from "@Shared/services/hash/hash.service.impl";
import { PrismaTransactionManager } from "@Shared/services/transaction/transaction-manager.impl";
import { UserPrismaRepository } from "@User/infrastructure/persistence/user-prisma.repository";
import { ClientPrismaRepository } from "@Client/infraestructure/persistence/client-prisma.repository";
import { VendorPrismaRepository } from "@Vendor/infraestructure/persistence/vendor-prisma.repository";
import { SkillPrismaRepository } from "@Skill/infraestructure/persistence/skill-prisma.repository";
import { GroupPrismaRepository } from "@Group/infraestructure/persistence/group-prisma.repository";
import { CategoryPrismaRepository } from "@Category/infraestructure/persistence/category-prisma.repository";
import { ProformaRequestsPrismaRepository } from "@ProformaRequests/infraestructure/persistence/proforma-requests-prisma.repository";
import { ProformaResponsePrismaRepository } from "modules/proforma-response/infraestructure/persistence/proforma-reponse-prisma.repository";
import { VendorProfilePrismaRepository } from "@VendorProfile/infraestructure/persistence/vendor-profile-prisma.repository";
import { registerRepositories, registerServices } from "@Common/utils/container-utils";

export function createSharedContainer(): Container {
    const container = new Container();
    registerServices(container, [
        { symbol: SHARED_SYMBOLS.TokenService, implementation: TokenServiceImpl },
        { symbol: SHARED_SYMBOLS.UUIDService, implementation: UUIDServiceImpl },
        { symbol: SHARED_SYMBOLS.HashService, implementation: HashServiceImpl },
        { symbol: SHARED_SYMBOLS.TransactionManager, implementation: PrismaTransactionManager },
    ]);

    registerRepositories(container, [
        { symbol: SHARED_SYMBOLS.UserRepository, implementation: UserPrismaRepository },
        { symbol: SHARED_SYMBOLS.ClientRepository, implementation: ClientPrismaRepository },
        { symbol: SHARED_SYMBOLS.VendorRepository, implementation: VendorPrismaRepository },
        { symbol: SHARED_SYMBOLS.SkillRepository, implementation: SkillPrismaRepository },
        { symbol: SHARED_SYMBOLS.GroupRepository, implementation: GroupPrismaRepository },
        { symbol: SHARED_SYMBOLS.CategoryRepository, implementation: CategoryPrismaRepository },
        { symbol: SHARED_SYMBOLS.ProformaRequestRepository, implementation: ProformaRequestsPrismaRepository },
        { symbol: SHARED_SYMBOLS.ProformaResponseRepository, implementation: ProformaResponsePrismaRepository },
        { symbol: SHARED_SYMBOLS.VendorProfileRepository, implementation: VendorProfilePrismaRepository },
    ]);
    return container;
}
