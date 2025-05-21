import React, { ReactNode } from 'react';
import styled from '@emotion/styled';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  hoverable?: boolean;
  className?: string;
}

const CardContainer = styled.div<{ hoverable?: boolean }>`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  
  ${({ hoverable, theme }) => hoverable && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

const CardSubtitle = styled.p`
  margin: ${({ theme }) => `${theme.spacing.xs} 0 0`};
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  hoverable = false,
  className,
}) => {
  return (
    <CardContainer hoverable={hoverable} className={className}>
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;