import { Link } from "react-router-dom";
import rh from '../assets/rh.png';
import { useState } from "react";

const Header = () =>{
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleNavbar = () => {
        setIsCollapsed(!isCollapsed);
    };
    
    return (
        <header className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#969696'}}>
            <div className="container">
                <Link to='/' className="navbar-brand d-flex align-items-center  text-white">
                    <img src={rh} alt="Raldin Logo" title="Raldin Logo" height={100} />
                    <span className="ms-2">Product Review</span>
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleNavbar}
                    aria-expanded={!isCollapsed}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to='/' className="nav-link text-white">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/create' className="nav-link text-white">Add Product</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;