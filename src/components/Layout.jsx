import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function Layout() {
  return (
    <div className="container px-3 is-max-desktop mb-5">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default Layout;
