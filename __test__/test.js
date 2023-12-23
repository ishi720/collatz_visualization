const collatz_visualization = require('./../app/js/customize.min.js');
describe('collatz', () => {
    it ('out of calc range', () => {
        expect(collatz_visualization.collatz(0)).toBe(0);
        expect(collatz_visualization.collatz(1)).toBe(1);
    });
    it ('odd number', () => {
        expect(collatz_visualization.collatz(3)).toBe(10);
        expect(collatz_visualization.collatz(5)).toBe(16);
        expect(collatz_visualization.collatz(7)).toBe(22);
        expect(collatz_visualization.collatz(9)).toBe(28);
    });
    it ('even number', () => {
        expect(collatz_visualization.collatz(2)).toBe(1);
        expect(collatz_visualization.collatz(4)).toBe(2);
        expect(collatz_visualization.collatz(6)).toBe(3);
        expect(collatz_visualization.collatz(8)).toBe(4);
        expect(collatz_visualization.collatz(10)).toBe(5);
    });
});

describe('collatzReverseOrder', () => {
    it ('out of calc range', () => {
        expect(collatz_visualization.collatzReverseOrder(0)).toEqual([0]);
    });
    it ('1way', () => {
        expect(collatz_visualization.collatzReverseOrder(1)).toEqual([2]);
        expect(collatz_visualization.collatzReverseOrder(2)).toEqual([4]);
        expect(collatz_visualization.collatzReverseOrder(3)).toEqual([6]);
        expect(collatz_visualization.collatzReverseOrder(4)).toEqual([8]);
        expect(collatz_visualization.collatzReverseOrder(5)).toEqual([10]);
        expect(collatz_visualization.collatzReverseOrder(6)).toEqual([12]);
        expect(collatz_visualization.collatzReverseOrder(7)).toEqual([14]);
        expect(collatz_visualization.collatzReverseOrder(8)).toEqual([16]);
        expect(collatz_visualization.collatzReverseOrder(9)).toEqual([18]);
    });
    it ('2ways', () => {
        expect(collatz_visualization.collatzReverseOrder(10)).toEqual([3, 20]);
        expect(collatz_visualization.collatzReverseOrder(16)).toEqual([5, 32]);
    });
});
