import logo from './../logo.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <img src={logo} style={{width: 120}}></img>
        </li>
        <li>
          <h1>react-todo-app</h1>
          <p>Simple todo application written in React.</p>
        </li>
      </ul>
    </div>
  );
}
 
export default Navbar;