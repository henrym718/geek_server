// container.bootstrap.ts
import { createClientContainer } from "@Client/infraestructure/container/clinet.container";
import { createAuthContainer } from "@Auth/infraestructure/container/auth-container";
import { createSharedContainer } from "@Shared/container/shared.container";
import { createVendorContainer } from "@Vendor/infraestructure/container/vendor.container";
import { configureCategoryContainer } from "@Category/infraestructure/container/category.container";
import { Container } from "inversify";
import { createUserContainer } from "@User/infrastructure/container/user.container";
import { configureGroupContainer } from "@Group/infraestructure/container/group.container";
import { configureVendorProfileContainer } from "@VendorProfile/infraestructure/container/vendor-profile.container";
import { configureSkillContainer } from "@Skill/infraestructure/container/skill.container";
import { configureProformaRequestsContainer } from "@ProformaRequests/infraestructure/container/proforma-requests.container";
import { configureProformaResponseContainer } from "modules/proforma-response/infraestructure/container/proforma-reponse.container";
import { configureSuggestionContainer } from "modules/suggestion/infraestructure/container/suggestion.container";
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
};

export class ContainerBootstrap {
    private static container: Container | null = null;

    async initialize(): Promise<Container> {
        // Crear el contenedor raíz
        const rootContainer = new Container();
        // Configurar el contenedor compartido y asignarlo como parent
        const sharedContainer = createSharedContainer();
        // Registrar los contenedores de módulos con identificadores únicos
        rootContainer.bind(IDENTIFIERS.Auth).toConstantValue(createAuthContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.User).toConstantValue(createUserContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.Client).toConstantValue(createClientContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.Vendor).toConstantValue(createVendorContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.Category).toConstantValue(configureCategoryContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.Group).toConstantValue(configureGroupContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.ProformaRequest).toConstantValue(configureProformaRequestsContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.ProformaResponse).toConstantValue(configureProformaResponseContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.VendorProfile).toConstantValue(configureVendorProfileContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.Skill).toConstantValue(configureSkillContainer(sharedContainer));
        rootContainer.bind(IDENTIFIERS.Suggestion).toConstantValue(configureSuggestionContainer(sharedContainer));
        ContainerBootstrap.container = rootContainer;
        return rootContainer;
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
