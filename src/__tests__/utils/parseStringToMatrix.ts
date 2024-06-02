import { EMPTY_MATRIX, INVALID_NUMBER_MATRIX, INVALID_NXN_MATRIX, MAX_SIZE_MATRIX, OVER_MAX_SIZE_MATRIX } from "@/constants"
import generateMatrix from "@/utils/generateMatrix"
import parseStringToNumberMatrix from "@/utils/parseStringToMatrix"

describe('when the parseStringToMatrix function is called', () => {
  it('should return a 2x2 matrix', () => {
    const input = '[[1,2],[3,4]]'
    const expected = [[1, 2], [3, 4]]

    const result = parseStringToNumberMatrix(input)

    expect(result).toEqual(expected)
  })


  it('should return a 3x3 matrix', () => {
    const input = '[[1,2,3],[4,5,6],[7,8,9]]'
    const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

    const result = parseStringToNumberMatrix(input)

    expect(result).toEqual(expected)
  })

  it('should throw EMPTY_MATRIX error message', () => {
    const input = '[]'

    expect(() => parseStringToNumberMatrix(input)).toThrow(EMPTY_MATRIX)
  })

  it('should throw OVER_MAX_SIZE_MATRIX error message', () => {
    const input = JSON.stringify(generateMatrix(MAX_SIZE_MATRIX + 1))

    expect(() => parseStringToNumberMatrix(input)).toThrow(OVER_MAX_SIZE_MATRIX)
  })

  it('should throw INVALID_NXN_MATRIX error message', () => {
    const inputs = ['Hola Mundo', '{a: 123}', '[1,2],[3,4,[5,6]]', '[[1,2],[3,4],[5,6]]', '[[],[]]']

    inputs.forEach(input => {
      expect(() => parseStringToNumberMatrix(input)).toThrow(INVALID_NXN_MATRIX)
    })
  })

  it('should throw INVALID_NUMBER_MATRIX error message', () => {
    const input = '[[1,"a"],[3,4]]'

    expect(() => parseStringToNumberMatrix(input)).toThrow(INVALID_NUMBER_MATRIX)
  })
})