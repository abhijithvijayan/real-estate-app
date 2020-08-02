import {useEffect} from 'react';
import Router from 'next/router';

import BodyWrapper from '../components/BodyWrapper';
import Loader from '../components/Loader';

import {useStoreState} from '../state/store';

const IndexPage: React.FC = () => {
  const {isAuthenticated} = useStoreState((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/home/listing');
    } else {
      Router.push('/signin');
    }
  }, [isAuthenticated]);

  return (
    <>
      <BodyWrapper>
        <Loader />
      </BodyWrapper>
    </>
  );
};

export default IndexPage;
