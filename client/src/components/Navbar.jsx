export const Navbar = () => {

    let currentAdmin = false;

    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (user?.isAdmin === true) {
        currentAdmin = true;
    }

    const logout = () => {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }
    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="/home">SHEY ROOMS</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto me-5">
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><a className="dropdown-item" href="/profile">Bookings</a></li>
                                    {
                                        currentAdmin && (<li><a className="dropdown-item" href="/admin">Admin</a></li>)
                                    }
                                    <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </>
                        )}

                    </ul>
                </div>
            </div>
        </nav>
    )
}