import { createContext, useContext, useState } from 'react';
import { useLocalStorage } from 'utils/useLocalStorage';

type UserType = { name: String; icon: String; color: String };

const UserContext = createContext<
  { user: UserType; setUser: (user: UserType) => void } | undefined
>(undefined);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedUser, setSavedUser] = useLocalStorage<UserType>('user', null);
  const [user, internalSetUser] = useState<UserType>(savedUser);

  const setUser = (suggestedUser: UserType) => {
    internalSetUser(suggestedUser);
    setSavedUser(suggestedUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const userContext = useContext(UserContext);
  return userContext;
};

export { useUser, UserType, UserContextProvider };
