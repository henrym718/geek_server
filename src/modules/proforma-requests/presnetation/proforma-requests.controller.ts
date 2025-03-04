import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateProformaRequestDto } from "@ProformaRequests/application/use-cases/create-proforma-requests/create-proforma-requests.dto";
import { ICreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-requests/create-proforma-requests.use-case";
import { PROFORMA_REQUEST_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class ProformaRequestsController {
    constructor(
        @inject(PROFORMA_REQUEST_SYMBOLS.CreateProformaRequestsUseCase) private readonly createproformaRequestUseCase: ICreateProformaRequestsUseCase
    ) {
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateProformaRequestDto = { ...req.body, clientId: req.user?.userId };
            const { detail } = await this.createproformaRequestUseCase.execute(data);
            HttpResponse.success(res, null, detail);
        } catch (error) {
            next(error);
        }
    }
}
