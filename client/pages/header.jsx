import React from 'react';
function handleSignInClassname() {
  const currentUserJSON = localStorage.getItem('currentUser');
  return currentUserJSON !== null
    ? 'fas fa-sign-out-alt sign-in-icon'
    : 'fas fa-sign-in-alt sign-in-icon';
}
export default function Header(props) {
  const { logo } = props;

  return (
    <>
      <header className='row'>
        <a href='#calendar?dayId=1'><h1>{logo}</h1></a>
        <a href= '#SignUpOrSignIn'className={handleSignInClassname()}></a>
        </header>
    </>
  );
}
