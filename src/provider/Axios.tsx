import React, {Context, createContext, useState} from 'react';
import axios, {AxiosInstance} from 'axios';

interface ContextProps {
  api: AxiosInstance;
  apiKey: string;
  setAPIKey: (token: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const AxiosContext: Context<ContextProps> = createContext(
  {} as ContextProps,
);

export const AxiosProvider = ({children}: ProviderProps) => {
  const [apiKey, setAPIKey] = useState('');
  const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 60000,
  });
  return (
    <AxiosContext.Provider value={{api, apiKey, setAPIKey}}>
      {children}
    </AxiosContext.Provider>
  );
};
