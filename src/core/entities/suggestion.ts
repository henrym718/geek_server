import { IdVO, TextVO } from "@Core/value-objects";

interface SuggestionProps {
    id: IdVO;
    text: TextVO;
    skillId: IdVO;
    categoryId: IdVO;
}

export class Suggestion {
    private constructor(private readonly props: SuggestionProps) {}

    public static create(props: SuggestionProps): Suggestion {
        return new Suggestion(props);
    }
    public static reconstitute(props: SuggestionProps): Suggestion {
        return new Suggestion(props);
    }

    public get id(): IdVO {
        return this.props.id;
    }

    public get text(): TextVO {
        return this.props.text;
    }

    public get skillId(): IdVO {
        return this.props.skillId;
    }

    public get categoryId(): IdVO {
        return this.props.categoryId;
    }
}
