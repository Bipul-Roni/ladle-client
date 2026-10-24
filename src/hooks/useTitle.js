import { useEffect } from 'react';

export default function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Ladle` : 'Ladle | Shared recipe book';
  }, [title]);
}
