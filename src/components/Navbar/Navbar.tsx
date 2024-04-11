import Search from "../Search/Search";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar-component">
      <div className="content d-flex justify-content-between align-items-center gap-4">
        <h2>Team</h2>
        <Search/>
      </div>
    </div>
  );
};

export default Navbar;
