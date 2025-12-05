// import { Link } from "react-router";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router";


// function TopNav() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     // const { auth } = useSelector((state) => ({ ...state }));
//     const auth  = useSelector(state => state.auth);

//     const Logout = () => {
//         dispatch({
//             type: 'LOGOUT',
//             payload: null
//         })
//         window.localStorage.removeItem('auth');
//         navigate('/login')
//     }
//     return (
//         <div className="nav bg-light d-flex justify-content-between">
//         <a className="fw-bold">HotelIoHQ</a>
//             <Link className="nav-link" to="/">Home</Link>

//             {auth !== null &&
//                 <Link className="nav-link" to="/dashboard">Dashboard</Link>
//             }


//             {auth !== null && (
//                 <button onClick={Logout} className='nav-link pointer' style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>Logout</button>
//             )}

//             {auth === null &&
//                 <>
//                     <Link className="nav-link" to="/login">Login</Link>
//                     <Link className="nav-link" to="/register">Register</Link>
//                 </>
//             }

//         </div>
//     )
// }

// export default TopNav;

import { Navbar, Nav, Container, Button, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function TopNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [scrolled, setScrolled] = useState(false);

  const Logout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    window.localStorage.removeItem("auth");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`shadow-sm ${scrolled ? "bg-dark" : "bg-dark-gradient"
        } navbar-dark`}
    >
      <Container>
        {/* Brand */}
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold fs-4 text-white">
            HotelIoHQ
          </Navbar.Brand>
        </LinkContainer>

        {/* Mobile hamburger */}
        <Navbar.Toggle
          aria-controls="top-nav"
          className="border-0"
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>

        {/* Collapsible links */}
        <Navbar.Collapse id="top-nav">
          <Nav className="ms-auto align-items-lg-center gap-2 gap-lg-3">
            <LinkContainer to="/">
              <Nav.Link className="text-white-50 fw-semibold">Home</Nav.Link>
            </LinkContainer>

            {auth && (
              <LinkContainer to="/dashboard">
                <Nav.Link className="text-white-50 fw-semibold">Dashboard</Nav.Link>
              </LinkContainer>
            )}

            {!auth ? (
              <Stack direction="horizontal" gap={2} className="ms-lg-3">
                <LinkContainer to="/login">
                  <Button variant="outline-light" size="sm">Login</Button>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Button variant="primary" size="sm">Register</Button>
                </LinkContainer>
              </Stack>
            ) : (
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-lg-3"
                onClick={Logout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNav;