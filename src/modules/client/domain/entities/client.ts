export class Client {
    private constructor(private readonly props: ClientProps) {}

    static create(props: Omit<ClientProps, "id">): Client {
        return new Client({
            ...props,
            id: "id",
        });
    }

    static reconstitute(props: ClientProps): Client {
        return new Client(props);
    }
}

export interface ClientProps {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly photo?: string;
    readonly city: string;
    readonly userId: string;
}
