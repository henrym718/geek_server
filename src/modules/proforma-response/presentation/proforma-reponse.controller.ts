import { NextFunction, Request, Response } from "express";
import { ICreateProformaResponseUseCase } from "../application/use-cases/create-proforma-response/create-proforma-response.use-case";
import { HttpResponse } from "@Common/response/http.response";
import { ReqCreateProformaResponseDto } from "../application/use-cases/create-proforma-response/create-proforma-response.dto";
import { inject, injectable } from "inversify";
import { PROFORMA_RES_SYMBOLS } from "../infraestructure/container/proforma-reponse.symbols";
import { IGetProformaResponsesByRequestIdUseCase } from "../application/use-cases/get-proforma-responses-by-proforma-request-Id/get-proforma-responses-by-proforma-request-id.use-case";
import { GetProformaResponsesByRequestIdRequest } from "../application/use-cases/get-proforma-responses-by-proforma-request-Id/get-proforma-responses-by-proforma-request-id.dto";
import { IUpdateProformaResponseStatusByClientUseCase } from "../application/use-cases/update-proforma-response-status-by-client/update-proforma-response-status-by-client.use-case";
import { UpdateStatusByClientRequest } from "../application/use-cases/update-proforma-response-status-by-client/update-proforma-response-status-by-client.dto";
import { ICheckProformaResponseExistsUseCase } from "../application/use-cases/chek-proforma-response-exists/chek-proforma-response-exists.use-case";
import { CheckProformaResponseExistsRequest } from "../application/use-cases/chek-proforma-response-exists/chek-proforma-response-exists.dto";

@injectable()
export class ProformaReponseController {
    constructor(
        @inject(PROFORMA_RES_SYMBOLS.CreateProformaResponse)
        private readonly createProformaResponseUseCase: ICreateProformaResponseUseCase,

        @inject(PROFORMA_RES_SYMBOLS.GetproformaResponsesByRequestId)
        private readonly getProformaResponsesByRequestIdUseCase: IGetProformaResponsesByRequestIdUseCase,

        @inject(PROFORMA_RES_SYMBOLS.UpdateProformaResponseStatusByClient)
        private readonly updateProformaResponseStatusByClientUseCase: IUpdateProformaResponseStatusByClientUseCase,

        @inject(PROFORMA_RES_SYMBOLS.CheckProformaResponseExists)
        private readonly checkProformaResponseExistsUseCase: ICheckProformaResponseExistsUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAllByRequestId = this.getAllByRequestId.bind(this);
        this.updateStatusByClient = this.updateStatusByClient.bind(this);
        this.checkProformaResponseExists = this.checkProformaResponseExists.bind(this);
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

    async getAllByRequestId(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetProformaResponsesByRequestIdRequest = { requestId: req.params.requestid };
            const responses = await this.getProformaResponsesByRequestIdUseCase.execute(data);
            HttpResponse.success(res, responses);
        } catch (error) {
            next(error);
        }
    }

    async updateStatusByClient(req: Request, res: Response, next: NextFunction) {
        try {
            const clientId = req.user?.userId;
            const data: UpdateStatusByClientRequest = { ...req.body, clientId };
            const responses = await this.updateProformaResponseStatusByClientUseCase.execute(data);
            HttpResponse.success(res, responses);
        } catch (error) {
            next(error);
        }
    }
    async checkProformaResponseExists(req: Request, res: Response, next: NextFunction) {
        try {
            const data: CheckProformaResponseExistsRequest = {
                profileVendorId: req.params.profileid,
                proformaRequestId: req.params.requestid,
            };
            const responses = await this.checkProformaResponseExistsUseCase.execute(data);
            HttpResponse.success(res, responses);
        } catch (error) {
            next(error);
        }
    }
}
