import { NextFunction, Request, Response } from "express";
import { CreateClientRequest } from "@Client/application/use-cases/create-client/create-client.cto";
import { ICreateClientUseCase } from "@Client/application/use-cases/create-client/create-client.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { inject, injectable } from "inversify";
import { CLIENT_SYMBOLS } from "@Client/infraestructure/container/client.symbols";

@injectable()
export class ClientController {
    constructor(@inject(CLIENT_SYMBOLS.CreateClient) private readonly createClientUseCase: ICreateClientUseCase) {
        this.createClient = this.createClient.bind(this);
    }

    async createClient(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.user?.userId;
            const data: CreateClientRequest = { ...req.body, id };
            const clientProfile = await this.createClientUseCase.execute(data);
            HttpResponse.success(res, clientProfile);
        } catch (error) {
            next(error);
        }
    }
}
