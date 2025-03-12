import { HttpResponse } from "@Common/response/http.response";
import { ReqCanceledProformaRequest } from "@ProformaRequests/application/use-cases/canceled-proforma-request/canceled-proforma-request.dto";
import { ICanceledProformaRequestUseCase } from "@ProformaRequests/application/use-cases/canceled-proforma-request/canceled-proforma-request.use-case";
import { ReqCreateProformaRequestDto } from "@ProformaRequests/application/use-cases/create-proforma-request/create-proforma-requests.dto";
import { ICreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-request/create-proforma-requests.use-case";
import { ReqGetProformaRequestsByClientIdDto } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.dto";
import { IGetProformaRequestsByClientIdUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.use-case";
import { PROFORMA_REQ_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class ProformaRequestsController {
    constructor(
        @inject(PROFORMA_REQ_SYMBOLS.CreateProformaRequestsUseCase)
        private readonly createproformaRequestUseCase: ICreateProformaRequestsUseCase,

        @inject(PROFORMA_REQ_SYMBOLS.GetProformaRequestsByClientIdUseCase)
        private readonly getProformaRequestsByClientIdUseCase: IGetProformaRequestsByClientIdUseCase,

        @inject(PROFORMA_REQ_SYMBOLS.CanceledProformaRequestUseCase)
        private readonly canceledProformaRequestUseCase: ICanceledProformaRequestUseCase
    ) {
        this.createProformaRequest = this.createProformaRequest.bind(this);
        this.getProformaRequests = this.getProformaRequests.bind(this);
        this.canceledProformaRequest = this.canceledProformaRequest.bind(this);
    }

    async createProformaRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCreateProformaRequestDto = { ...req.body, clientId: req.user?.userId };
            const { detail } = await this.createproformaRequestUseCase.execute(data);
            HttpResponse.success(res, null, detail);
        } catch (error) {
            next(error);
        }
    }

    async getProformaRequests(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqGetProformaRequestsByClientIdDto = { clientId: req.user?.userId! };
            const proforomarequestList = await this.getProformaRequestsByClientIdUseCase.execute(data);
            HttpResponse.success(res, proforomarequestList);
        } catch (error) {
            next(error);
        }
    }

    async canceledProformaRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCanceledProformaRequest = { ...req.body, clientId: req.user?.userId! };
            const { details } = await this.canceledProformaRequestUseCase.execute(data);
            HttpResponse.success(res, null, details);
        } catch (error) {
            next(error);
        }
    }
}
