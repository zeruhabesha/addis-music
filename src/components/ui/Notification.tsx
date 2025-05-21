import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { hideNotification } from '../../store/slices/uiSlice';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const NotificationContainer = styled(motion.div)<{ type: 'success' | 'error' | 'info' }>`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: white;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 450px;
  z-index: 1000;
  
  border-left: 4px solid ${({ theme, type }) => 
    type === 'success' ? theme.colors.success[500] : 
    type === 'error' ? theme.colors.error[500] : 
    theme.colors.primary[500]};
`;

const IconContainer = styled.div<{ type: 'success' | 'error' | 'info' }>`
  margin-right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme, type }) => 
    type === 'success' ? theme.colors.success[500] : 
    type === 'error' ? theme.colors.error[500] : 
    theme.colors.primary[500]};
`;

const Message = styled.p`
  margin: 0;
  flex: 1;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-left: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

const getIcon = (type: 'success' | 'error' | 'info') => {
  switch (type) {
    case 'success':
      return <CheckCircle size={20} />;
    case 'error':
      return <AlertCircle size={20} />;
    case 'info':
      return <Info size={20} />;
    default:
      return <Info size={20} />;
  }
};

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const dispatch = useDispatch();
  
  const handleClose = () => {
    dispatch(hideNotification());
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [dispatch]);
  
  return (
    <AnimatePresence>
      <NotificationContainer
        type={type}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconContainer type={type}>
          {getIcon(type)}
        </IconContainer>
        <Message>{message}</Message>
        <CloseButton onClick={handleClose}>
          <X size={16} />
        </CloseButton>
      </NotificationContainer>
    </AnimatePresence>
  );
};

export default Notification;