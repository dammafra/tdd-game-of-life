"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const engine_1 = require("../src/engine");
/*
    it('', () => {
      // Prepare
      // Act
      // Assert
    });
*/
describe('Game of Life', () => {
    it('should instantiate engine', () => {
        const sut = new engine_1.GameOfLifeEngine([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1]
        ]);
        chai_1.expect(sut).to.be.instanceOf(engine_1.GameOfLifeEngine);
    });
    it('should check cell life', () => {
        const sut = new engine_1.GameOfLifeEngine([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1]
        ]);
        const res = sut.isAlive(0, 0);
        chai_1.expect(res).to.be.false;
    });
    it('should initialize world', () => {
        const sut = new engine_1.GameOfLifeEngine([
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1]
        ]);
        chai_1.expect(sut.isAlive(1, 1)).to.be.false;
        chai_1.expect(sut.isAlive(3, 3)).to.be.true;
    });
    it('an alive with less than 2 friends dies', () => {
        const sut = new engine_1.GameOfLifeEngine([
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1]
        ]);
        sut.nextGeneration();
        chai_1.expect(sut.isAlive(1, 1)).to.be.false;
        chai_1.expect(sut.isAlive(3, 3)).to.be.true;
    });
    it('an alive cell with more than 3 friends dies', () => {
        const sut = new engine_1.GameOfLifeEngine([
            [1, 1, 1, 0, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1]
        ]);
        sut.nextGeneration();
        chai_1.expect(sut.isAlive(1, 1)).to.be.false;
        chai_1.expect(sut.isAlive(3, 3)).to.be.true;
    });
    it('a dead cell with exactly 3 friends lives', () => {
        const sut = new engine_1.GameOfLifeEngine([
            [0, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1],
            [0, 0, 0, 1, 1]
        ]);
        sut.nextGeneration();
        chai_1.expect(sut.isAlive(1, 1)).to.be.true;
        chai_1.expect(sut.isAlive(3, 3)).to.be.true;
    });
});
//# sourceMappingURL=engine.spec.js.map