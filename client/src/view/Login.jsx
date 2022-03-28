import axios from 'axios'
import React, { useState } from 'react'
import { Button, Modal, Tabs, Tab, Form, Alert } from 'react-bootstrap'

export default function Login({args}) {
  const { setCurrentUser, setHistory } = args
  const [isLoginWindow, setIsLoginWindow] = useState(false)
  const [userNameInput, setUserNameInput] = useState('')
  const [userPassInput, setUserPassInput] = useState('')
  const [isLoginError, setIsLoginError] = useState({state: false, message:''})

  const handleModelOpen = () => setIsLoginWindow(true)
  const handleModelClose = () => setIsLoginWindow(false)
  const resetInput = () => {
    setUserNameInput('')
    setUserPassInput('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const wrong = ['',' ']
      if (wrong.includes(userNameInput) || wrong.includes(userPassInput)) throw new Error('illegal input')
      await axios.post('/login',{userNameInput, userPassInput})
      setCurrentUser({userName: userNameInput})
      const {data} = await axios.get(`/history?userName=${userNameInput}`)
      console.log(data[0].userData)
      data[0].userData.length > 0 && (setHistory(data[0].userData))
      setIsLoginWindow(false)
    } catch(e) {
      switch(e?.response?.status || e) {
        case 401:
          setIsLoginError({state: true, message: 'this username or password is incorrect'})
          break
        default:
          setIsLoginError({state: true, message: 'an error has happened'})
      }
    }
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const wrong = ['',' ']
      if (wrong.includes(userNameInput) || wrong.includes(userPassInput)) throw new Error('illegal input')
      await axios.post('/createUser',{userNameInput, userPassInput})
      handleLogin(event)
    } catch(e) {
      switch(e?.response?.status || e) {
        case 409:
          setIsLoginError({state: true, message: 'this username is already in use'})
          break
        default:
          setIsLoginError({state: true, message: 'an error has happened'})
      }
    }
  }
  return (
    <>
    <Button className="rounded-pill" variant="primary" onClick={handleModelOpen}>Login</Button>
    <Modal show={isLoginWindow} onHide={handleModelClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoginError.state && (
          <Alert variant="danger" onClose={() => setIsLoginError({state: false, message:''})} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
              {isLoginError.message}
            </p>
          </Alert>
        )}
      <Tabs defaultActiveKey="currentUser" className="mb-3" onClick={resetInput}>
        <Tab eventKey="Login" title="Login" >
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your user name" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={userPassInput} onChange={(e) => setUserPassInput(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="createAccount" title="Create Account">
          <Form onSubmit={handleCreate}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your user name" value={userNameInput} onChange={(e) => setUserNameInput(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={userPassInput} onChange={(e) => setUserPassInput(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Create Account
            </Button>
          </Form>
        </Tab>
      </Tabs>
      </Modal.Body>
    </Modal>
  </>
  );
}