export class HttpException extends Error {
    private constructor(public readonly status: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, HttpException.prototype);
    }

    static badRequest(message: string): HttpException {
        return new HttpException(400, message);
    }

    static unauthorized(message: string): HttpException {
        return new HttpException(401, message);
    }

    static forbidden(message: string): HttpException {
        return new HttpException(403, message);
    }

    static notFound(message: string): HttpException {
        return new HttpException(404, message);
    }
}
