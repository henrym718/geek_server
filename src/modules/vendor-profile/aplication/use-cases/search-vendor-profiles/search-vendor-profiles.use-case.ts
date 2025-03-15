import { SearchRequest, SearchResponse } from "./search-vendor-profiles.dto";

export interface ISearchVendorProfilesUseCase {
    execute(data: SearchRequest): Promise<SearchResponse>;
}
