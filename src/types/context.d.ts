type MatrixContextProps = {
  matrix: string;
  debouncedMatrix: string;
  matrices: MatrixResponse | null;
  error: string | null;
  isLoading: boolean;
  getOutputMatrixString: () => string;
  copyToClipboard: () => void;
  handleChangeMatrix: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}