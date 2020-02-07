"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameOfLifeEngine {
    constructor(world) {
        this.SEPARATOR = '_';
        this.world = new Map();
        world.forEach((row, rowIndex) => {
            row.forEach((column, colIndex) => {
                if (column === 1) {
                    const key = this.getKey(rowIndex, colIndex);
                    this.world.set(key, true);
                }
            });
        });
    }
    getKey(rowIndex, colIndex) {
        return rowIndex + this.SEPARATOR + colIndex;
    }
    getCoords(key) {
        return key.split(this.SEPARATOR).map(c => Number(c));
    }
    getFriends(key) {
        const [rowIndex, colIndex] = this.getCoords(key);
        return [
            [rowIndex + 1, colIndex + 1],
            [rowIndex - 1, colIndex - 1],
            [rowIndex + 1, colIndex - 1],
            [rowIndex - 1, colIndex + 1],
            [rowIndex, colIndex + 1],
            [rowIndex, colIndex - 1],
            [rowIndex + 1, colIndex],
            [rowIndex - 1, colIndex]
        ];
    }
    getAliveFriends(key) {
        const friends = this.getFriends(key);
        return friends.filter(([r, c]) => this.isAlive(r, c));
    }
    getDeadFriends(key) {
        const friends = this.getFriends(key);
        return friends.filter(([r, c]) => !this.isAlive(r, c));
    }
    isAlive(rowIndex, colIndex) {
        const key = this.getKey(rowIndex, colIndex);
        return this.world.has(key);
    }
    nextGeneration() {
        const newWorld = new Map();
        Array.from(this.world.keys())
            .forEach(key => {
            const count = this.getAliveFriends(key).length;
            if (count === 2 || count === 3) {
                newWorld.set(key, true);
            }
            const deadFriends = this.getDeadFriends(key);
            deadFriends.forEach(([r, c]) => {
                const keyDead = this.getKey(r, c);
                const countAlive = this.getAliveFriends(keyDead).length;
                if (countAlive === 3) {
                    newWorld.set(keyDead, true);
                }
            });
        });
        this.world = newWorld;
    }
}
exports.GameOfLifeEngine = GameOfLifeEngine;
//# sourceMappingURL=engine.js.map