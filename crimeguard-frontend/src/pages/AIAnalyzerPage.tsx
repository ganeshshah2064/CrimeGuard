import DashboardLayout from '../components/dashboard/DashboardLayout';
import { Brain, TrendingDown, MapPin, Clock, Zap, Target } from 'lucide-react';

const AIAnalyzerPage = () => {
  const insights = [
    { label: 'AI Insights', value: '12', subtitle: 'Patterns detected', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { label: 'Trend', value: '-15%', subtitle: 'Crime decrease', icon: TrendingDown, color: 'from-green-500 to-emerald-500', positive: true },
    { label: 'Hotspots', value: '5', subtitle: 'Areas identified', icon: MapPin, color: 'from-orange-500 to-red-500' },
    { label: 'Peak Time', value: '10 PM', subtitle: 'Most incidents', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  ];

  const predictions = [
    { area: 'Downtown', risk: 'High', percentage: 85, color: 'from-red-500 to-orange-500' },
    { area: 'Park Avenue', risk: 'Medium', percentage: 60, color: 'from-yellow-500 to-orange-500' },
    { area: 'Suburb Area', risk: 'Low', percentage: 25, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">Crime Insights</h1>
          </div>
          <p className="text-gray-400">
            AI-powered analysis of crime patterns and trends in your area.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div key={index} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.color} opacity-20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className={`w-12 h-12 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-3xl font-bold mb-1 ${insight.positive ? 'text-green-400' : 'text-white'}`}>
                    {insight.value}
                  </h3>
                  <p className="text-sm text-gray-400 mb-1">{insight.label}</p>
                  <p className="text-xs text-gray-500">{insight.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Analysis Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Predictions */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">Risk Predictions</h3>
              </div>
              <div className="space-y-4">
                {predictions.map((pred, i) => (
                  <div key={i} className="group/item">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{pred.area}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        pred.risk === 'High' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : pred.risk === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {pred.risk} Risk
                      </span>
                    </div>
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${pred.color} rounded-full transition-all duration-1000 group-hover/item:shadow-lg`}
                        style={{ width: `${pred.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">AI Recommendations</h3>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Increase Patrols', desc: 'Downtown area needs more police presence', priority: 'High' },
                  { title: 'Install Cameras', desc: 'Park Avenue lacks surveillance coverage', priority: 'Medium' },
                  { title: 'Community Watch', desc: 'Organize neighborhood watch programs', priority: 'Low' },
                ].map((rec, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 border border-white/5 hover:border-white/10 group/rec">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-semibold">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        rec.priority === 'High'
                          ? 'bg-red-500/20 text-red-400'
                          : rec.priority === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{rec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-xl" />
          <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
              <Brain className="w-7 h-7 text-purple-400" />
              <span>Detailed AI Analysis</span>
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                Our AI has analyzed crime patterns over the past 6 months and identified several key trends:
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Overall crime rate has decreased by 15% compared to last quarter</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-400 mt-1">⚠</span>
                  <span>Downtown area shows increased activity during evening hours (8-11 PM)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">ℹ</span>
                  <span>Property crimes are most common on weekends</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-purple-400 mt-1">★</span>
                  <span>Community engagement programs have shown 30% effectiveness in crime prevention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAnalyzerPage;
