import './NavBar.scss';

function NavBar() {
  return (
    <div className="navBar">
      <section className="navBar-wrapper">
        <h4 className="navBar-wrapper__item">name</h4>
        <h4 className="navBar-wrapper__item">level of subordination</h4>
        <h4 className="navBar-wrapper__item">spread level</h4>
        <h4 className="navBar-wrapper__item">daily change</h4>
      </section>
    </div>
  );
}

export default NavBar;
