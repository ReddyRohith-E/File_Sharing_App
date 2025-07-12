import { useState, useEffect, useCallback } from 'react';
import { getServerStatus, getNetworkInfo } from '../services/api.jsx';

export const useNetworkStatus = () => {
  const [serverStatus, setServerStatus] = useState({ 
    status: 'checking', 
    message: 'Checking server...' 
  });
  const [networkInfo, setNetworkInfo] = useState({});

  const checkServerStatus = useCallback(async () => {
    setServerStatus({ status: 'checking', message: 'Checking server...' });
    const status = await getServerStatus();
    setServerStatus(status);
  }, []);

  useEffect(() => {
    checkServerStatus();
    setNetworkInfo(getNetworkInfo());
  }, [checkServerStatus]);

  const getServerIP = useCallback(() => {
    const url = networkInfo.serverUrl || '';
    const match = url.match(/http:\/\/([^:]+)/);
    return match ? match[1] : 'localhost';
  }, [networkInfo.serverUrl]);

  return {
    serverStatus,
    networkInfo,
    checkServerStatus,
    getServerIP
  };
};

export default useNetworkStatus;
