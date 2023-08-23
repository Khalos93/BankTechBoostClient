import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <Link>
          <h1 className="header-wrapper__title">BankTechBoost</h1>
        </Link>

        <nav className="header-nav">
          <Link to="/about">About</Link>
          <Link to="/">HomePage</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
