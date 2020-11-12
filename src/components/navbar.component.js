import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Interview Scheduler</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Interview List</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create New Interview</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
