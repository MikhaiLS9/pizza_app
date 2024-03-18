import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <aside>
        <Link to="/">Menu</Link>
        <Link to="/cart">Cart</Link>
      </aside>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
