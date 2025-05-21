import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Card from '../ui/Card';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'success';
  delay?: number;
}

interface ColorProps {
  color: 'primary' | 'secondary' | 'accent' | 'success';
}

const StatCardContainer = styled(motion.div)`
  height: 100%;
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
`;

const IconContainer = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-right: ${({ theme }) => theme.spacing.md};
  
  background-color: ${({ theme, color }) => 
    color === 'primary' ? theme.colors.primary[100] :
    color === 'secondary' ? theme.colors.secondary[100] :
    color === 'accent' ? theme.colors.accent[100] :
    theme.colors.success[100]};
  
  color: ${({ theme, color }) => 
    color === 'primary' ? theme.colors.primary[600] :
    color === 'secondary' ? theme.colors.secondary[600] :
    color === 'accent' ? theme.colors.accent[600] :
    theme.colors.success[600]};
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[500]};
`;

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  delay = 0
}) => {
  return (
    <StatCardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card>
        <CardContent>
          <IconContainer color={color}>
            {icon}
          </IconContainer>
          <StatContent>
            <StatValue>{value}</StatValue>
            <StatTitle>{title}</StatTitle>
          </StatContent>
        </CardContent>
      </Card>
    </StatCardContainer>
  );
};

export default StatCard;