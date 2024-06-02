import { INVALID_NXN_MATRIX, INVALID_NUMBER_MATRIX, EMPTY_MATRIX, MAX_SIZE_MATRIX, OVER_MAX_SIZE_MATRIX } from "@/constants"

export default function parseStringToNumberMatrix(matrix: string): number[][] {
  let parsedArray: unknown;

  //verify if the input is valid
  try {
    parsedArray = JSON.parse(matrix)
  } catch (error) {
    throw new Error(INVALID_NXN_MATRIX)
  }

  //verify if the input is an array of arrays
  if (!Array.isArray(parsedArray) || !parsedArray.every(Array.isArray)) {
    throw new Error(INVALID_NXN_MATRIX)
  }

  //verify if the input matrix is not an empty array
  if (parsedArray.length === 0) throw new Error(EMPTY_MATRIX)

  //verify if the input matrix length is over than MAX_SIZE_MATRIX
  if (parsedArray.length > MAX_SIZE_MATRIX) throw new Error(OVER_MAX_SIZE_MATRIX)

  //verify if the input is a NxN matrix
  if (parsedArray.length !== parsedArray[0].length) throw new Error(INVALID_NXN_MATRIX)

  for (const subArray of parsedArray) {
    for (const element of subArray) {
      //verify if the elements of each array are numbers
      if (typeof element !== 'number' || Number.isNaN(element)) throw new Error(INVALID_NUMBER_MATRIX)
    }
  }

  return parsedArray;
}