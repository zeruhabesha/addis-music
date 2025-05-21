import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Sidebar from './Sidebar';
import Notification from '../ui/Notification';
import { fetchSongsRequest } from '../../store/slices/songsSlice';
import { fetchStatisticsRequest } from '../../store/slices/statisticsSlice';
import { RootState } from '../../store';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
`;

const ContentArea = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  margin-left: 0;
  transition: ${({ theme }) => theme.transitions.default};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin-left: 240px;
  }
`;

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: RootState) => state.ui);
  
  useEffect(() => {
    dispatch(fetchSongsRequest());
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);
  
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <ContentArea>
          <Outlet />
        </ContentArea>
      </MainContent>
      {notification.show && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      )}
    </LayoutContainer>
  );
};

export default Layout;