import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Percent } from "lucide-react";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const HeroSection = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnWaitlist, setIsOnWaitlist] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    const checkWaitlistStatus = async () => {
      if (session?.user?.id) {
        const { data, error } = await supabase
          .from('waiting_list')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (!error && data) {
          setIsOnWaitlist(true);
        } else {
          // If user is signed in but not on waitlist, add them automatically
          try {
            const { error: insertError } = await supabase
              .from('waiting_list')
              .insert([
                {
                  user_id: session.user.id,
                  email: session.user.email,
                  name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
                  early_bird_discount: true
                }
              ]);

            if (!insertError) {
              setIsJoining(true);
              setTimeout(() => {
                setIsJoining(false);
                setIsOnWaitlist(true);
              }, 5000);
            }
          } catch (error) {
            console.error('Error adding user to waitlist:', error);
          }
        }
      }
    };

    checkWaitlistStatus();
  }, [session]);

  const handleWaitlistClick = () => {
    if (!session) {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="inline-flex items-center px-4 py-2 bg-leetcode-yellow border border-black-500 rounded-full text-sm font-medium text-leetcode-black mb-6">
              <Percent className="h-4 w-4 mr-2" />
              30% OFF - Early Bird Special!
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Your Personal 
              <span className="text-yellow-600"> AI DSA Coach </span>
              for LeetCode Mastery
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              Stop memorizing solutions! Our AI coach analyzes your code, scrapes problems in real-time, 
              and builds your personal Pattern Journal - helping you truly master DSA problem-solving patterns.
            </p>
            <div className="mt-8">
              <Button 
                onClick={handleWaitlistClick}
                disabled={isOnWaitlist}
                className="bg-leetcode-black hover:bg-leetcode-black/90 text-white font-medium text-lg px-8 py-3"
              >
                {isJoining ? (
                  "Joining Waitlist..."
                ) : isOnWaitlist ? (
                  "Coming Soon"
                ) : session ? (
                  "Join Waitlist"
                ) : (
                  "Join Waiting List - 30% OFF"
                )} 
                {!isOnWaitlist && !isJoining && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </div>
            <div className="mt-6 lg:mt-8">
              <div className="flex items-center gap-6">
                <div className="flex -space-x-1 overflow-hidden">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full ring-2 ring-white bg-gradient-to-r from-leetcode-yellow to-yellow-400 flex items-center justify-center">
                      <span className="text-sm font-bold text-leetcode-black">{i}</span>
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">+20</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">20+ Leetcoders on waiting list</p>
                  <p className="text-xs text-gray-500">Join now for exclusive early access</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-7">
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200 animate-float">
              <div className="bg-leetcode-black py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-sm text-white flex items-center">
                    <Code className="h-4 w-4 mr-2" />
                    LeetCoach AI Coach
                  </div>
                </div>
                <div className="px-3 py-1 bg-leetcode-yellow text-leetcode-black text-xs font-bold rounded-full">
                  LIVE ANALYSIS
                </div>
              </div>
              <div className="p-6 bg-gray-50">
                <div className="space-y-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Analyzing:</span> Two Sum - Array problem detected
                    </p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Pattern Identified:</span> Hash Map + Single Pass
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Adding to your Pattern Journal...</p>
                  </div>
                  <div className="p-3 bg-leetcode-yellow/20 rounded-lg border-l-4 border-leetcode-yellow">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">AI Coach:</span> I see you're using nested loops. Let me guide you towards O(n) solution without giving it away...
                    </p>
                  </div>
                  <div className="flex items-center justify-start space-x-2">
                    <div className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full flex items-center">
                      <span className="mr-1">📚</span> Pattern Journal Updated
                    </div>
                    <div className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded-full flex items-center">
                      <span className="mr-1">🧠</span> Learning Path Optimized
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </section>
  );
};

export default HeroSection;
