import { useEffect } from 'react'
import userService from '../services/user'
import { useSelector, useDispatch } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'
import { useNavigate } from 'react-router-dom'
const UsersPage = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const loggedUser = useSelector((state) => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    const getUsers = async () => {
      let res = await userService.getAllUsers()
      res = res.sort((a, b) => b.blogs.length - a.blogs.length)
      dispatch(setUsers(res))
    }
    getUsers()
  }, [])

  if (loggedUser === null) {
    navigate('/login')
  }

  return (
    <div className="container">
      <h2>Users</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <a id="link" type="button" onClick={() => navigate(`/users/${user.id}`)}>
                  {user.name}
                </a>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
