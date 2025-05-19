import Grid from "./grid.ts";

export default class Brute_Forcer {
  private grid: Grid;
  private attempts: number = 0;
  readonly digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(grid: Grid) {
    this.grid = grid;
  }

  public static getPermutations<T>(digits: T[]): T[][] {
    if (digits.length <= 1) return [digits]
    const permutations: T[][] = []

    for (let i = 0; i < digits.length; i++) {
        let digitsCopy = [...digits]
        let first = digitsCopy.splice(i,1)[0]
        for (const permutation of this.getPermutations(digitsCopy)) {
            permutations.push([first, ...permutation])
        }
    }
    return permutations;
  }
}

console.log(Brute_Forcer.getPermutations([1,2,3,4]));
