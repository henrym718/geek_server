import { Container } from "inversify";

export function createUserContainer(parentContainer: Container): Container {
    const container = new Container();
    container.parent = parentContainer;

    return container;
}
