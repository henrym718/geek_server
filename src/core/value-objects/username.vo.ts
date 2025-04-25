export class UsernameVO {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static create(value: string): UsernameVO {
        const username = value.trim();
        this.validate(username);
        return new UsernameVO(value);
    }

    private static validate(value: string): void {
        if (value.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        }
    }

    public getValue(): string {
        return this.value;
    }
}
