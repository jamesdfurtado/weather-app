import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { username, setUsername } = useAuthContext();

  const signOut = () => {
    setUsername(null);
  };

  return { username, setUsername, signOut };
};
