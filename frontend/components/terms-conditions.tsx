import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Waigenie! These terms and conditions outline the rules and
        regulations for the use of our website and services.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Frontend Codebase</h2>
      <p className="text-gray-700 mb-4">
        The frontend codebase for Waigenie is licensed under the MIT License.
        You are granted permission to use, copy, modify, and distribute the code
        for any purpose, provided that you include the original copyright notice.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Waigenie Services</h2>
      <p className="text-gray-700 mb-4">
        By using Waigenie services, you agree to comply with our terms of use and
        privacy policy. We reserve the right to modify these terms and
        conditions at any time.
      </p>
      {/* Add more specific terms and conditions here */}
    </div>
  );
};

export default TermsAndConditions;
