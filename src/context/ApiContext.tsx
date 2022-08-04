import {createContext, useContext, useState} from 'react';
import {UserType} from './UserContext';

type ApiDefType = {
  getUsers: () => Promise<Array<UserType>>
};

const API = '/api';
const GET_USERS = new URL(`${API}/users`, `http://${window.location.host}`);

const fetchJson = async (resource: URL, options) => {
  const response = await fetch(resource, options);
  const json = await response.json();
  return json;
};

const ApiContext = createContext<ApiDefType | undefined>(undefined);

const ApiContextProvider = ({children}: {children: React.ReactNode}) => {

  const getUsers = async () => {
    const users = await fetchJson(GET_USERS, {});
    return users;
  };

  const api = {
    getUsers
  };

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

const useApi = () => {
  const apiContext = useContext(ApiContext);
  return apiContext;
};

export {useApi, ApiDefType, ApiContextProvider};

