import { useState } from 'react';

function useToggle({ onOpen = () => { }, onClose = () => { }, defaultValue = false }: UseToggleProps = {}) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggler = () => {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);
    if (nextIsOpen) onOpen();
    else onClose();
  };

  return { isOpen, toggler, setIsOpen };
};

export default useToggle;
