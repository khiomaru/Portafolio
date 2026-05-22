import { createContext, useState } from 'react';

const CVModalContext = createContext();

export function CVModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCV = () => setIsOpen(true);
  const closeCV = () => setIsOpen(false);

  return (
    <CVModalContext.Provider value={{ isOpen, openCV, closeCV }}>
      {children}
    </CVModalContext.Provider>
  );
}

export default CVModalContext;
