import React from 'react';
function getSignInClassname(user) {
  return user
    ? 'hidden'
    : 'fas fa-sign-in-alt sign-in-icon';
}

function getSignOutClassname(user) {
  return user
    ? 'fas fa-sign-out-alt sign-in-icon'
    : 'hidden';
}

export default function Header(props) {
  const { logo, user, handleSignOut } = props;
  return (
    <>
      <header className='row'>
        <a href='#calendar?dayId=1'><h1>{logo}</h1></a>
        <a href= '#SignUpOrSignIn'className={getSignInClassname(user)}></a>
        <a href='#SignUpOrSignIn' className={getSignOutClassname(user)} onClick={() => handleSignOut('currentUser')}></a>
        </header>
    </>
  );
}
