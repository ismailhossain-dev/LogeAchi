import React from 'react';

const Title = ({children}) => {
    return (
      <h2 className='text-3xl md:text-5xl  text-secondary mt-3 tracking-tight '>{children}</h2>
    );
};

export default Title;