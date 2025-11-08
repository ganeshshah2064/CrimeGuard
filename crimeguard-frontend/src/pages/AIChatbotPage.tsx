import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Bot, Send, Sparkles, User } from 'lucide-react';

const AIChatbotPage = () => {
  const [messages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your CrimeGuard AI Assistant. How can I help you today?",
      time: '10:30 AM',
    },
    {
      id: 2,
      type: 'user',
      text: 'How do I report a crime?',
      time: '10:31 AM',
    },
    {
      id: 3,
      type: 'bot',
      text: "To report a crime, click on the 'Add Crime' button in the sidebar or navigate to the Report page. You'll need to provide details about the incident, location, and any evidence you have.",
      time: '10:31 AM',
    },
  ]);

  const quickActions = [
    'How to report a crime?',
    'Check report status',
    'Safety tips',
    'Contact police',
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in h-[calc(100vh-8rem)]">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">AI Assistant</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <p className="text-sm text-green-400 font-semibold">Online & Ready</p>
              </div>
            </div>
          </div>
          <p className="text-gray-400">
            Get instant help and answers to your questions about crime reporting.
          </p>
        </div>

        {/* Chat Container */}
        <div className="relative group h-[calc(100%-8rem)]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-full flex flex-col overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 backdrop-blur-md bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">CrimeGuard AI</h3>
                    <p className="text-xs text-green-400 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      <span>Online</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  <span className="text-xs text-gray-400">Powered by AI</span>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    } animate-slide-up`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                        message.type === 'bot'
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-500/50'
                          : 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/50'
                      }`}
                    >
                      {message.type === 'bot' ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'} max-w-md`}>
                      <div
                        className={`rounded-2xl p-4 ${
                          message.type === 'bot'
                            ? 'bg-white/10 backdrop-blur-sm border border-white/10'
                            : 'bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-500/30'
                        }`}
                      >
                        <p className="text-sm text-white leading-relaxed">{message.text}</p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <p className="text-sm text-gray-400 mb-3">Quick Actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, i) => (
                    <button
                      key={i}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm text-gray-300 hover:text-white transition-all duration-300 text-left"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/10 backdrop-blur-md bg-white/5">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all duration-300"
                />
                <button className="p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 group">
                  <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to send • AI responses may take a moment
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIChatbotPage;
