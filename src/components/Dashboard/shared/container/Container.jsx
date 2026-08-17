import React from "react";

function Container({ children, className }) {
  return (
    <div
      className={`max-w-7xl  lg:max-w-[1460px] w-full mx-auto px-4 md:px-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
