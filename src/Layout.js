import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/submitRequest">Request a Certificate</Link>
          </li>
          <li>
            <Link to="/requests">See your Requests</Link>
          </li>
        </ul>
      </nav>

      <Outlet/>
    </>
  );
}
