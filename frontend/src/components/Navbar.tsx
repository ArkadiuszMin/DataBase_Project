type NavbarItems = {
  name: string;
  route: string;
};

interface Props {
  items: NavbarItems[];
  rightText: string;
  title: string;
}

const Navbar = ({ items, rightText, title }: Props) => {
  return (
    <nav
      style={{ height: "70px" }}
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {items &&
              items.map((item, index) => (
                <li className="nav-item" key={index}>
                  <a className="nav-link" aria-current="page" href={item.route}>
                    {item.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
        <span className="navbar-text">{rightText}</span>
      </div>
    </nav>
  );
};

export default Navbar;
