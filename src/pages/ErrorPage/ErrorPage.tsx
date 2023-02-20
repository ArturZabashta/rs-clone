import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <section className="error-page">
      <h2 className="page-title error-title">404</h2>
      <h2 className="page-title">Page not found</h2>
      <p className="f-center text-on-video">Hmm, this page seems to be missing</p>
    </section>
  );
};
export default ErrorPage;
