import { createContext, useContext } from 'react';

type CommentFilterType = {
  tags: Array<String>;
  customers: Array<String>;
  start: Date;
  end: Date;
  user: String;
  ratingMin: Number;
  ratingMax: Number;
};
type ApiDefType = {
  getUsers: () => Promise<any>;
  getCustomers: () => Promise<any>;
  getComments: (CommentFilterType) => Promise<any>;
  getTags: () => Promise<any>;
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
    return (body: Object = null) => {
      const options = {
        body: JSON.stringify(body),
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (method === 'GET') {
        delete options.body;
      }
      return fetchJson(path, options);
    };
  };

  const api = {
    getUsers: genericFetch(GET_USERS),
    getCustomers: genericFetch(GET_CUSTOMERS),
    getRandomComment: genericFetch(GET_RANDOM_COMMENT),
    getComments: (filters: CommentFilterType) => {
      return fetchJson(
        new URL(
          `${GET_COMMENTS}?${filtersToQueryString(filters)}`,
          window.location.host,
        ),
        {
          method: 'GET',
        },
      );
    },
    getTags: genericFetch(GET_TAGS),
    addTag: genericFetch(TAG, 'POST'),
    addComment: genericFetch(COMMENT, 'POST'),
    addCustomer: genericFetch(CUSTOMER, 'POST'),
    addUser: genericFetch(USER, 'POST'),
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

function filtersToQueryString({
  customers,
  tags,
  start,
  end,
  user,
  ratingMin,
  ratingMax,
}: CommentFilterType) {
  const qsPieces = [];

  if (customers?.length > 0) {
    qsPieces.push(`customers=${customers.join(',')}`);
  }
  if (tags?.length > 0) {
    qsPieces.push(`tags=${tags.join(',')}`);
  }
  if (start) {
    qsPieces.push(`start=${start}`);
  }
  if (end) {
    qsPieces.push(`end=${end}`);
  }
  if (user) {
    qsPieces.push(`user=${user}`);
  }
  if (typeof ratingMin === 'number') {
    qsPieces.push(`ratingMin=${ratingMin}`);
  }
  if (typeof ratingMax === 'number') {
    qsPieces.push(`ratingMax=${ratingMax}`);
  }

  return qsPieces.join('&');
}

const useApi = () => {
  const apiContext = useContext(ApiContext);
  return apiContext;
};

export { useApi, ApiDefType, ApiContextProvider };
