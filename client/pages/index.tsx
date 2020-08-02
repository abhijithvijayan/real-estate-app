import {useEffect} from 'react';
import Router from 'next/router';

import BodyWrapper from '../components/BodyWrapper';
import Loader from '../components/Loader';

import {useStoreState} from '../state/store';
import {AppRoutes} from '../api/constants';

const IndexPage: React.FC = () => {
  const {isAuthenticated} = useStoreState((s) => s.auth);

  useEffect(() => {
    if (isAuthenticated) {
      Router.push(AppRoutes.PROPERTIES_LISTING);
    } else {
      Router.push(AppRoutes.SIGN_IN);
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
