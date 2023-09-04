import './NavBar.scss';
import { Tooltip } from 'react-tooltip';

function NavBar() {
  return (
    <div className="navBar">
      <section className="navBar-wrapper">
        <h4
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Hello world!"
          data-tooltip-place="top"
          className="navBar-wrapper__item navBar-wrapper__item--name"
        >
          name
        </h4>
        <h4 className="navBar-wrapper__item navBar-wrapper__item--subordination">
          level of subordination
        </h4>
        <h4 className="navBar-wrapper__item navBar-wrapper__item--spread">
          spread level
        </h4>
        <h4 className="navBar-wrapper__item navBar-wrapper__item--daily">
          daily change
        </h4>
      </section>
    </div>
  );
}

export default NavBar;
