"use client"
import { motion } from "framer-motion";
import React from "react";

export default function CancelRefundPage() {
  return (
    <>
      <div className="container mx-auto p-4 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center w-full gap-8 md:gap-14 text-center"
        >
          <h1 className="text-3xl md:text-5xl font-bold">
            Cancellation & Refund Policy
          </h1>
          <div className="max-w-3xl mx-auto text-left">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  At Waigenie, we strive to ensure complete satisfaction with
                  our AI-powered testing services. This policy outlines our
                  guidelines for cancellations and refunds.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Payment Process</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We use Razorpay as our trusted payment gateway partner. When
                  you subscribe to our services:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                  <li>
                    Payments are processed securely through Razorpay's platform
                  </li>
                  <li>
                    Multiple payment methods are supported including
                    credit/debit cards, UPI, and net banking
                  </li>
                  <li>
                    All transactions are encrypted and comply with industry
                    standards
                  </li>
                  <li>You will receive payment confirmation via email</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Subscription & Pricing
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Your subscription fees contribute to:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                  <li>Advanced AI model usage and computing resources</li>
                  <li>Infrastructure maintenance and scaling</li>
                  <li>Continuous platform improvements and updates</li>
                  <li>Technical support and customer service</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Cancellation Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  You may cancel your subscription at any time:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                  <li>Cancel through your account dashboard</li>
                  <li>
                    Service access continues until the end of the billing period
                  </li>
                  <li>No automatic renewals after cancellation</li>
                  <li>Data retention for 30 days post-cancellation</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We offer refunds under the following conditions:
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-600 dark:text-gray-400">
                  <li>
                    Within 7 days of initial subscription for first-time users
                  </li>
                  <li>Service unavailability exceeding 24 hours</li>
                  <li>Double charging or technical payment errors</li>
                  <li>
                    Refunds are processed through the original payment method
                  </li>
                  <li>Processing time: 5-7 business days</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  For any questions regarding cancellations or refunds, please
                  contact our support team at support@waigenie.com. We aim to
                  respond within 24 hours during business days.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
