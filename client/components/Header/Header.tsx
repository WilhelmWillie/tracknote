import styled from 'styled-components';

const Header = ({ children }) => {
  return (
    <HeaderWrapper>
      {children}
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
  border: 1px solid #cccccc;
`;

export default Header;