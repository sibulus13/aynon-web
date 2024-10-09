import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div
      className='flex flex-col items-center justify-center h-screen gap-4'
    >
      <h1>Find your gaggle.</h1>
      <h2>Welcome to Aynon, A minimalist Canadian anonymous social forum</h2>
      <Link href='/App' className='border-2 rounded-3xl p-2 hover:border-black'>
        Click here for the app
      </Link>
    </div>
  );
};

export default Page;