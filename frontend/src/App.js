import './App.css';
import HeaderLogin from './components/HeaderLogin'
import BodySignup from './components/BodySignup'



// https://github.com/bradtraversy/react-crash-2021

// Fetch Tasks
const fetchLogin = async (user) => {
  const res = await fetch('http://localhost:8080/login', {
    method: 'POST',
    
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const data = await res.json()

  return data
}

const isLoggedIn = async () => {
  const res = await fetch('http://localhost:8080/auth', {
    credentials: 'include'
  })
  const data = await res.json()
}



const App = () => {
  return (
    <div>
      <HeaderLogin/>
      <BodySignup/>

      <button> Login</button>
    </div>
  );
}

export default App;
