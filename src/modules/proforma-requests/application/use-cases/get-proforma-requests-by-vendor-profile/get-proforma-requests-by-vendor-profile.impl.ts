import { inject, injectable } from "inversify";
import { IdVO } from "@Core/value-objects";
import { IProformaRequestsRepository } from "@ProformaRequests/application/repositories/proforma-requests.repository";
import { GetByVendorProfilerRequest, GetByVendorProfilerResponse } from "./get-proforma-requests-by-vendor-profile.dto";
import { IGetProformaRequestsByVendorProfileUseCase } from "./get-proforma-requests-by-vendor-profile.use-case";
import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { HttpException } from "@Common/exceptions/http.exception";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

/**
 * Caso de uso: Obtener solicitudes de proforma asociadas a un perfil de vendedor.
 * Este caso de uso recupera las solicitudes de proforma filtradas por perfil de vendedor
 * y sus habilidades asociadas, verificando permisos de acceso y pertenencia.
 */

@injectable()
export class GetProformaRequestsByVendorProfileUseCase implements IGetProformaRequestsByVendorProfileUseCase {
    // Constructor que inyecta los repositorios necesarios para ejecutar el caso de uso
    constructor(
        // Inyecta el repositorio de solicitudes de proforma
        @inject(SHARED_SYMBOLS.ProformaRequestRepository)
        private readonly proformaRequestRepository: IProformaRequestsRepository,

        // Inyecta el repositorio de perfiles de vendedores
        @inject(SHARED_SYMBOLS.VendorProfileRepository)
        private readonly vendorProfileRepository: IVendorProfilesRepository
    ) {}

    /**
     * @param data - Datos de entrada con el ID del vendedor y el ID del perfil de vendedor.
     * @returns Una lista de respuestas que contienen los detalles de las solicitudes de proforma.
     * @throws {HttpException} - Si el perfil no existe o no pertenece al vendedor.
     */

    async execute(data: GetByVendorProfilerRequest): Promise<GetByVendorProfilerResponse[]> {
        // Crea objetos de valor (Value Objects) para el ID del vendedor y el ID del perfil de vendedor
        const vendorId = IdVO.create(data.vendorId);
        const vendorProfileId = IdVO.create(data.vendorProfileId);

        // Recupera el perfil del vendedor junto con los IDs de sus habilidades
        const vendorProfile = await this.vendorProfileRepository.findByIdWithSkillsId(vendorProfileId.getValue());

        // Verifica si el perfil de vendedor existe
        if (!vendorProfile) throw HttpException.notFound("Vendor Profile not found");

        // Verifica si el perfil de vendedor pertenece al vendedor proporcionado
        if (!vendorProfile.vendorId.equals(vendorId)) {
            throw HttpException.forbidden("Vendor Profile does not belong to the vendor");
        }

        // Obtiene las solicitudes de proforma filtradas por la categoría del perfil y sus habilidades
        const request = await this.proformaRequestRepository.findByCategoryIdAndSkills(
            vendorProfile.categoryId.getValue(),
            vendorProfile.skills.map((id) => id.getValue())
        );

        // Mapea las solicitudes obtenidas en el formato de respuesta esperado
        return request.map(({ proformaRequest, category, skills }) => ({
            request: {
                id: proformaRequest.id.getValue(),
                title: proformaRequest.title.getValue(),
                description: proformaRequest.description.getValue(),
                status: proformaRequest.status.getValue(),
                createdAt: proformaRequest.createdAt,
                countResponses: proformaRequest.countResponses,
                projectType: proformaRequest.projectType.getValue(),
                projectLength: proformaRequest.projectLength.getValue(),
                projectWorkload: proformaRequest.projectWorkload.getValue(),
                scope: proformaRequest.scope.getValue(),
                budget: proformaRequest.budget?.getValue() ?? 0,
                budgetUnit: proformaRequest.budgetUnit?.getValue() ?? undefined,
                quotation: proformaRequest.quotation ?? undefined,
            },
            category: {
                id: category.id.getValue(),
                name: category.name.getValue(),
            },
            skills: skills.map((skill) => ({
                id: skill.id.getValue(),
                name: skill.name.getValue(),
            })),
        }));
    }
}
