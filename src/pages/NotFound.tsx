import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary[600]};
  margin: 0;
  line-height: 1;
`;

const ErrorTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  color: ${({ theme }) => theme.colors.gray[800]};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const ErrorMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.gray[600]};
  max-width: 500px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <ErrorTitle>Page Not Found</ErrorTitle>
      <ErrorMessage>
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </ErrorMessage>
      <Button 
        variant="primary" 
        leftIcon={<Home size={16} />} 
        onClick={handleGoHome}
      >
        Go to Dashboard
      </Button>
    </NotFoundContainer>
  );
};

export default NotFound;