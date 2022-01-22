import { useState } from 'react'

const HeaderLogin = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if (!username) {
            alert('Please insert an username')
            return
        }

        if (!password) {
            alert('Please insert a password')
            return
        }

        onLogin({ username, password })

        setUsername('')
        setPassword('')
    }

    return (
        <div className='header-login '>
            <form onSubmit={onSubmit}>
                <input
                    className='input-login'
                    type='username'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className='input-login'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='submit-button'>Log in</button>
            </form>
        </div>
    );
};

export default HeaderLogin;
