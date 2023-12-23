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
