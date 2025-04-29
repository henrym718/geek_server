import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { SearchRequest, SearchResponse } from "./search-vendor-profiles.dto";
import { ISearchVendorProfilesUseCase } from "./search-vendor-profiles.use-case";
import { inject, injectable } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";

/**
 * @class SearchVendorProfilesUseCase
 * @description Busca perfiles de vendedores con filtros y paginación.
 */
@injectable()
export class SearchVendorProfilesUseCase implements ISearchVendorProfilesUseCase {
    /**
     * @constructor
     * @param {IVendorProfilesRepository} vendorProfileRepository - Repositorio de perfiles de vendedores.
     */
    constructor(
        @inject(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository)
        private readonly vendorProfileRepository: IVendorProfilesRepository
    ) {}

    /**
     * @method execute
     * @description Ejecuta la búsqueda de perfiles.
     * @param {SearchRequest} data - Filtros de búsqueda.
     * @returns {Promise<SearchResponse>} - Resultados de la búsqueda.
     */
    async execute(request: SearchRequest): Promise<SearchResponse> {
        console.log(request.categoryName);
        // Construcción del filtro con valores predeterminados en caso de ser undefined
        const filter = {
            query: request.query as string,
            categoryName: request.categoryName as string,
            city: request.city as string,
            limit: Number(request.limit) || EnvBootstrap.ENV.LIMIT_PER_QUERY_PROFILES,
            order: (request.order as "asc" | "desc") ?? "asc",
            page: Number(request.page) || 1,
            skills: request.skills as string,
        };

        // Realiza la búsqueda de perfiles en el repositorio
        const { results, data } = await this.vendorProfileRepository.searchVendorProfiles(filter);

        // Cálculo de la paginación
        const currentPage = Number(filter.page) || 1;
        const pages = Math.ceil(results / filter.limit);
        const nextPage = currentPage < pages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

        // Construcción de la respuesta formateada
        return {
            results,
            currentPage,
            pages,
            nextPage,
            prevPage,
            data: data.map(({ vendor, vendorProfile, skills }) => ({
                vendor: {
                    id: vendor.id.getValue(),
                    firstName: vendor.firstName.getValue(),
                    lastName: vendor.lastName.getValue(),
                    city: vendor.city.getValue(),
                    phone: vendor.phone.getValue(),
                    photo: vendor.photo?.getValue() ?? "",
                },
                vendorProfile: {
                    id: vendorProfile.id.getValue(),
                    title: vendorProfile.title.getValue(),
                    aboutme: vendorProfile.aboutme.getValue(),
                    createdAt: vendorProfile.createdAt,
                    isActive: vendorProfile.isActive,
                },
                skills: skills.map((skill) => ({
                    id: skill.id.getValue(),
                    name: skill.name.getValue(),
                })),
            })),
        };
    }
}
