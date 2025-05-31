import { BookOpen, Brain, Code2, Database, FileText, Target, TrendingUp, Zap, Sparkles, Clock} from "lucide-react";

const features = [
  {
    name: "AI Code Analysis",
    description: "Real-time analysis of your LeetCode solutions with intelligent feedback and guidance.",
    icon: Brain,
  },
  {
    name: "Problem Scraping",
    description: "Automatically extracts problem statements and test cases for comprehensive analysis.",
    icon: Code2,
  },
  {
    name: "Personal Pattern Journal",
    description: "AI-generated playbook with trigger clues, variants, and your past attempts for each pattern.",
    icon: BookOpen,
  },
  {
    name: "Approach Learning",
    description: "Learn problem-solving approaches without direct solutions - master the thinking process.",
    icon: Target,
  },
  {
    name: "Pattern Recognition",
    description: "Automatically identifies and categorizes DSA patterns as you solve problems.",
    icon: Database,
  },
  {
    name: "Smart Hints System",
    description: "Contextual hints that guide you towards solutions without spoiling the learning.",
    icon: FileText,
  },
  {
    name: "Progress Tracking",
    description: "Visual analytics of your pattern mastery and problem-solving improvement over time.",
    icon: TrendingUp,
  },
  {
    name: "Zero Note-Taking",
    description: "We build your revision journal automatically - focus on solving, not documenting.",
    icon: Zap,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Revolutionary Features That Transform Learning
          </h2>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 mx-auto">
            Stop memorizing solutions. Start understanding patterns. LeetCoach analyzes your approach 
            and builds a personalized learning system just for you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card relative bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-leetcode-yellow/50"
            >
              <div className="absolute -top-3 -left-3 bg-leetcode-yellow p-3 rounded-xl shadow-md">
                <feature.icon className="h-6 w-6 text-leetcode-black" aria-hidden="true" />
              </div>
              <div className="pt-4">
                <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.name}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-leetcode-yellow/10 via-yellow-50 to-orange-100 rounded-3xl"></div>
          <div className="absolute top-4 right-4 animate-bounce">
            <Sparkles className="h-8 w-8 text-leetcode-yellow" />
          </div>
          <div className="absolute bottom-4 left-4 animate-pulse">
            <div className="w-16 h-16 bg-leetcode-yellow/20 rounded-full flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-leetcode-yellow" />
            </div>
          </div>
          
          <div className="relative bg-yellow-50 backdrop-blur-sm rounded-3xl p-8 border border-leetcode-yellow/20 shadow-2xl">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-4 py-2 bg-leetcode-yellow rounded-full text-sm font-bold text-leetcode-black mb-4">
                <Zap className="h-4 w-4 mr-2" />
                GAME CHANGING FEATURE
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                🚀 The Pattern Journal Revolution
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Difficulty in revising DSA questions? We got you covered!
              </p>
              <div className="mt-2 inline-flex items-center text-m text-gray-500">
              Your Personal DSA Playbook, Built Automatically by AI
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="relative h-full">
                <div className="bg-gradient-to-br from-leetcode-yellow to-yellow-400 rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl font-bold text-leetcode-black">1</span>
                  </div>
                  <h4 className="font-bold text-leetcode-black mb-3 text-lg">Solve Problems</h4>
                  <p className="text-sm text-leetcode-black/80 leading-relaxed">
                    Code your solutions on LeetCode as usual - our AI watches and takes notes for you.
                  </p>
                </div>
                {/* <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div> */}
              </div>

              <div className="relative h-full">
                <div className="bg-gradient-to-br from-gray-800 to-leetcode-black rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-leetcode-yellow rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl font-bold text-leetcode-black">2</span>
                  </div>
                  <h4 className="font-bold text-white mb-3 text-lg">AI Analyzes & Learns</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Our AI identifies patterns, creates trigger clues, and understands your approach
                  </p>
                  <div className="mt-3 flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-leetcode-yellow rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-leetcode-yellow rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-leetcode-yellow rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-full">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <h4 className="font-bold text-white mb-3 text-lg">Journal Updates</h4>
                  <p className="text-sm text-green-100 leading-relaxed">
                    Your personalized pattern playbook grows automatically with each problem
                  </p>
                  <div className="mt-3">
                    <div className="inline-flex items-center px-3 py-1 bg-white/20 rounded-full text-xs text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      Real-time updates
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-yellow-50 rounded-2xl p-6 border-2 border-dashed border-leetcode-yellow/30">
              <div className="text-center">
                <h5 className="font-bold text-gray-800 mb-2">🎯 What You Get in Your Personalised DSA Journal</h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 text-sm">
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-leetcode-yellow rounded-full mr-2"></span>
                    <span className="text-gray-700">Hints for Pattern Recognition</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-leetcode-yellow rounded-full mr-2"></span>
                    <span className="text-gray-700">Pseudo Code & Explanation</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-leetcode-yellow rounded-full mr-2"></span>
                    <span className="text-gray-700">Your Past Attempts & Learning</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="w-2 h-2 bg-leetcode-yellow rounded-full mr-2"></span>
                    <span className="text-gray-700">Categorised by Pattern</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
