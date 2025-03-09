export interface ReqGetProformaRequestsByClientIdDto {
    clientId: string;
}

export interface ResGetProformaRequestsByClientIdDto {
    id: string;
    description: string;
    budget: number;
    status: string;
    createdAt: Date | undefined;
    skills: SKills[];
    categoty: Category;
}

interface SKills {
    id: string;
    name: string;
}

interface Category {
    id: string;
    name: string;
}
