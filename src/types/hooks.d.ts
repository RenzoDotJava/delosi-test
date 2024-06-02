type UseDebounceProps = {
  value: T;
  milliSeconds: number;
}

type UseToggleProps = {
  defaultValue?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};