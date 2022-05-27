import { Navbar, NavLink, NavDropdown, Container, Nav } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { setNotificationMessage, resetNotification } from '../reducers/notificationReducer'
const NavigationBar = () => {
  const loggedUser = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser())
    const payload = { message: 'Logged out succesfully', type: 'info' }
    dispatch(setNotificationMessage(payload))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
    navigate('/login')
  }
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container fluid="sm">
          <Navbar.Brand href="/">Blogs</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink href="/users" className="">
                Users
              </NavLink>
              {loggedUser ? (
                <NavDropdown title={loggedUser.name}>
                  <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default NavigationBar
