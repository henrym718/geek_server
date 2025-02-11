import { symbol } from "zod";

export const GROUP_SYMBOLS = {
    GroupRepository: Symbol.for("GroupRepository"),
    IdService: Symbol.for("IdService"),
    CreateGroupUseCase: Symbol.for("CreateGroupUseCase"),
    UpdateGroupUseCase: Symbol.for("UpdateGroupUseCase"),
};
