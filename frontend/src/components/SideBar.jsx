import {Link} from "react-router-dom"
import "./SideBar.css"

function SideBar(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">app</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/Liked" className="nav-link">Liked tweets</Link>
            </div>
        </nav>

    )
}

export default SideBar;