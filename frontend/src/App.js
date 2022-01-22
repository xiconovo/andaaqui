import './App.css';
import { useState, useEffect } from 'react'
import HeaderLogin from './components/HeaderLogin'
import BodySignup from './components/BodySignup'
import HeaderLoggedIn from './components/HeaderLoggedIn';



// https://github.com/bradtraversy/react-crash-2021

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    isLoggedIn()
  }, [])

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
    setIsLogged(res.status === 200)
    setUsername(user.username)
    const data = await res.json()
    console.log("login res", data, isLogged)
    return data
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

  const executeLogout = async () => {
    console.log("Logout")
    const res = await fetch('http://localhost:8080/logout', {
      credentials: 'include',
    })
    setIsLogged(false)
    setUsername('')
    console.log("is login res", isLogged, username)
  }




  return (
    <>
      { isLogged ? <HeaderLoggedIn username={username} onLogout={executeLogout}/> :
        <>
        <HeaderLogin onLogin={executeLogin}/>
        <BodySignup />
        </>}

      <button onClick={executeLogout}>Logout</button>
      <button onClick={isLoggedIn}>IsLogged</button>
    </>
  );
}

export default App;
