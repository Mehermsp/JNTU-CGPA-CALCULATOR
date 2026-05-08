import React from 'react';

export default function SiteFooter({ compact = false }) {
  return (
    <footer className={`site-footer ${compact ? 'compact' : ''}`}>
      <p>Disclaimer: This website is only for R20, VSM College of Engineering.</p>
      <p>Created by MSP</p>
    </footer>
  );
}
