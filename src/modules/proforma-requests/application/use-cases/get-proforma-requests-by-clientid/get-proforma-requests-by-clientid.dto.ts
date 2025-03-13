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

type SKills = {
    id: string;
    name: string;
};

type Category = {
    id: string;
    name: string;
};
