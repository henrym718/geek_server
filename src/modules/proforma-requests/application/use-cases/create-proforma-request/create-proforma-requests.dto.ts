export interface ReqCreateProformaRequestDto {
    title: string;
    description: string;
    budget: number;
    scope: string;
    clientId: string;
    categoryId: string;
    skills: string[];
}

export interface ResCreateProformaRequestDto {
    detail: string;
}
