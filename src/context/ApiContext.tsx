import { createContext, useContext } from 'react';

type ApiDefType = {
  getUsers: () => Promise<any>;
  addComment: (any) => Promise<any>;
};

const API = '/api';
const buildUrl = (path: String): URL => {
  return new URL(`${API}${path}`, `http://${window.location.host}`);
};

const GET_USERS: URL = buildUrl('/users');
const GET_CUSTOMERS: URL = buildUrl('/customers');
const GET_COMMENTS: URL = buildUrl('/comments');
const GET_TAGS: URL = buildUrl('/tags');
const GET_RANDOM_COMMENT: URL = buildUrl('/comment/random');

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

const ApiContextProvider = ({ children }: { children: React.ReactNode }) => {
  const genericFetch = (path: URL, method: String = 'GET') => {
    return async (body: Object = null) => {
      const items = await fetchJson(path, {
        body: JSON.stringify(body),
        method,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return items;
    };
  };

  const api = {
    getUsers: genericFetch(GET_USERS),
    getCustomers: genericFetch(GET_CUSTOMERS),
    getRandomComment: genericFetch(GET_RANDOM_COMMENT),
    getComments: async (
      tags: Array<String>,
      customers: Array<String>,
      start: Date,
      end: Date,
      user: String,
      ratingMin: Number,
      ratingMax: Number
    ) => {
      const customerString =
        customers && customers.length > 0 ? customers.join(',') : '';
      const tagString = tags && tags.length > 0 ? tags.join(',') : '';

      const queryString =
        `?tags=${tagString}&customers=${customerString}&start=${start.getTime()}` +
        `&end=${end.getTime()}&user=${user}&ratingMin=${ratingMin}&ratingMax=${ratingMax}`;
      const comments = await fetchJson(
        new URL(`${GET_COMMENTS}${queryString}`, window.location.host),
        {
          method: 'GET',
        },
      );

      return comments;
    },
    getTags: genericFetch(GET_TAGS),
    addTag: genericFetch(TAG, 'POST'),
    addComment: genericFetch(COMMENT, 'POST'),
    addCustomer: genericFetch(CUSTOMER, 'POST'),
    addUser: genericFetch(USER, 'POST'),
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

const useApi = () => {
  const apiContext = useContext(ApiContext);
  return apiContext;
};

export { useApi, ApiDefType, ApiContextProvider };
