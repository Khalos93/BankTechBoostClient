import { Link } from 'react-router-dom';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <h1 className="header-wrapper__title">BankTechBoost</h1>
        <nav className="header-nav">
          <Link>About</Link>
          <Link>HomePage</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
