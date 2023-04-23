import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constans/userConstants'

const UserEditScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams()
    const userId = id
 
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState('')
 

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

 
  useEffect(() => {
    if(successUpdate) {
      dispatch({type: USER_UPDATE_RESET})
      navigate("/admin/userlist");
    } else {
      if(!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    } 
  }, [user, userId, dispatch, successUpdate, navigate])
 
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({_id: userId, name, email, isAdmin}))
  }
 
  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
      <h1>Edit user</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name Address</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
   
          <Form.Group controlId='isAdmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button style={{marginTop: '20px'}} type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
    </>
  )
}
 
export default UserEditScreen;