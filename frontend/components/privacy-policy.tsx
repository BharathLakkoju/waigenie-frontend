import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-6">
        This privacy policy outlines how Waigenie collects, uses, and protects user data for the
        frontend application and related services.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <div className="text-gray-700 mb-6">
        We may collect the following types of information:
        <ul className="list-disc list-inside ml-4">
          <li>Usage data: Information about how you use our app</li>
          <li>Device information: Type of device, operating system, etc.</li>
          {/* Add other data points here as list items */}
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <div className="text-gray-700 mb-6">
        We use your information for the following purposes:
        <ul className="list-disc list-inside ml-4">
          <li>Improve our services</li>
          <li>Provide technical support</li>
          <li>Personalize your experience</li>
          {/* Add other use cases as list items */}
        </ul>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
      <p className="text-gray-700 mb-6">
        We implement security measures to protect your information. However, no method of
        transmission over the internet or electronic storage is completely secure.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Your Choices</h2>
      <p className="text-gray-700 mb-6">You can manage your privacy settings within the app.</p>

      <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions, contact us at{' '}
        <a
          href="mailto:support@waigenie.com"
          className="text-blue-500 hover:underline"
        >
          support@waigenie.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
