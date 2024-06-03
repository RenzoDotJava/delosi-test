import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MainPage from '@/app/page'
import {
  EMPTY_MATRIX,
  INVALID_NUMBER_MATRIX,
  INVALID_NXN_MATRIX,
  LOADING_DELAY,
  MAIN_PAGE_TITLE,
  MAX_SIZE_CANVAS,
  MAX_SIZE_CANVAS_EXCEEDED,
  MAX_SIZE_MATRIX,
  OVER_MAX_SIZE_MATRIX
} from '@/constants'
import MatrixProvider, { MatrixContext } from '@/context/MatrixContext'
import { delay } from '@/utils/getRotatedMatrix'
import generateEmptyMatrix from '@/utils/generateEmptyMatrix'

const defaultMockState: MatrixContextProps = {
  matrix: '',
  debouncedMatrix: '',
  matrices: null,
  error: '',
  isLoading: false,
  getOutputMatrixString: jest.fn(),
  copyToClipboard: jest.fn(),
  handleChangeMatrix: jest.fn()
}

const renderWithMatrixProvider = ({ children, mockState }: { children: React.ReactNode, mockState?: MatrixContextProps }) => {
  if (mockState) {
    return render(
      <MatrixContext.Provider value={mockState}>
        {children}
      </MatrixContext.Provider>
    )
  } else {
    return render(
      <MatrixProvider>
        {children}
      </MatrixProvider>
    )
  }
}

const getTextAreaByTestId = (testId: string) => screen.getByTestId(testId) as HTMLTextAreaElement

describe('when user visits the matrix rotator page', () => {
  it('should render the title', () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    expect(screen.getByText(MAIN_PAGE_TITLE)).toBeInTheDocument()
  })

  it('copy button should be disabled when there is no input matrix', () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const copyButton = screen.getByText(/Copiar/)

    expect(copyButton).toBeDisabled()
  })

  it('copy button should be enabled when there is an ouput matrix', () => {
    renderWithMatrixProvider({
      children: <MainPage />,
      mockState: {
        ...defaultMockState,
        matrix: '[[1,2],[3,4]]',
        debouncedMatrix: '[[1,2],[3,4]]',
        matrices: { parsedMatrix: [[1, 2], [3, 4]], rotatedMatrix: [[2, 3], [1, 4]] },
      }
    })

    const copyButton = screen.getByText(/Copiar/)

    fireEvent.click(copyButton)

    expect(defaultMockState.copyToClipboard).toHaveBeenCalled()
  })

  it('loading state should be displayed when user types a valid matrix', async () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const input = getTextAreaByTestId('input-matrix')

    const inputMatrix = '[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]'

    fireEvent.change(input, { target: { value: inputMatrix } })

    await delay(LOADING_DELAY)

    const loadingState = screen.getByText(/Rotando matriz!/)

    expect(loadingState).toBeInTheDocument()
  })

  it('when user types a valid 4x4 matrix, it should render the rotated matrix', async () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const input = getTextAreaByTestId('input-matrix')
    const output = getTextAreaByTestId('output-matrix')

    const inputMatrix = '[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]'
    const rotatedMatrix = '[[4,8,12,16],[3,7,11,15],[2,6,10,14],[1,5,9,13]]'

    fireEvent.change(input, { target: { value: inputMatrix } })

    await delay(LOADING_DELAY)

    waitFor(() => {
      expect(output.value).toBe(rotatedMatrix)
    })

    const inputCanvas = await screen.findByTestId('input-canvas')
    const outputCanvas = await screen.findByTestId('output-canvas')

    expect(inputCanvas.children.length).toBe(16)
    expect(outputCanvas.children.length).toBe(16)
  })


  it('when user types a matrix with a size over MAX_SIZE_CANVAS, it should show MAX_SIZE_CANVAS_EXCEEDED state', async () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const input = getTextAreaByTestId('input-matrix')
    const output = getTextAreaByTestId('output-matrix')

    const inputMatrix = JSON.stringify(generateEmptyMatrix(MAX_SIZE_CANVAS + 1))

    fireEvent.change(input, { target: { value: inputMatrix } })

    await delay(LOADING_DELAY)

    waitFor(() => {
      expect(output.value).toBe(inputMatrix)
    })

    const errorState = await screen.findByText(MAX_SIZE_CANVAS_EXCEEDED)

    expect(errorState).toBeInTheDocument()
  })

  it('when user types a matrix with a size over MAX_SIZE_MATRIX, it should show OVER_MAX_SIZE_MATRIX state', async () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const input = getTextAreaByTestId('input-matrix')
    const output = getTextAreaByTestId('output-matrix')

    const inputMatrix = JSON.stringify(generateEmptyMatrix(MAX_SIZE_MATRIX + 1))

    fireEvent.change(input, { target: { value: inputMatrix } })

    await delay(LOADING_DELAY)

    waitFor(() => {
      expect(output.value).toBe('Error...')
    })

    const errorState = await screen.findByText(OVER_MAX_SIZE_MATRIX)

    expect(errorState).toBeInTheDocument()
  })

  it('when user types an empty matrix, it should show EMPTY_MATRIX state', async () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const input = getTextAreaByTestId('input-matrix')
    const output = getTextAreaByTestId('output-matrix')

    fireEvent.change(input, { target: { value: '[]' } })

    await delay(LOADING_DELAY)

    waitFor(() => {
      expect(output.value).toBe('Error...')
    })

    const errorState = await screen.findByText(EMPTY_MATRIX)

    expect(errorState).toBeInTheDocument()
  })

  it('when user types an invalid NxN matrix, it should show INVALID_NXN_MATRIX state', async () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const input = getTextAreaByTestId('input-matrix')
    const output = getTextAreaByTestId('output-matrix')

    fireEvent.change(input, { target: { value: '[[1,2],[3,4,5]]' } })

    await delay(LOADING_DELAY)

    waitFor(() => {
      expect(output.value).toBe('Error...')
    })

    const errorState = await screen.findByText(INVALID_NXN_MATRIX)

    expect(errorState).toBeInTheDocument()
  })

  it('when user types an invalid number matrix, it should show INVALID_NUMBER_MATRIX state', async () => {
    renderWithMatrixProvider({ children: <MainPage /> })

    const input = getTextAreaByTestId('input-matrix')
    const output = getTextAreaByTestId('output-matrix')

    fireEvent.change(input, { target: { value: '[[1,2],[3,"a"]]' } })

    await delay(LOADING_DELAY)

    waitFor(() => {
      expect(output.value).toBe('Error...')
    })

    const errorState = await screen.findByText(INVALID_NUMBER_MATRIX)

    expect(errorState).toBeInTheDocument()
  })
})