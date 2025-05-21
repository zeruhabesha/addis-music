import React from 'react';
import styled from '@emotion/styled';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const getButtonStyles = (variant: ButtonVariant, theme: any) => {
  switch (variant) {
    case 'primary':
      return `
        background-color: ${theme.colors.primary[600]};
        color: white;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.primary[700]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.primary[800]};
        }
      `;
    case 'secondary':
      return `
        background-color: ${theme.colors.gray[100]};
        color: ${theme.colors.gray[800]};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.gray[200]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.gray[300]};
        }
      `;
    case 'success':
      return `
        background-color: ${theme.colors.success[600]};
        color: white;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.success[700]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.success[800]};
        }
      `;
    case 'danger':
      return `
        background-color: ${theme.colors.error[600]};
        color: white;
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.error[700]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.error[800]};
        }
      `;
    case 'ghost':
      return `
        background-color: transparent;
        color: ${theme.colors.gray[700]};
        
        &:hover:not(:disabled) {
          background-color: ${theme.colors.gray[100]};
        }
        
        &:active:not(:disabled) {
          background-color: ${theme.colors.gray[200]};
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize, theme: any) => {
  switch (size) {
    case 'sm':
      return `
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: ${theme.typography.fontSizes.sm};
      `;
    case 'md':
      return `
        padding: ${theme.spacing.sm} ${theme.spacing.md};
        font-size: ${theme.typography.fontSizes.md};
      `;
    case 'lg':
      return `
        padding: ${theme.spacing.md} ${theme.spacing.lg};
        font-size: ${theme.typography.fontSizes.lg};
      `;
    default:
      return '';
  }
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  
  ${({ variant = 'primary', theme }) => getButtonStyles(variant, theme)}
  ${({ size = 'md', theme }) => getButtonSize(size, theme)}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme, variant = 'primary' }) => 
      variant === 'primary' ? theme.colors.primary[200] : 
      variant === 'success' ? theme.colors.success[200] : 
      variant === 'danger' ? theme.colors.error[200] : 
      theme.colors.gray[200]
    };
  }
`;

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...rest 
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </>
      )}
    </StyledButton>
  );
};

export default Button;