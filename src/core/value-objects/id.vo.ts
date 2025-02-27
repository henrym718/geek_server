import { HttpException } from "@Common/exceptions/http.exception";

export class IdVO {
    private constructor(private readonly value: string) {}

    public static create(id: string): IdVO {
        this.validateId(id);
        return new IdVO(id);
    }

    private static validateId(id: string): void {
        if (!id) {
            throw HttpException.badRequest("Id is required");
        }

        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
            throw HttpException.badRequest("Invalid Id");
        }
    }

    public getValue(): string {
        return this.value;
    }
}
