export const Rotation = {
    ROTATION_0: 'ROTATION_0',
    ROTATION_90: 'ROTATION_90',
    ROTATION_180: 'ROTATION_180',
    ROTATION_270: 'ROTATION_270',
};

export class Tile {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
}

export const PieceDescriptions = [
    {
        symbol: 'A',
        tiles: [new Tile(0, 0), new Tile(2, 0), new Tile(0, 1), new Tile(1, 1), new Tile(2, 1)],
        originalTiles: [new Tile(0, 0), new Tile(2, 0), new Tile(0, 1), new Tile(1, 1), new Tile(2, 1)],
        dimensions: new Tile(3, 2),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#e4240d'
    },
    {
        symbol: 'B',
        tiles: [new Tile(1, 0), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2), new Tile(0, 3)],
        originalTiles: [new Tile(1, 0), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2), new Tile(0, 3)],
        dimensions: new Tile(2, 4),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#ee69a3',
    },
    {
        symbol: 'C',
        tiles: [new Tile(1, 0), new Tile(0, 1), new Tile(1, 1), new Tile(1, 2), new Tile(2, 2)],
        originalTiles: [new Tile(1, 0), new Tile(0, 1), new Tile(1, 1), new Tile(1, 2), new Tile(2, 2)],
        dimensions: new Tile(3, 3),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#f5a4c8',
    },
    {
        symbol: 'D',
        tiles: [new Tile(0, 0), new Tile(1, 0), new Tile(2, 0), new Tile(1, 1)],
        originalTiles: [new Tile(0, 0), new Tile(1, 0), new Tile(2, 0), new Tile(1, 1)],
        dimensions: new Tile(3, 2),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#179ad9',
    },
    {
        symbol: 'E',
        tiles: [new Tile(1, 0), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2), new Tile(1, 3)],
        originalTiles: [new Tile(1, 0), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2), new Tile(1, 3)],
        dimensions: new Tile(2, 4),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#fee83a',
    },
    {
        symbol: 'F',
        tiles: [new Tile(1, 0), new Tile(0, 1), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2)],
        originalTiles: [new Tile(1, 0), new Tile(0, 1), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2)],
        dimensions: new Tile(2, 3),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#b96bae',
    },
    {
        symbol: 'G',
        tiles: [new Tile(1, 0), new Tile(2, 0), new Tile(0, 1), new Tile(1, 1)],
        originalTiles: [new Tile(1, 0), new Tile(2, 0), new Tile(0, 1), new Tile(1, 1)],
        dimensions: new Tile(3, 2),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#8e58a5',
    },
    {
        symbol: 'H',
        tiles: [new Tile(1, 0), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2)],
        originalTiles: [new Tile(1, 0), new Tile(1, 1), new Tile(0, 2), new Tile(1, 2)],
        dimensions: new Tile(2, 3),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#65bc68',
    },
    {
        symbol: 'I',
        tiles: [new Tile(2, 0), new Tile(2, 1), new Tile(0, 2), new Tile(1, 2), new Tile(2, 2)],
        originalTiles: [new Tile(2, 0), new Tile(2, 1), new Tile(0, 2), new Tile(1, 2), new Tile(2, 2)],
        dimensions: new Tile(3, 3),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#f3742b',
    },
    {
        symbol: 'J',
        tiles: [new Tile(1, 0), new Tile(1, 1), new Tile(1, 2), new Tile(0, 3), new Tile(1, 3)],
        originalTiles: [new Tile(1, 0), new Tile(1, 1), new Tile(1, 2), new Tile(0, 3), new Tile(1, 3)],
        dimensions: new Tile(2, 4),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#1b8841',
    },
    {
        symbol: 'K',
        tiles: [new Tile(0, 0), new Tile(0, 1), new Tile(1, 1)],
        originalTiles: [new Tile(0, 0), new Tile(0, 1), new Tile(1, 1)],
        dimensions: new Tile(2, 2),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#edb02e',
    },
    {
        symbol: 'L',
        tiles: [new Tile(2, 0), new Tile(1, 1), new Tile(2, 1), new Tile(0, 2), new Tile(1, 2)],
        originalTiles: [new Tile(2, 0), new Tile(1, 1), new Tile(2, 1), new Tile(0, 2), new Tile(1, 2)],
        dimensions: new Tile(3, 3),
        rotation: Rotation.ROTATION_0,
        flipState: false,
        color: '#89c8ec',
    },
];