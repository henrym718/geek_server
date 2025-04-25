import { IdVO } from "@Core/value-objects";
import { IChatRepository } from "../../repositories/chat.repository";
import { GetChatsByUserIdRequest, GetChatsByUserIdResponse } from "./get-chats-by-userid.dto";
import { IGetChatsByUserIdUseCase } from "./get-chats-by-userid.use-case";
import { inject, injectable } from "inversify";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

@injectable()
export class GetChatsByUserIdUseCase implements IGetChatsByUserIdUseCase {
    constructor(
        @inject(SHARED_SYMBOLS.ChatRepository)
        private readonly chatRepository: IChatRepository
    ) {}

    async execute(request: GetChatsByUserIdRequest): Promise<GetChatsByUserIdResponse[]> {
        const userId = IdVO.create(request.userId);

        const chats = await this.chatRepository.findAllByUser(userId.getValue());

        return chats.map((chat) => ({
            chats: {
                id: chat.chat.id.getValue(),
            },
            client: {
                id: chat.client.id.getValue(),
                fullName: chat.clientProfile.fullName,
                image: chat.clientProfile?.photo?.getValue() ?? "",
            },
            vendor: {
                id: chat.vendor.id.getValue(),
                fullName: chat.vendorProfile.fullName,
                image: chat.vendorProfile?.photo?.getValue() ?? "",
            },
        }));
    }
}
