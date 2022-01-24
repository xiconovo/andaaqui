import './App.css';
import { useState, useEffect } from 'react'
import HeaderLogin from './components/HeaderLogin'
import BodySignup from './components/BodySignup'
import HeaderLoggedIn from './components/HeaderLoggedIn';
import MapList from './components/MapList';
import useGeoLocation from './components/useGeoLocation';

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [username, setUsername] = useState('')


  const executeLogin = async (user) => {
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
  }

  const isLoggedIn = async () => {
    const res = await fetch('http://localhost:8080/auth', {
      credentials: 'include'
    })
    if (res.status === 200) {
      const data = await res.json()
      setIsLogged(true)
      setUsername(data.username)
    } else {
      setIsLogged(false)
    }
  }

  const executeRegister = async (user) => {
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

  const location = useGeoLocation();

  return (
    <>
      {isLogged ? <>
        <HeaderLoggedIn username={username} onLogout={executeLogout} />
        <MapList location={location}/>
      </> :
        <>
          <HeaderLogin onLogin={executeLogin} />
          <BodySignup onSignUp={executeRegister} />
        </>}
    </>
  );
}

export default App;
