import { useState, useCallback } from 'react';

export const useCopyToClipboard = () => {
  const [copyMessage, setCopyMessage] = useState('');

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyMessage('Copied to clipboard!');
        setTimeout(() => setCopyMessage(''), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        setCopyMessage('Failed to copy');
        setTimeout(() => setCopyMessage(''), 2000);
      });
  }, []);

  return {
    copyMessage,
    copyToClipboard
  };
};

export default useCopyToClipboard;
