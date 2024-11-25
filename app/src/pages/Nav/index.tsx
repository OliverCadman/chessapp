import LogoBanner from "../../components/Logo/LogoBanner";

const Nav = () => {
  return (
    <div className="navbar__container">
      <nav className="navbar navbar-expand-sm md-flex">
        <div className="navbar__brand flex centered">
          <LogoBanner fillColor="#C6AC8F" />
          <h1 className="logo-text">The Institute of Blunders</h1>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
