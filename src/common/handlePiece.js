/* eslint-disable no-undef */
import { Rotation } from "../common/pieces";

export const handlePieceTiles = (piece) => {
    const flipState = piece.flipState;
    let newTiles = [];
    const tiles = piece.originalTiles ? piece.originalTiles : piece.tiles;
    for (let tile of tiles) {
        let newRow = tile.row;
        let newCol = tile.col;
        switch (piece.rotation) {
            case Rotation.ROTATION_0:
                newRow = tile.row;
                newCol = tile.col;
                if (flipState === true) {
                    newCol = piece.dimensions.col - 1 - tile.col;
                }
                break;
            case Rotation.ROTATION_90:
                newRow = tile.col;
                newCol = piece.dimensions.row - 1 - tile.row;
                if (flipState) {
                    newRow = piece.dimensions.col - 1 - tile.col;
                }
                break;
            case Rotation.ROTATION_180:
                if (!flipState) {
                    newCol = piece.dimensions.col - 1 - tile.col;
                }
                newRow = piece.dimensions.row - 1 - tile.row;
                break;
            case Rotation.ROTATION_270:
                newCol = tile.row;
                newRow = piece.dimensions.col - 1 - tile.col;
                if (flipState) {
                    newRow = piece.dimensions.col - 1 - newRow;
                }
                break;
            default:
                break;
        }
        newTiles.push({ row: newRow, col: newCol });
    }
    piece.tiles = newTiles;
    return piece;
}

export const isTileAt = (piece, col, row, rotation, flipped) => {
    let localCol = col;
    let localRow = row;
    switch (rotation) {
        case Rotation.ROTATION_0:
            if (flipped) {
                localCol = getWidth(piece) - 1 - col;
            }
            break;
        case Rotation.ROTATION_90:
            localCol = row;
            localRow = getHeight(piece) - 1 - col;
            if (flipped) {
                localRow = getHeight(piece) - 1 - localRow;
            }
            break;
        case Rotation.ROTATION_180:
            if (!flipped) {
                localCol = getWidth(piece) - 1 - localCol;
            }
            localRow = getHeight(piece) - 1 - localRow;
            break;
        case Rotation.ROTATION_270:
            localCol = getWidth(piece) - 1 - row;
            localRow = col;
            if (flipped) {
                localRow = getHeight(piece) - 1 - localRow;
            }
            break;
        default:
            break;
    }
    if (localCol >= 0 && localRow >= 0 && localCol < getWidth(piece) && localRow < getHeight(piece)) {
        if (BigInt(0) !== (BigInt(piece.bitfield) & (BigInt(1) << BigInt(localRow * 8 + localCol)))) {
            return true;
        }
    }
    return false;
}

export const getWidth = (piece, r) => {
    if (!r) return piece.dimensions.col;
    if (r === Rotation.ROTATION_0 || r === Rotation.ROTATION_180) {
        return piece.dimensions.col;
    }
    return piece.dimensions.row;
}

export const getHeight = (piece, r) => {
    if (!r) return piece.dimensions.row;
    if (r === Rotation.ROTATION_0 || r === Rotation.ROTATION_180) {
        return piece.dimensions.row;
    }
    return piece.dimensions.col;
}