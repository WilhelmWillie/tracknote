import React, { FunctionComponent } from "react"
import styled from 'styled-components';

type LayoutProps = {
  footer?: React.ReactNode;
  header?: React.ReactNode;
  fullWidthContainer?: boolean;
  noContainerMargin?: boolean;
}

const Layout : FunctionComponent<LayoutProps> = ({footer, header, children, fullWidthContainer, noContainerMargin}) => {
  return (
    <>
      {header}

      <Container fullWidthContainer={fullWidthContainer} noContainerMargin={noContainerMargin}>
        {children}
      </Container>

      {footer}
    </>
  )
}

const Container = styled.div<{
  fullWidthContainer?: boolean;
  noContainerMargin?: boolean;
}>`
  width: 100%;
  ${p => p.fullWidthContainer ? `max-width: 100%` : `max-width: 1024px`};
  ${p => p.noContainerMargin ? `margin: 0 auto` : `margin: 32px auto`};
`;

export default Layout;