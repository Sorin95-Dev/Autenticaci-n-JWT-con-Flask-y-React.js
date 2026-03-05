import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch({ type: "logout" });
		navigate("/");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="d-flex gap-2 align-items-center">
					{store.token ? (
						<>
							<Link to="/private">
								<button className="btn btn-outline-secondary">Private Area</button>
							</Link>
							<button className="btn btn-danger" onClick={handleLogout}>
								Log Out
							</button>
						</>
					) : (
						<>
							<Link to="/login">
								<button className="btn btn-outline-primary">Log In</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-primary">Sign Up</button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};