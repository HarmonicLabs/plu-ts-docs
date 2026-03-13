import React from 'react';
import Layout from '@theme/Layout';
import Playground from '../components/Playground';

export default function PlaygroundPage() {
  return (
    <Layout
      title="Playground"
      noFooter
    >
      <div style={{
        position: 'fixed',
        top: 'var(--ifm-navbar-height)',
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Playground fullPage />
      </div>
    </Layout>
  );
}
