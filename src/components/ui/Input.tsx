import React, { forwardRef } from 'react';
import styled from '@emotion/styled';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.gray[700]};
`;

const StyledInput = styled.input<{ error?: string }>`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme, error }) => 
    error ? theme.colors.error[400] : theme.colors.gray[300]};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  transition: ${({ theme }) => theme.transitions.default};
  
  &:focus {
    outline: none;
    border-color: ${({ theme, error }) => 
      error ? theme.colors.error[400] : theme.colors.primary[400]};
    box-shadow: 0 0 0 2px ${({ theme, error }) => 
      error ? theme.colors.error[100] : theme.colors.primary[100]};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin: ${({ theme }) => `${theme.spacing.xs} 0 0`};
  color: ${({ theme }) => theme.colors.error[600]};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, id, ...rest }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
        <StyledInput id={inputId} error={error} ref={ref} {...rest} />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;