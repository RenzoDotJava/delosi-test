import { INVALID_NXN_MATRIX, EMPTY_MATRIX, INVALID_NUMBER_MATRIX } from '@/constants'
import getRotatedMatrix from '../../utils/getRotatedMatrix'

describe('when the getRotatedMatrix function is called', () => {
  it('should return a 2x2 matrix rotated 90 degrees to the left', () => {
    const input = '[[1, 2], [3, 4]]'

    const expected = {
      parsedMatrix: [[1, 2], [3, 4]],
      rotatedMatrix: [[2, 4], [1, 3]]
    }

    getRotatedMatrix(input).then(result => expect(result).toEqual(expected))
  })

  it('should return a 3x3 matrix', () => {
    const input = '[[1,2,3],[4,5,6],[7,8,9]]'

    const expected = {
      parsedMatrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      rotatedMatrix: [[3, 6, 9], [2, 5, 8], [1, 4, 7]]
    }

    getRotatedMatrix(input).then(result => expect(result).toEqual(expected))
  })

  it('should throw EMPTY_MATRIX error message', () => {
    const input = '[]'

    getRotatedMatrix(input).catch(error => expect(error.message).toBe(EMPTY_MATRIX))
  })

  it('should throw INVALID_NXN_MATRIX error message', () => {
    const input = '[[1, 2, 3], [4, 5], [7, 8, 9]]'

    getRotatedMatrix(input).catch(error => expect(error.message).toBe(INVALID_NXN_MATRIX))
  })


  it('should throw INVALID_NUMBER_MATRIX error message', () => {
    const input = '[[1,"a"],[3,4]]'

    getRotatedMatrix(input).catch(error => expect(error.message).toBe(INVALID_NUMBER_MATRIX))
  })
})