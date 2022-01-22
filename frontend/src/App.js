import './App.css';
import { useState, useEffect } from 'react'
import HeaderLogin from './components/HeaderLogin'
import BodySignup from './components/BodySignup'
import HeaderLoggedIn from './components/HeaderLoggedIn';



// https://github.com/bradtraversy/react-crash-2021

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [username, setUsername] = useState('')


  const executeLogin = async (user) => {
    console.log("User", user)
    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    if (res.status === 200) {
      setIsLogged(true)
      setUsername(user.username)
    } else {
      alert('Login failed')
    }
    // const data = await res.json()
    console.log("login res", isLogged)
  }

  const isLoggedIn = async () => {
    const res = await fetch('http://localhost:8080/auth', {
      credentials: 'include'
    })
    console.log("RES", res)
    if (res.status === 200) {
      const data = await res.json()
      console.log("is login res123", data)
      setIsLogged(true)
      setUsername(data.username)
    } else {
      setIsLogged(false)
    }
    console.log("is login res", isLogged, username)
  }

  const executeRegister = async (user) => {
    console.log("Register User", user)
    const res = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    console.log("RES", res)
    if (res.status === 201) {
      const data = await res.json()
      console.log("Register successs:", data.msg)
      await executeLogin(user)
    } else if (res.status === 401) {
      const data = await res.json()
      console.log("Register failed:", data.msg)
      alert(`Register Failed: ${data.msg}`)
    }
  }

  const executeLogout = async () => {
    console.log("Logout")
    await fetch('http://localhost:8080/logout', {
      credentials: 'include',
    })
    setIsLogged(false)
    setUsername('')
    console.log("is login res", isLogged, username)
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <>
      {isLogged ? <HeaderLoggedIn username={username} onLogout={executeLogout} /> :
        <>
          <HeaderLogin onLogin={executeLogin} />
          <BodySignup onSignUp={executeRegister} />
        </>}

      <button onClick={executeLogout}>Logout</button>
      <button onClick={isLoggedIn}>IsLogged</button>
    </>
  );
}

export default App;
