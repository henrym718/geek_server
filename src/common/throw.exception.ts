class ThrowException extends Error {
    private constructor(public readonly status: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, ThrowException.prototype);
    }

    static badRequest(message: string): ThrowException {
        return new ThrowException(400, message);
    }

    static unauthorized(message: string): ThrowException {
        return new ThrowException(401, message);
    }

    static forbidden(message: string): ThrowException {
        return new ThrowException(403, message);
    }

    static notFound(message: string): ThrowException {
        return new ThrowException(404, message);
    }
}
