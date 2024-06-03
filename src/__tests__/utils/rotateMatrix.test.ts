import { INVALID_NXN_MATRIX } from "@/constants"
import rotateMatrix from "@/utils/rotateMatrix"

describe('when the rotateMatrix function is called', () => {
  it('should return a 2x2 matrix rotated 90 degrees to the left', () => {
    const input = [[1, 2], [3, 4]]
    const expected = [[2, 4], [1, 3]]

    const result = rotateMatrix(input)

    expect(result).toEqual(expected)
  })

  it('should return a 3x3 matrix rotated 90 degrees to the left', () => {
    const input = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    const expected = [[3, 6, 9], [2, 5, 8], [1, 4, 7]]

    const result = rotateMatrix(input)

    expect(result).toEqual(expected)
  })

  it('should throw INVALID_NXN_MATRIX error message', () => {
    const input = [[1, 2, 3], [4, 5], [7, 8, 9]]

    expect(() => rotateMatrix(input)).toThrow(INVALID_NXN_MATRIX)
  })
})