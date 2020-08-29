import styled from 'styled-components';
import Link from 'next/link';

const Header = ({ children } : { children?: ReactElement }) => {
  return (
    <HeaderWrapper>
      <HeaderContainer>
        <Link href='/' passHref>
          <HeaderLogo>TrackNote</HeaderLogo>
        </Link>

        <HeaderNav>
          <Link href='/dashboard' passHref><HeaderNavItem>Dashboard</HeaderNavItem></Link>
          <Link href='/logout' passHref><HeaderNavItem>Log-out</HeaderNavItem></Link>
        </HeaderNav>
      </HeaderContainer>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
  width: 100%;
  color: #FFFFFF;
  background: #FEAC5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4BC0C8, #C779D0, #FEAC5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 93.75%;
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px 0;
`;

const HeaderLogo = styled.a`
  font-weight: 700;
  font-size: 20px;
  color: #FFFFFF;
  text-decoration: none;
`;

const HeaderNav = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderNavItem = styled.a`
  margin: 0 14px;
  font-size: 14px;
  text-decoration: none;
  color: #FFFFFF;
`;

export default Header;