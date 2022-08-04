import {createContext, useContext, useState} from 'react';
import {UserType} from './UserContext';

type ApiDefType = {
  getUsers: () => Promise<any>
};

const API = '/api';
const buildUrl = (path: String): URL => {
  return new URL(`${API}${path}`, `http://${window.location.host}`);
};

const GET_USERS: URL = buildUrl('/users');
const GET_CUSTOMERS: URL = buildUrl('/customers');
const GET_COMMENTS: URL = buildUrl('/comments');
const GET_TAGS: URL = buildUrl('/tags');

const TAG: URL = buildUrl('/tag');
const CUSTOMER: URL = buildUrl('/customer');
const COMMENT: URL = buildUrl('/comment');
const USER: URL = buildUrl('/user');

const fetchJson = async (resource: URL, options) => {
  const response = await fetch(resource, options);
  const json = await response.json();
  return json;
};

const ApiContext = createContext<ApiDefType | undefined>(undefined);

const ApiContextProvider = ({children}: {children: React.ReactNode}) => {

  const genericFetch = (path: URL, method: String = 'GET') => {
    return async (body: Object = null) => {
      const users = await fetchJson(path, {
        body,
        method
      });
      return users;
    };
  };

  const api = {
    getUsers: genericFetch(GET_USERS),
    getCustomers: genericFetch(GET_CUSTOMERS),
    getComments: genericFetch(GET_COMMENTS),
    getTags: genericFetch(GET_TAGS),
    addTag: genericFetch(TAG, 'POST'),
    addComment: genericFetch(COMMENT, 'POST'),
    addCustomer: genericFetch(CUSTOMER, 'POST'),
    addUser: genericFetch(USER, 'POST')
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

