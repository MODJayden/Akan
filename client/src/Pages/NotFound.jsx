import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div  className='min-h-screen my-auto flex flex-col bg-amber-50 items-center justify-center'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p className='text-amber-600'>
        <Link to="/">Go to Homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;