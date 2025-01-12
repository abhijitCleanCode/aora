import {createContext, useContext, useState, useEffect} from 'react';
import {getCurrentUser} from '../lib/appwrite';

// declare the context
const GlobalContext = createContext();

// custom hook which is basically a call back function that simply call useContext and specify which context we want to use
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // because we are first loading the user in

  useEffect(() => {
    getCurrentUser()
      .then(user => {
        if (user) {
          setIsLogged(true);
          setUser(user);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
