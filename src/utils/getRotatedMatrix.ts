import { LOADING_DELAY } from '@/constants';
import parseStringToNumberMatrix from './parseStringToMatrix';
import rotateMatrix from './rotateMatrix';

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function getRotatedMatrix(matrix: string): Promise<MatrixResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(LOADING_DELAY)
      const parsedMatrix = parseStringToNumberMatrix(matrix);
      const rotatedMatrix = rotateMatrix(parsedMatrix);
      resolve({
        parsedMatrix,
        rotatedMatrix
      });
    } catch (error) {
      if (error instanceof Error) reject(new Error(error.message));
    }
  })
}