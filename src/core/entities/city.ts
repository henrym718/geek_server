import { IdVO, TextVO } from "@Core/value-objects";

interface CityProps {
    id: IdVO;
    name: TextVO;
}

export class City {
    constructor(private readonly props: CityProps) {}

    static create(props: CityProps): City {
        return new City(props);
    }

    static reconstitute(props: CityProps): City {
        return new City(props);
    }

    get id(): IdVO {
        return this.props.id;
    }

    get name(): TextVO {
        return this.props.name;
    }
}
