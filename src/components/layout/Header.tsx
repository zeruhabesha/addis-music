import React from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Search, X } from 'lucide-react';
import { RootState } from '../../store';
import { toggleSidebar } from '../../store/slices/uiSlice';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
  position: sticky;
  top: 0;
  z-index: 10;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  
  h1 {
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.typography.fontSizes.xl};
    color: ${({ theme }) => theme.colors.primary[600]};
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[600]};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: none;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    width: 300px;
  }
  
  svg {
    position: absolute;
    left: ${({ theme }) => theme.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.sm} ${theme.spacing.xxl}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.gray[800]};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[400]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[100]};
  }
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };
  
  return (
    <HeaderContainer>
      <LogoContainer>
        <MenuButton onClick={handleToggleSidebar}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>
        <h1>Music Catalog</h1>
      </LogoContainer>
      
      <SearchContainer>
        <Search size={16} />
        <SearchInput placeholder="Search songs, artists, albums..." />
      </SearchContainer>
    </HeaderContainer>
  );
};

export default Header;