import {createContext, useContext, useState} from 'react';

type UserType = {name: String, icon: String, color: String};

const UserContext = createContext<{user: UserType, setUser: (user: UserType) => void} | undefined>(undefined);

const UserContextProvider = ({children}: {children: React.ReactNode}) => {

  const [user, internalSetUser] = useState<UserType>(null);

  const setUser = (suggestedUser: UserType) => {
    internalSetUser(suggestedUser);
  };

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export {useUser, UserType, UserContextProvider};

