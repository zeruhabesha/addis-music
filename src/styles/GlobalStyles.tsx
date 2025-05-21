import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

export const GlobalStyles: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html, body {
          height: 100%;
          font-family: ${theme.typography.fontFamily};
          font-size: 16px;
          line-height: ${theme.typography.lineHeights.normal};
          color: ${theme.colors.gray[900]};
          background-color: ${theme.colors.gray[50]};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        #root {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        a {
          color: ${theme.colors.primary[600]};
          text-decoration: none;
          transition: ${theme.transitions.default};
          
          &:hover {
            color: ${theme.colors.primary[700]};
          }
        }
        
        button, input, select, textarea {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        
        h1, h2, h3, h4, h5, h6 {
          margin-bottom: ${theme.spacing.md};
          font-weight: ${theme.typography.fontWeights.semibold};
          line-height: ${theme.typography.lineHeights.tight};
          color: ${theme.colors.gray[900]};
        }
        
        h1 {
          font-size: ${theme.typography.fontSizes.display.sm};
        }
        
        h2 {
          font-size: ${theme.typography.fontSizes.xxl};
        }
        
        h3 {
          font-size: ${theme.typography.fontSizes.xl};
        }
        
        h4 {
          font-size: ${theme.typography.fontSizes.lg};
        }
        
        h5 {
          font-size: ${theme.typography.fontSizes.md};
        }
        
        h6 {
          font-size: ${theme.typography.fontSizes.sm};
        }
        
        p {
          margin-bottom: ${theme.spacing.md};
        }
        
        @media (min-width: ${theme.breakpoints.lg}) {
          h1 {
            font-size: ${theme.typography.fontSizes.display.md};
          }
        }
      `}
    />
  );
};