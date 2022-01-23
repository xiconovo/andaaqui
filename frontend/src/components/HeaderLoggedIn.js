const HeaderLoggedIn = ({ username, onLogout }) => {
    return (
        <div className='header-login '>
            <div className='label' style={{ color: "white" }}> Welcome {username}</div>
            <button className='submit-button' onClick={onLogout}>Log out</button>
        </div>
    );
};

export default HeaderLoggedIn;
