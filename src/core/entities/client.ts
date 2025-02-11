import { User } from "./user";

export interface ClientProps {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly photo?: string;
    readonly city: string;
    readonly userId: string;
}

export class Client {
    private constructor(private readonly user: User, private readonly props: ClientProps) {}

    static create(user: User, props: Omit<ClientProps, "id">): Client {
        return new Client(user, { ...props, id: "id" });
    }

    static reconstitute(user: User, props: ClientProps): Client {
        return new Client(user, props);
    }
}
