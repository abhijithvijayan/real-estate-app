import React from 'react';
import 'twin.macro';

const IndexPage: React.FC = () => {
  return (
    <>
      <div tw="my-12 text-center">
        <div tw="p-2">
          <div tw="inline-flex items-center bg-white leading-none text-pink-600 rounded-full p-2 shadow text-sm">
            <span tw="inline-flex bg-pink-600 text-white rounded-full h-6 px-3 justify-center items-center">
              Hello
            </span>
            <span tw="inline-flex px-2">World!</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
