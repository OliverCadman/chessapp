

interface ICoords {
    [key: string]: number;
}

class Square {
    coordinates: ICoords;
    notation: string;
    constructor(coordinates: ICoords, notation: string) {
        this.coordinates = coordinates;
        this.notation = notation;
    }
}

export default Square