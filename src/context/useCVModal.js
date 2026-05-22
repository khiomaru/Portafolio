import { useContext } from 'react';
import CVModalContext from './CVModalContext';

export function useCVModal() {
  return useContext(CVModalContext);
}
