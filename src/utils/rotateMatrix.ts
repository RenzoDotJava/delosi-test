import { INVALID_NXN_MATRIX } from "@/constants";
import generateEmptyMatrix from "./generateEmptyMatrix";

export default function rotateMatrix(matrix: number[][]): number[][] {
  let xLength = matrix.length;
  let rotatedMatrix: number[][] = generateEmptyMatrix(xLength);

  for (let x = 0; x < xLength; x++) {
    let yLength = matrix[x].length;
    if (xLength !== yLength) throw new Error(INVALID_NXN_MATRIX);

    for (let y = 0; y < yLength; y++) {
      rotatedMatrix[xLength - 1 - y][x] = matrix[x][y];
    }
  }

  return rotatedMatrix
}