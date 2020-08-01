import React from 'react';
import 'twin.macro';

const BodyWrapper: React.FC = ({children}) => {
  return (
    <>
      <div tw="relative min-h-screen">
        <main tw="w-full min-h-screen">{children}</main>
      </div>
    </>
  );
};

export default BodyWrapper;
