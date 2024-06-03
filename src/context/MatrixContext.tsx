'use client'
import { createContext, useContext, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import useToggle from "@/hooks/useToggle";
import getRotatedMatrix from "@/utils/getRotatedMatrix";

export const MatrixContext = createContext<MatrixContextProps>({
  matrix: '',
  debouncedMatrix: '',
  matrices: null,
  error: null,
  isLoading: false,
  getOutputMatrixString: () => '',
  handleChangeMatrix: () => { },
  copyToClipboard: () => { }
});

export const useMatrix = () => {
  return useContext(MatrixContext)
};

const MatrixProvider = ({ children }: { children: React.ReactNode }) => {
  const [matrix, setMatrix] = useState<string>('')
  const [matrices, setMatrices] = useState<MatrixResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { isOpen: isLoading, setIsOpen: setIsLoading } = useToggle({ defaultValue: false })
  const debouncedMatrix = useDebounce<string>({ value: matrix, milliSeconds: 500 })

  const handleChangeMatrix = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMatrix(e.target.value)

  const getOutputMatrixString = () => {
    if (isLoading) return 'Calculando...'
    else if (error) return 'Error...'
    else if (matrices) return JSON.stringify(matrices.rotatedMatrix)
    else return ''
  }

  const copyToClipboard = () => {
    matrices && navigator.clipboard.writeText(JSON.stringify(matrices.rotatedMatrix))
    alert("Resultado copiado al portapapeles");
  }

  useEffect(() => {
    const calculateRotatedMatrix = async () => {
      if (debouncedMatrix.trim() !== '') {
        setIsLoading(true)
        try {
          const result = await getRotatedMatrix(debouncedMatrix)
          setMatrices(result)
          setError(null)
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message)
            setMatrices(null)
          }
        } finally {
          setIsLoading(false)
        }
      } else {
        setError(null)
        setMatrices(null)
      }
    };

    calculateRotatedMatrix();
  }, [debouncedMatrix])

  return (
    <MatrixContext.Provider value={{ matrix, debouncedMatrix, matrices, error, isLoading, handleChangeMatrix, getOutputMatrixString, copyToClipboard }}>
      {children}
    </MatrixContext.Provider>
  );
}

export default MatrixProvider;