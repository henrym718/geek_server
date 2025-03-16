import { Suggestion } from "@Core/entities/suggestion";
import { IdVO, TextVO } from "@Core/value-objects";
import { Suggestion as PrismaSuggestion } from "@prisma/client";

export class SuggestionMapper {
    public static toDomain(entity: PrismaSuggestion): Suggestion {
        return Suggestion.reconstitute({
            id: IdVO.create(entity.id),
            text: TextVO.create("text", entity.text),
            categoryId: IdVO.create(entity.categoryId),
            skillId: IdVO.create(entity.skillId),
        });
    }
}
