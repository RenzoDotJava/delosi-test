import parseStringToNumberMatrix from './parseStringToMatrix';
import rotateMatrix from './rotateMatrix';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function getRotatedMatrix(matrix: string): Promise<MatrixResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      await delay(1000)
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