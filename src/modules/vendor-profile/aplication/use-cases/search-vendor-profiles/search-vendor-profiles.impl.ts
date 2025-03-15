import { IVendorProfilesRepository } from "@VendorProfile/aplication/repositories/vendor-profile.repository";
import { SearchRequest, SearchResponse } from "./search-vendor-profiles.dto";
import { ISearchVendorProfilesUseCase } from "./search-vendor-profiles.use-case";
import { inject, injectable } from "inversify";
import { VENDOR_PROFILE_SYMBOLS } from "@VendorProfile/infraestructure/container/vendor-profile.symbols";
import { EnvBootstrap } from "@Bootstraps/env.bootstrap";

@injectable()
export class SearchVendorProfilesUseCase implements ISearchVendorProfilesUseCase {
    constructor(
        @inject(VENDOR_PROFILE_SYMBOLS.VendorProfileRepository)
        private readonly vendorProfileRepository: IVendorProfilesRepository
    ) {}
    async execute(data: SearchRequest): Promise<SearchResponse> {
        const { query, categoryName, order, city, skills, page, limit } = data;

        const filter: Required<SearchRequest> = {
            query: (query as string) ?? undefined,
            categoryName: (categoryName as string) ?? undefined,
            city: (city as string) ?? undefined,
            limit: Number(limit) || EnvBootstrap.ENV.LIMIT_PER_QUERY,
            order: (order as "asc" | "desc") ?? "asc",
            page: Number(page) || 1,
            skills: (skills as string) ?? undefined,
        };

        const { results, vendorProfiles } = await this.vendorProfileRepository.searchVendorProfiles(filter);

        const currentPage = Number(data.page) || 1;
        const pages = Math.ceil(results / (data.limit ? data.limit : EnvBootstrap.ENV.LIMIT_PER_QUERY));
        const nextPage = currentPage < pages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;

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
