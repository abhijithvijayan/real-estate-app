import tw, {css} from 'twin.macro';
import React from 'react';

const DashboardPage: React.FC = () => {
  // const handleClick = (): SocketIOClient.Socket => {
  //   return socket.emit('some-event', {
  //     msg: 'Hello broker',
  //   });
  // };

  return (
    <>
      <section tw="flex flex-1 flex-col sm:flex-row">
        <div
          css={[
            tw`flex-shrink bg-white`,

            css`
              flex-grow: 2;
              flex-basis: 0%;
            `,
          ]}
        >
          hello
        </div>

        <div tw="flex-1">world</div>
      </section>
    </>
  );
};

export default DashboardPage;
