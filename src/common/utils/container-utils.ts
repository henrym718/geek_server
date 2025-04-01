import { Container } from "inversify";

export function registerRepositories(container: Container, repositories: Array<{ symbol: symbol; implementation: any }>) {
    repositories.forEach((repo) => {
        container.bind<typeof repo.implementation>(repo.symbol).to(repo.implementation).inSingletonScope();
    });
}

export function registerUseCases(container: Container, useCases: Array<{ symbol: symbol; implementation: any }>) {
    useCases.forEach((useCase) => {
        container.bind<typeof useCase.implementation>(useCase.symbol).to(useCase.implementation).inSingletonScope();
    });
}

export function registerServices(container: Container, services: Array<{ symbol: symbol; implementation: any }>) {
    services.forEach((service) => {
        container.bind<typeof service.implementation>(service.symbol).to(service.implementation).inSingletonScope();
    });
}

export function registerControllers(container: Container, controllers: any[]) {
    controllers.forEach((controller) => {
        container.bind<typeof controller>(controller).toSelf();
    });
}
