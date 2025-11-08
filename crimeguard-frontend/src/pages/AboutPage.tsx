import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Shield, Users, Target, Award, Heart, Zap } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Secure',
      description: 'Your data is encrypted and protected with industry-leading security',
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building safer neighborhoods together through collaboration',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Effective',
      description: 'Fast response times and real-time updates on your reports',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      title: 'Trusted',
      description: 'Partnered with local authorities and law enforcement',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/50">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">About CrimeGuard</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Learn more about our mission to make communities safer through technology and collaboration.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-purple-500/20 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  CrimeGuard is dedicated to creating safer communities by empowering citizens to
                  report crimes easily and anonymously. We bridge the gap between citizens and law
                  enforcement through technology, making crime reporting accessible to everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-center">
                  <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
                  17,500+
                </div>
                <p className="text-gray-400">Reports Filed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">
                  2,740+
                </div>
                <p className="text-gray-400">Police Stations Connected</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent mb-2">
                  50+
                </div>
                <p className="text-gray-400">Cities Covered</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-3">Join Our Mission</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Together, we can create safer communities. Report crimes, stay informed, and help make a difference.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AboutPage;
