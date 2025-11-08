import DashboardLayout from '../components/dashboard/DashboardLayout';
import { HelpCircle, Mail, Phone, MessageCircle } from 'lucide-react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'How do I report a crime?',
      answer:
        'Click on "Report Crime" in the sidebar or use the quick action button on your portal. Fill out the form with details about the incident and submit.',
    },
    {
      question: 'Is my report anonymous?',
      answer:
        'You can choose to submit reports anonymously. However, providing contact information helps authorities follow up if needed.',
    },
    {
      question: 'How long does it take to get a response?',
      answer:
        'Response times vary based on the severity and type of crime. Emergency situations are prioritized and typically receive immediate attention.',
    },
    {
      question: 'Can I track my report status?',
      answer:
        'Yes! You can view all your reports and their current status in the "My Reports" section of your portal.',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Help & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Find answers to common questions and get in touch with us.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              support@crimeguard.com
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              1-800-CRIME-GUARD
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Available 24/7
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FAQPage;
