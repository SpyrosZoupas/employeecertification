import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

export function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/submitRequest" class="links">Request a Certificate</Link>
          </li>
          <li>
            <Link to="/requests" class="links">See your Requests</Link>
          </li>
        </ul>
      </nav>

      <Outlet/>
    </>
  );
}
