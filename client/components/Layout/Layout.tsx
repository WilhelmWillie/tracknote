import React, { FunctionComponent } from "react"
import styled from 'styled-components';

type LayoutProps = {
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

const Layout : FunctionComponent<LayoutProps> = ({footer, header, children}) => {
  return (
    <>
      {header}

      <Container>
        {children}
      </Container>

      {footer}
    </>
  )
}

const Container = styled.div`
  width: 100;
  max-width: 1024px;
  margin: 32px auto;
`;

export default Layout;