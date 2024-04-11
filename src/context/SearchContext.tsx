import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import useDebounce from "../hooks/useDebounce";
import { IUsers, Role, User } from "../utils/interfaces";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  filteredUsers: User | {};
  setUsers: (users: User | {}) => void;
};

type SearchProviderProps = {
  children: ReactNode;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User | {}>({});
  const [filteredUsers, setFilteredUsers] = useState<User | {}>({});
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debounce after 500ms

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    // NOTE : context of debouncedSearchTerm is the debounced value
    handleSearchChange();
  }, [debouncedSearchTerm]);

  const handleSearchChange = useCallback(() => {
    if (!debouncedSearchTerm.length) {
      setFilteredUsers(users);
      return;
    } else {
      let filteredUsers = {} as User;
      let roles: string[] = Object.keys(users);

      Object.values(users).forEach((usersArray: IUsers[], index) => {
        let filteredUsersArray = usersArray.filter((user) => {
          return (
            user.first_name
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            user.last_name
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          );
        });
        if (filteredUsersArray.length > 0) {
          filteredUsers[roles[index]] = filteredUsersArray;
        }
      });
      setFilteredUsers(filteredUsers);
    }
  }, [debouncedSearchTerm]);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, filteredUsers, setUsers }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export default SearchContext;
