export interface ReqCreateProformaRequestDto {
    description: string;
    budget: number;
    clientId: string;
    categoryId: string;
    skills: string[];
}

export interface ResCreateProformaRequestDto {
    detail: string;
}
