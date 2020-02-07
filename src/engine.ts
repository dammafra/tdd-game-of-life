export class GameOfLifeEngine {
    private SEPARATOR = '_';
    world: Map<string, any> = new Map();

    constructor(world: number[][]) {
        world.forEach((row, rowIndex) => {
            row.forEach((column, colIndex) => {
                if (column === 1) {
                    const key = this.getKey(rowIndex, colIndex);
                    this.world.set(key, true);
                }
            })
        });
    }

    private getKey(rowIndex: number, colIndex: number) {
        return rowIndex + this.SEPARATOR + colIndex;
    }

    private getCoords(key: string) {
        return key.split(this.SEPARATOR).map(c => Number(c));
    }

    private getFriends(key: string) {
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

    private getAliveFriends(key: string) {
        const friends = this.getFriends(key);
        return friends.filter(([r, c]) => this.isAlive(r, c));
    }

    private getDeadFriends(key: string) {
        const friends = this.getFriends(key);
        return friends.filter(([r, c]) => !this.isAlive(r, c));
    }

    public isAlive(rowIndex: number, colIndex: number) {
        const key = this.getKey(rowIndex, colIndex);
        return this.world.has(key);
    }

    public nextGeneration() {
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