import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div
      className='flex flex-col items-center justify-center h-screen'
    >
      <h1>Welcome to Aynon.</h1>
      <p>A Canadian hyperlocalized anonymous forum</p>
      <Link href='/app'>
        Check out the app here
      </Link>
    </div>
  );
};

export default Page;