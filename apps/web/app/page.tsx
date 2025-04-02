"use client"
import { Button } from "@workspace/ui/components/button"
import { Code2, Brain, Zap, Chrome, Check } from "lucide-react";

export default function Home() {
  const handleGoogleSignIn = () => {
    // Add Google Sign In Logic
    console.log("Google Sign In clicked");
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,204,0,0.2),transparent_70%)]" />
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">LeetCoach</span>
            </div>
            <Button 
              variant="outline" 
              className="bg-yellow-400 text-black hover:bg-yellow-500 border-none"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
          </div>
        </nav>

        <main className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                Master LeetCode with Your
                <span className="text-yellow-400"> AI Coach</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Get personalized guidance, hints, and explanations as you solve coding challenges. 
                Level up your problem-solving skills with an AI that understands your learning style.
              </p>
              <div className="flex justify-center">
                <Button 
                  size="lg"
                  className="bg-yellow-400 text-black hover:bg-yellow-500"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Add to Chrome
                </Button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <Brain className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Smart Guidance</h3>
                <p className="text-gray-400">
                  Receive intelligent hints and step-by-step guidance tailored to your skill level.
                </p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Real-time Help</h3>
                <p className="text-gray-400">
                  Get instant assistance when you are stuck, with explanations that make sense.
                </p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <Code2 className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Pattern Recognition</h3>
                <p className="text-gray-400">
                  Learn to identify common patterns and improve your problem-solving approach.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2">Free</h3>
                <div className="text-4xl font-bold text-white mb-6">Rs 0</div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Basic problem hints
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    5 problems per day
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Community support
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400/10"
                  onClick={() => console.log("Free plan selected")}
                >
                  Get Started
                </Button>
              </div>

              {/* Monthly Plan */}
              <div className="bg-zinc-900 p-8 rounded-xl border-2 border-yellow-400 flex flex-col relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                  POPULAR
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Pro Monthly</h3>
                <div className="text-4xl font-bold text-white mb-6">Rs 100<span className="text-lg text-gray-400">/month</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Unlimited problems
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Detailed explanations
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Priority support
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Custom learning path
                  </li>
                </ul>
                <Button 
                  className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                  onClick={() => console.log("Monthly plan selected")}
                >
                  Subscribe Now
                </Button>
              </div>

              {/* Yearly Plan */}
              <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2">Pro Yearly</h3>
                <div className="text-4xl font-bold text-white mb-6">Rs 1000<span className="text-lg text-gray-400">/year</span></div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Everything in Pro Monthly
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Save $200 annually
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    Interview prep resources
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-yellow-400 mr-2" />
                    1-on-1 coaching session
                  </li>
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full text-yellow-400 border-yellow-400 hover:bg-yellow-400/10"
                  onClick={() => console.log("Yearly plan selected")}
                >
                  Subscribe Yearly
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_rgba(255,204,0,0.1),transparent_50%)]" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                  Ready to Transform Your LeetCode Journey?
                </h2>
                <p className="text-gray-300 text-center mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who are mastering coding challenges with LeetCoach. 
                  Start your journey today!
                </p>
                <div className="flex justify-center">
                  <Button 
                    size="lg"
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                    onClick={() => console.log("Install clicked")}
                  >
                    <Chrome className="mr-2 h-5 w-5" />
                    Install LeetCoach Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}