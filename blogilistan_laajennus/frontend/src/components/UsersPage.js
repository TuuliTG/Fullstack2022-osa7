import { useEffect } from 'react'
import userService from '../services/user'
import { useSelector, useDispatch } from 'react-redux'
import LoggedUser from './LoggedUser'
import { setUsers } from '../reducers/usersReducer'
const UsersPage = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  useEffect(() => {
    const getUsers = async () => {
      let res = await userService.getAllUsers()
      res = res.sort((a, b) => b.blogs.length - a.blogs.length)
      dispatch(setUsers(res))
    }
    getUsers()
  }, [])
  return (
    <div>
      <h2>Blogs App</h2>
      <LoggedUser />
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
