import { useEffect, useState } from "react";
import "./App.scss";
import CustomCard from "./components/CustomCard/CustomCard";

//components
import Navbar from "./components/Navbar/Navbar";
import { IUsers, Role, User } from "./utils/interfaces";
import { useSearch } from "./context/SearchContext";
import { fetchUserListApi } from "./services/DataFetching";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import { IoAddOutline } from "react-icons/io5";


function App() {
  const { searchTerm, setUsers, filteredUsers } = useSearch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    setLoading(true);
    fetchUserListApi({
      successCallback: (data: IUsers[]) => {
        // find what are all the roles in the data with only unique value
        let roles: Role[] = [];
        data.forEach((user) => {
          if (!roles.includes(user.role)) {
            roles.push(user.role);
          }
        });

        // create a dynamic object with the roles
        let users = {} as User;
        roles.forEach((role) => {
          users[role] = data.filter((user) => user.role === role);
        });

        // assign to state
        setUsers(users);
        setLoading(false);
      },
      errorCallback: (error) => {
        console.log(error);
        setUsers({});
        setLoading(false);
      },
    });
  };

  return (
    <div className="app">
      <Navbar />
      <div className="container my-5 d-flex flex-column gap-5">
        {loading ? (
          <LoadingComponent/>
        ) : (
          <>
            {searchTerm !== "" && <p>Results for "{searchTerm}"</p>}
            {
              filteredUsers && Object.keys(filteredUsers).sort().map((role, index) => (
                <div key={role}>
                  {!!index && <hr className="horizontal-seperator"/>}
                  <UserSection key={index} users={filteredUsers} title={role} role={role as Role} />
                </div>
              ))
            }
          </>
        )}
        <div className="floating-button">
            <IoAddOutline width={48} height={48} />
        </div>
      </div>
    </div>
  );
}

// inline component - UserSection
const UserSection = ({ users, title,role }: { users: User; title: string, role:string }) => {
  const redefinedTitle = title === Role.admin ? "Adminstrators" : title === Role.member? "Members" : title;
  return (
    <div>
      <h3 className="section-title">{redefinedTitle}</h3>
      <div className="grid-wrapper">
        {users[role].length === 0 ? (
          <div className="d-flex justify-content-center">
            <p>No {title} found</p>
          </div>
        ) : (
          users[role].map((user: IUsers, index: number) => (
            <CustomCard key={index} user={user} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
