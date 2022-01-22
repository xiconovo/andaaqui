import { useState } from 'react'

const SignUpForm = ({ onSignUp }) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!username) {
      alert('Please insert an username')
      return
    }

    if (!email) {
      alert('Please insert an email')
      return
    }

    if (!password) {
      alert('Please insert a password')
      return
    }

    onSignUp({ username, email, password })

    setUsername('')
    setEmail('')
    setPassword('')
  }

  return (

    <form className='form-wrapper' onSubmit={onSubmit}>
      <h2 className='title'>Create Account</h2>
      <div className='username'>
        <label className='label'>Username</label>
        <input
          className='input'
          type='text'
          name='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='email'>
        <label className='label'>Email</label>
        <input
          className='input'
          type='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='password'>
        <label className='label'>Password</label>
        <input
          className='input'
          type='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button className='submit-button' style={{ margin: "0px" }}>Sign Up</button>
      </div>
    </form >
  );
};

export default SignUpForm;
