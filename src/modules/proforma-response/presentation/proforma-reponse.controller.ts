import { NextFunction, Request, Response } from "express";
import { ICreateProformaResponseUseCase } from "../application/use-cases/create-proforma-response/create-proforma-response.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateProformaResponseDto } from "../application/use-cases/create-proforma-response/create-proforma-response.dto";
import { inject, injectable } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "../infraestructure/container/proforma-reponse.symbols";
import { IGetProformaResponsesByRequestIdUseCase } from "../application/use-cases/get-proforma-responses-by-proforma-request-Id/get-proforma-responses-by-proforma-request-id.use-case";
import { ReqGetProformaResponsesByRequestIdDto } from "../application/use-cases/get-proforma-responses-by-proforma-request-Id/get-proforma-responses-by-proforma-request-id.dto";

@injectable()
export class ProformaReponseController {
    constructor(
        @inject(PROFORMA_RES_SYMBOLS.CreateProformaResponseUseCase)
        private readonly createProformaResponseUseCase: ICreateProformaResponseUseCase,
        @inject(PROFORMA_RES_SYMBOLS.GetproformaResponsesByRequestId)
        private readonly getProformaResponsesByRequestIdUseCase: IGetProformaResponsesByRequestIdUseCase
    ) {
        this.createProformaResponse = this.createProformaResponse.bind(this);
        this.getpPoformaResponsesByRequestId = this.getpPoformaResponsesByRequestId.bind(this);
    }

    async createProformaResponse(req: Request, res: Response, next: NextFunction) {
        try {
            const vendorId = req.user?.userId;
            const data: ReqCreateProformaResponseDto = { ...req.body, vendorId };
            const { details } = await this.createProformaResponseUseCase.execute(data);
            HttpResponse.success(res, null, details);
        } catch (error) {
            next(error);
        }
    }

    async getpPoformaResponsesByRequestId(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqGetProformaResponsesByRequestIdDto = { requestId: req.params.requestid };
            const responses = await this.getProformaResponsesByRequestIdUseCase.execute(data);
            HttpResponse.success(res, responses);
        } catch (error) {
            next(error);
        }
    }
}
