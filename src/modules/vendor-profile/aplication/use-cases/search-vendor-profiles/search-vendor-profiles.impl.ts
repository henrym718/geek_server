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
    async execute(data: SearchRequest): Promise<SearchResponse> {
        // Construcción del filtro con valores predeterminados en caso de ser undefined
        const filter = {
            query: data.query as string,
            categoryName: data.categoryName as string,
            city: data.city as string,
            limit: Number(data.limit) || EnvBootstrap.ENV.LIMIT_PER_QUERY,
            order: (data.order as "asc" | "desc") ?? "asc",
            page: Number(data.page) || 1,
            skills: data.skills as string,
        };

        // Realiza la búsqueda de perfiles en el repositorio
        const { results, vendorProfiles } = await this.vendorProfileRepository.searchVendorProfiles(filter);

        // Cálculo de la paginación
        const currentPage = Number(data.page) || 1;
        const pages = Math.ceil(results / (data.limit ?? EnvBootstrap.ENV.LIMIT_PER_QUERY));
        const nextPage = currentPage < pages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

        // Construcción de la respuesta formateada
        return {
            results,
            currentPage,
            pages,
            nextPage,
            prevPage,
            data: vendorProfiles.map(({ vendor, vendorProfile, skills }) => ({
                vendor: {
                    id: vendor.id.getValue(),
                    firstName: vendor.firstName.getValue(),
                    lastName: vendor.lastName.getValue(),
                    city: vendor.city.getValue(),
                    phone: vendor.phone.getValue(),
                    photo: vendor.photo.getValue(),
                },
                vendorProfile: {
                    id: vendorProfile.id.getValue(),
                    title: vendorProfile.title.getValue(),
                    aboutme: vendorProfile.aboutme.getValue(),
                    createdAt: vendorProfile.createdAt,
                },
                skills: {
                    name: skills.map((skill) => skill.name.getValue()).join(","),
                },
            })),
        };
    }
}
