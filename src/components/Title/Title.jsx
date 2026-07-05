import React from 'react';

const Title = ({children}) => {
    return (
      <h2 className='text-2xl md:text-4xl font-extrabold text-secondary mt-3 tracking-tight text-center '>{children}</h2>
    );
};

export default Title;