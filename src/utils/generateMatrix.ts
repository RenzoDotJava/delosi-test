export default function generateMatrix(n: number): number[][] {
  const matrix: number[][] = []
  for (let i = 0; i < n; i++) {
    matrix.push(new Array(n).fill(1))
  }
  return matrix
}