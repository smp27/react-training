import { createContext, useState } from "react";

const UserContext = createContext("");

function UserProvider(props) {
  const [isPaidUser, setIsPaidUser] = useState(false);
  return (
    <UserContext.Provider value={{ isPaidUser, setIsPaidUser }}>
      {props.children}
    </UserContext.Provider>
  );
}
export default UserContext;
export { UserProvider };
