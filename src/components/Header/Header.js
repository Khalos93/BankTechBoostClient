import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <Link to="/">
          <h1 className="header-wrapper__title">BankUncleBoost</h1>
        </Link>

        <nav className="header-nav">
          <ul className="header-nav-left-wrapper">
            <Link
              className="header-nav__link header-nav__link--margin"
              to="/about"
            >
              About
            </Link>
            <Link className="header-nav__link" to="/">
              HomePage
            </Link>
          </ul>
          <ul className="header-nav-right-wrapper">
            <Link className="header-nav__link header-nav__link--special-margin">
              Log In / Sign Up
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
