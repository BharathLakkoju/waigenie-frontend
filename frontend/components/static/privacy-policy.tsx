"use client";
import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto p-4 mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center w-full gap-8 md:gap-14 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold">Privacy Policy</h1>
        <div className="max-w-3xl mx-auto text-left">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                This privacy policy outlines how Waigenie collects, uses, and protects user data for our
                application and related services. We are committed to ensuring the security and privacy of your information.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We collect and process the following types of information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400">
                <li>User account information (email, encrypted passwords)</li>
                <li>Usage data and interaction patterns with our AI systems</li>
                <li>Test scenarios and prompts submitted to our platform</li>
                <li>Device information and browser metadata</li>
                <li>Technical logs and performance metrics</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is stored securely in our cloud infrastructure with the following measures:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>End-to-end encryption for all sensitive data</li>
                <li>User credentials are hashed using industry-standard algorithms</li>
                <li>Regular security audits and penetration testing</li>
                <li>Data backups with encrypted storage</li>
                <li>Access controls and authentication mechanisms</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">AI Processing and Data Usage</h2>
              <p className="text-gray-600 dark:text-gray-400">
                When you use our AI-powered testing services:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Your prompts are processed by our AI models to generate test scenarios</li>
                <li>Test results and analytics are stored securely in your account</li>
                <li>We may use anonymized data to improve our AI models</li>
                <li>Your intellectual property rights are fully preserved</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Your Data Rights</h2>
              <p className="text-gray-600 dark:text-gray-400">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Access your personal data</li>
                <li>Request data deletion</li>
                <li>Export your data</li>
                <li>Opt-out of data processing for AI improvement</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400">
                For any privacy-related concerns or requests, please contact us at{' '}
                <a
                  href="mailto:privacy@waigenie.com"
                  className="text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  privacy@waigenie.com
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
