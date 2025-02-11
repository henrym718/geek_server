import { ResListGroupDTO } from "@Group/application/dtos/res-list-group.dto";

export interface IListGroupsUseCase {
    execute(): Promise<ResListGroupDTO[]>;
}
