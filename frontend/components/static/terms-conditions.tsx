"use client";
import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto p-4 mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center w-full gap-8 md:gap-14 text-center"
      >
        <h1 className="text-3xl md:text-5xl font-bold">Terms and Conditions</h1>
        <div className="max-w-3xl mx-auto text-left">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Welcome to Waigenie! These terms and conditions outline the rules and
                regulations for the use of our website and services. Please read these terms carefully before using our platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">AI Technology Usage</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Waigenie utilizes advanced AI technologies including web agents and the Gemini API to process and respond to user prompts. 
                By using our services, you acknowledge that your interactions may be processed by these AI systems to provide automated testing solutions.
                We ensure the security and privacy of your data in accordance with our privacy policy.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Service Terms</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Our services are provided "as is" and "as available". While we strive for 100% accuracy, the AI-powered nature of our services means results may vary.
                We reserve the right to modify, suspend, or discontinue any part of our services without prior notice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Licensing</h2>
              <p className="text-gray-600 dark:text-gray-400">
                The frontend codebase for Waigenie is licensed under the MIT License.
                Users are granted permission to use, copy, modify, and distribute the code
                for any purpose, provided that the original copyright notice is included.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">User Obligations</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Users agree to:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                <li>Use the services in compliance with all applicable laws</li>
                <li>Maintain the confidentiality of their account credentials</li>
                <li>Not misuse or attempt to exploit our AI systems</li>
                <li>Accept responsibility for all activities under their account</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Updates to Terms</h2>
              <p className="text-gray-600 dark:text-gray-400">
                We reserve the right to modify these terms and conditions at any time.
                Continued use of Waigenie after changes constitutes acceptance of the new terms.
                Users will be notified of significant changes via email or through our platform.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsAndConditions;
