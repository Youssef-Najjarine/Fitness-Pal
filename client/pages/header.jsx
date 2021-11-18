import React from 'react';

export default function Header(props) {
  const { logo } = props;
  return (
    <>
      <header className='row'><a href='#calendar?dayId=1'><h1>{logo}</h1></a></header>
    </>
  );
}
