export interface ReqCreateProformaRequestDto {
    title: string;
    description: string;
    budget?: number;
    budgetUnit?: string;
    quotation?: boolean;
    city: string;
    projectType: string;
    projectLength: string;
    projectWorkload: string;
    clientId: string;
    categoryId: string;
    skills: string[];
}

export interface ResCreateProformaRequestDto {
    detail: string;
}
