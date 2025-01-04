class Exception extends Error {
    private constructor(public readonly status: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, Exception.prototype);
    }

    static badRequest(message: string): Exception {
        return new Exception(400, message);
    }

    static unauthorized(message: string): Exception {
        return new Exception(401, message);
    }

    static forbidden(message: string): Exception {
        return new Exception(403, message);
    }

    static notFound(message: string): Exception {
        return new Exception(404, message);
    }
}
