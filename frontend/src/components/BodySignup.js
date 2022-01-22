import Logo from '../images/logo.png'
import SignUpForm from './SignUpForm'

const BodySignup = () => {
    return <div className='bodySignup'>
        <div className='signupContainer'>
        <img className='logo' src={Logo} alt=''></img>
            <SignUpForm/>
        </div>
    </div>;
};

export default BodySignup;
