import { TokenPayload } from "@Shared/services/token/token.service";

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}
