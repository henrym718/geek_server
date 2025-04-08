export interface ReqGetProformaRequestsByClientIdDto {
    clientId: string;
}

export interface ResGetProformaRequestsByClientIdDto {
    id: string;
    title: string;
    description: string;
    budget: number;
    scope: string;
    status: string;
    createdAt: Date | undefined;
    skills: {
        id: string;
        name: string;
    }[];
    categoty: {
        id: string;
        name: string;
    };
}
