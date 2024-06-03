export default function generateEmptyMatrix(n: number): number[][] {
  return [...Array(n)].map(_ => Array(n).fill(0));
}