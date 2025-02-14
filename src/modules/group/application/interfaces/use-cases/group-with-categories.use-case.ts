import { ResGroupWithCategoriesDTO } from "@Group/application/dtos/res-group-with-categories.dto ";

export interface IGroupWithCategoriesUseCase {
    execute(id: string): Promise<ResGroupWithCategoriesDTO>;
}
