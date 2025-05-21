import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { BarChart, Music, Plus, Home } from 'lucide-react';
import { RootState } from '../../store';

interface SidebarNavProps {
  isOpen: boolean;
}

const SidebarNav = styled.nav<SidebarNavProps>`
  width: 240px;
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.md};
  height: 100vh;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? '0' : '-240px')};
  padding-top: 70px;
  transition: ${({ theme }) => theme.transitions.default};
  z-index: 5;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    left: 0;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  color: ${({ theme }) => theme.colors.gray[700]};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[50]};
    color: ${({ theme }) => theme.colors.primary[600]};
  }
  
  &.active {
    background-color: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.primary[600]};
    font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
    border-left: 3px solid ${({ theme }) => theme.colors.primary[600]};
  }
  
  svg {
    margin-right: ${({ theme }) => theme.spacing.md};
  }
`;

const SidebarFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Version = styled.p`
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  margin: 0;
`;

const Sidebar: React.FC = () => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);
  
  return (
    <SidebarNav isOpen={sidebarOpen}>
      <NavList>
        <NavItem>
          <StyledNavLink to="/">
            <Home size={18} />
            Dashboard
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/songs">
            <Music size={18} />
            Songs
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="/songs/new">
            <Plus size={18} />
            Add Song
          </StyledNavLink>
        </NavItem>
      </NavList>
      
      <SidebarFooter>
        <Version>Music Catalog v1.0.0</Version>
      </SidebarFooter>
    </SidebarNav>
  );
};

export default Sidebar;