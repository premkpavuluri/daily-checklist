import React from 'react';
import Icon from './Icon';
import { config } from '../../lib/config';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: '#fff',
      borderTop: '1px solid #ececec',
      padding: '16px 40px',
      marginTop: 'auto',
      boxShadow: '0 -2px 8px #0001'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#666'
        }}>
          Made with
          <span
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              color: '#e53e3e',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontSize: '16px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.color = '#dc2626';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.color = '#e53e3e';
            }}
          >
            ❤️
            <span
              style={{
                position: 'absolute',
                top: '-25px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#333',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                whiteSpace: 'nowrap',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
            >
              prem
            </span>
          </span>
          by{' '}
          <a
            href={config.github.profile}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#666',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#333';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
            }}
          >
            Prem
          </a>
        </span>
        
        <div style={{
          width: '1px',
          height: '20px',
          background: '#d1d5db',
          margin: '0 8px'
        }} />
        
        <a
          href={config.github.repository}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            padding: '8px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            border: '1px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#333';
            e.currentTarget.style.background = '#f3f4f6';
            e.currentTarget.style.borderColor = '#d1d5db';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#666';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'transparent';
          }}
        >
          <Icon name="github" size={18} color="currentColor" />
          Project
        </a>
      </div>
    </footer>
  );
};

export default Footer; 