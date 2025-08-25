// container.bootstrap.ts
import { createClientContainer } from "@Client/infraestructure/container/clinet.container";
import { createAuthContainer } from "@Auth/infraestructure/container/auth-container";
import { createSharedContainer } from "@Shared/container/shared.container";
import { createVendorContainer } from "@Vendor/infraestructure/container/vendor.container";
import { configureCategoryContainer } from "modules/admin/category/infraestructure/container/category.container";
import { Container } from "inversify";
import { createUserContainer } from "@User/infrastructure/container/user.container";
import { configureGroupContainer } from "modules/admin/group/infraestructure/container/group.container";
import { configureVendorProfileContainer } from "@VendorProfile/infraestructure/container/vendor-profile.container";
import { configureSkillContainer } from "modules/admin/skill/infraestructure/container/skill.container";
import { configureProformaRequestsContainer } from "modules/proformas/requests/infraestructure/container/proforma-requests.container";
import { configureProformaResponseContainer } from "modules/proformas/response/infraestructure/container/proforma-reponse.container";
import { configureSuggestionContainer } from "modules/admin/suggestion/infraestructure/container/suggestion.container";
import { createChatContainer } from "modules/chat/infraestructure/container/chat.container";
import { createCityContainer } from "modules/admin/city/infraestructure/container/city.container";
import { logger } from "@Common/logs/logger";
// Definir identificadores únicos
export const IDENTIFIERS = {
    Shared: Symbol("SharedContainer"),
    Auth: Symbol("AuthContainer"),
    User: Symbol("UserContainer"),
    Client: Symbol("ClientContainer"),
    Vendor: Symbol("VendorContainer"),
    Category: Symbol("CategoryContainer"),
    Group: Symbol("GroupContainer"),
    Skill: Symbol("SkillContainer"),
    Suggestion: Symbol("SuggestionContainer"),
    ProformaRequest: Symbol("ProformaRequestContainer"),
    ProformaResponse: Symbol("ProformaResponseContainer"),
    VendorProfile: Symbol("VendorProfileContainer"),
    Chat: Symbol("ChatContainer"),
    City: Symbol("CityContainer"),
};

export class ContainerBootstrap {
    private static container: Container | null = null;

    async initialize(): Promise<void> {
        // Crear el contenedor raíz
        const rootContainer = new Container();
        // Configurar el contenedor compartido y asignarlo como parent
        rootContainer.parent = createSharedContainer();
        // Registrar los contenedores de módulos con identificadores únicos
        createAuthContainer(rootContainer);
        createClientContainer(rootContainer);
        createVendorContainer(rootContainer);
        configureCategoryContainer(rootContainer);
        configureGroupContainer(rootContainer);
        configureProformaRequestsContainer(rootContainer);
        configureProformaResponseContainer(rootContainer);
        configureVendorProfileContainer(rootContainer);
        configureSkillContainer(rootContainer);
        configureSuggestionContainer(rootContainer);
        createChatContainer(rootContainer);
        createCityContainer(rootContainer);

        ContainerBootstrap.container = rootContainer;
        logger.info("✅ Injecction of dependencies are loaded");
    }

    // Método genérico para obtener el contenedor de un módulo dado su identificador
    static getModuleContainer(identifier: symbol): Container {
        const container = ContainerBootstrap.container?.get(identifier);
        if (!container) {
            throw new Error(`Container for identifier ${String(identifier)} not initialized`);
        }
        return container as Container;
    }
}
