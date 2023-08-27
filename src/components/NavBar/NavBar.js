import './NavBar.scss';

function NavBar() {
  return (
    <div>
      <section className="navBar">
        <h4 className="navBar__item">name</h4>
        <h4 className="navBar__item">level of subordination</h4>
        <h4 className="navBar__item">spread level</h4>
        <h4 className="navBar__item">spread variace vs yesyerday</h4>
      </section>
    </div>
  );
}

export default NavBar;
