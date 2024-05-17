import React from "react";
import { UserProvider } from "./UserContext";

import Router from "./Router";

function App() {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
}
export default App;
