import React from 'react';
import { Container } from '@material-ui/core';

import AppHeader from './AppHeader';

const MainLayout = ({children}) => {
  return (
    <>
      <AppHeader />
      <Container>{children}</Container>
    </>
  );
}

export default MainLayout;