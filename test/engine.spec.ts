import { expect } from 'chai';
import 'mocha';
import { GameOfLifeEngine } from '../src/engine';

/*
    it('', () => {
      // Prepare
      // Act
      // Assert
    });
*/

describe('Game of Life',
  () => {
    it('should instantiate engine', () => {
      const sut = new GameOfLifeEngine([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1]
      ]);

      expect(sut).to.be.instanceOf(GameOfLifeEngine);
    });

    it('should check cell life', () => {
      const sut = new GameOfLifeEngine([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1]
      ]);

      const res = sut.isAlive(0, 0);
      expect(res).to.be.false;
    });

    it('should initialize world', () => {
      const sut = new GameOfLifeEngine([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1]
      ]);

      expect(sut.isAlive(1, 1)).to.be.false;
      expect(sut.isAlive(3, 3)).to.be.true;
    });

    it('an alive with less than 2 friends dies', () => {
      const sut = new GameOfLifeEngine([
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1]
      ]);

      sut.nextGeneration();

      expect(sut.isAlive(1, 1)).to.be.false;
      expect(sut.isAlive(3, 3)).to.be.true;
    });

    it('an alive cell with more than 3 friends dies', () => {
      const sut = new GameOfLifeEngine([
        [1, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1]
      ]);

      sut.nextGeneration();

      expect(sut.isAlive(1, 1)).to.be.false;
      expect(sut.isAlive(3, 3)).to.be.true;
    });

    it('a dead cell with exactly 3 friends lives', () => {
      const sut = new GameOfLifeEngine([
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 1]
      ]);

      sut.nextGeneration();

      expect(sut.isAlive(1, 1)).to.be.true;
      expect(sut.isAlive(3, 3)).to.be.true;
    });
  });