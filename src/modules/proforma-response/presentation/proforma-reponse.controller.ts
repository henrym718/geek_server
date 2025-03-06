import { NextFunction, Request, Response } from "express";
import { ICreateProformaResponseUseCase } from "../application/use-cases/create/create-proforma-response.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateProformaResponseDto } from "../application/use-cases/create/create-proforma-response.dto";
import { inject, injectable } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "../infraestructure/container/proforma-reponse.symbols";

@injectable()
export class ProformaReponseController {
    constructor(
        @inject(PROFORMA_RES_SYMBOLS.CreateProformaResponseUseCase) private readonly createProformaResponseUseCase: ICreateProformaResponseUseCase
    ) {
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const vendorId = req.user?.userId;
            const data: ReqCreateProformaResponseDto = { ...req.body, vendorId };
            const { details } = await this.createProformaResponseUseCase.execute(data);
            HttpResponse.success(res, null, details);
        } catch (error) {
            next(error);
        }
    }
}
