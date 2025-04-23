import { IdVO } from "@Core/value-objects";
import { IChatRepository } from "../../repositories/chat.repository";
import { CreateChatResponse, CreateChatRequest } from "./create-chat.dto";
import { ICreateChatUseCase } from "./create-chat.use-case";
import { Chat } from "@Core/entities/chat";
import { IUUIDService } from "@Shared/services/uuid/uuid.service";
import { inject, injectable } from "inversify";
import { SHARED_SYMBOLS } from "@Shared/container/shared.symbols";

// Clase que implementa el caso de uso para crear un chat entre un cliente y un vendedor
@injectable()
export class CreateChatUseCase implements ICreateChatUseCase {
    // Inyección de dependencias mediante constructor
    constructor(
        @inject(SHARED_SYMBOLS.ChatRepository)
        private readonly chatRepository: IChatRepository,

        @inject(SHARED_SYMBOLS.UUIDService)
        private readonly idService: IUUIDService
    ) {}

    async execute(request: CreateChatRequest): Promise<CreateChatResponse> {
        // Creación de objetos de valor para los IDs
        const id = IdVO.create(this.idService.generateUUID());
        const clientId = IdVO.create(request.clientId);
        const vendorId = IdVO.create(request.vendorId);

        // Verifica si ya existe un chat entre estos usuarios
        const existsChat = await this.chatRepository.findByUsers(clientId.getValue(), vendorId.getValue());

        // Si existe un chat, retorna el ID del chat existente
        if (existsChat) return { charId: existsChat.id.getValue() };

        // Crea una nueva entidad de Chat con los IDs correspondientes
        const chat = Chat.create({ id, clientId, vendorId });

        // Persiste el nuevo chat en el repositorio
        const newChat = await this.chatRepository.create(chat);

        // Retorna el ID del chat creado
        return { charId: newChat.id.getValue() };
    }
}
