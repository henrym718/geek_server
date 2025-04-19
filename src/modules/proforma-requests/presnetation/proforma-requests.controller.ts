import { HttpResponse } from "@Common/response/http.response";
import { ReqCanceledProformaRequest } from "@ProformaRequests/application/use-cases/canceled-proforma-request/canceled-proforma-request.dto";
import { ICanceledProformaRequestUseCase } from "@ProformaRequests/application/use-cases/canceled-proforma-request/canceled-proforma-request.use-case";
import { ReqCreateProformaRequestDto } from "@ProformaRequests/application/use-cases/create-proforma-request/create-proforma-requests.dto";
import { ICreateProformaRequestsUseCase } from "@ProformaRequests/application/use-cases/create-proforma-request/create-proforma-requests.use-case";
import { GetProformaRequestsByClientIdRequest } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.dto";
import { IGetProformaRequestsByClientUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-clientid/get-proforma-requests-by-clientid.use-case";
import { GetByVendorProfilerRequest } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-vendor-profile/get-proforma-requests-by-vendor-profile.dto";
import { IGetProformaRequestsByVendorProfileUseCase } from "@ProformaRequests/application/use-cases/get-proforma-requests-by-vendor-profile/get-proforma-requests-by-vendor-profile.use-case";
import { PROFORMA_REQ_SYMBOLS } from "@ProformaRequests/infraestructure/container/proforma-requests.symbols";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class ProformaRequestsController {
    constructor(
        @inject(PROFORMA_REQ_SYMBOLS.CreateProformaRequestsUseCase)
        private readonly createproformaRequestUseCase: ICreateProformaRequestsUseCase,

        @inject(PROFORMA_REQ_SYMBOLS.GetProformaRequestsByClientUseCase)
        private readonly getProformaRequestsByClientUseCase: IGetProformaRequestsByClientUseCase,

        @inject(PROFORMA_REQ_SYMBOLS.CanceledProformaRequestUseCase)
        private readonly canceledProformaRequestUseCase: ICanceledProformaRequestUseCase,

        @inject(PROFORMA_REQ_SYMBOLS.GetProformaRequestsByVendorProfile)
        private readonly getProformaRequestsByVendorProfileUseCase: IGetProformaRequestsByVendorProfileUseCase
    ) {
        this.create = this.create.bind(this);
        this.getAllByClient = this.getAllByClient.bind(this);
        this.canceledByClient = this.canceledByClient.bind(this);
        this.getAllByVendorProfile = this.getAllByVendorProfile.bind(this);
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

    async getAllByClient(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetProformaRequestsByClientIdRequest = { clientId: req.user?.userId!, status: req.query.search as string };
            const proforomarequestList = await this.getProformaRequestsByClientUseCase.execute(data);
            HttpResponse.success(res, proforomarequestList);
        } catch (error) {
            next(error);
        }
    }

    async canceledByClient(req: Request, res: Response, next: NextFunction) {
        try {
            const data: ReqCanceledProformaRequest = { ...req.body, clientId: req.user?.userId! };
            const { details } = await this.canceledProformaRequestUseCase.execute(data);
            HttpResponse.success(res, null, details);
        } catch (error) {
            next(error);
        }
    }

    async getAllByVendorProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const data: GetByVendorProfilerRequest = { vendorProfileId: req.params?.profileid, vendorId: req.user?.userId! };
            const response = await this.getProformaRequestsByVendorProfileUseCase.execute(data);
            HttpResponse.success(res, response);
        } catch (error) {
            next(error);
        }
    }
}
