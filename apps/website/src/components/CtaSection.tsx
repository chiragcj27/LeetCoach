import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const CtaSection = () => {
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-leetcode-black to-gray-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 sm:px-12 lg:px-16">    
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-leetcode-yellow/20 border border-leetcode-yellow rounded-full text-sm font-medium text-leetcode-yellow mb-6">
                  <Clock className="h-4 w-4 mr-2" />
                  Limited Time Offer - 25% OFF
                </div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Don't Just Solve Problems, 
                  <span className="text-leetcode-yellow"> Master Patterns!</span>
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                  Join the waiting list for LeetCoach and revolutionize how you prepare for coding interviews. 
                  Your AI coach is waiting to build your personal Pattern Journal.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-leetcode-yellow" />
                    </div>
                    <p className="ml-3 text-base text-gray-300">
                      Real-time code analysis & intelligent guidance
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-leetcode-yellow" />
                    </div>
                    <p className="ml-3 text-base text-gray-300">
                      Personal Pattern Journal built automatically
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-leetcode-yellow" />
                    </div>
                    <p className="ml-3 text-base text-gray-300">
                      Learn approaches, not just solutions
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-leetcode-yellow" />
                    </div>
                    <p className="ml-3 text-base text-gray-300">
                      25% discount for early supporters
                    </p>
                  </div>
                </div>
                <div className="mt-8">
                  <Button 
                    className="w-full bg-leetcode-yellow text-leetcode-black hover:bg-yellow-400 px-8 text-lg py-3" 
                    onClick={handleWaitlistClick}
                    disabled={isOnWaitlist}
                  >
                    {isJoining ? "Joining Waitlist..." : isOnWaitlist ? "Coming Soon" : "Join Waiting List - 25% OFF"} 
                    {!isOnWaitlist && !isJoining && <ArrowRight className="ml-2 h-5 w-5" />}
                  </Button>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex items-center text-gray-300">
                    <Users className="h-5 w-5 mr-2" />
                    <span className="text-sm">Many developers have already joined</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="text-sm">Launching before November 2025</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="p-4 bg-leetcode-darkGray/90 backdrop-blur rounded-lg shadow-lg overflow-hidden border border-gray-700">
                  <div className="relative animate-pulse-light">
                    <div className="rounded-t-md bg-leetcode-darkGray p-2 flex items-center justify-between border-b border-gray-700">
                      <div className="flex items-center">
                        <div className="h-3 w-3 bg-red-500 rounded-full mr-2"></div>
                        <div className="h-3 w-3 bg-yellow-500 rounded-full mr-2"></div>
                        <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
                        <div className="ml-2 text-xs text-white/70">Pattern Journal</div>
                      </div>
                      <div className="px-2 py-1 bg-leetcode-yellow text-leetcode-black text-xs font-bold rounded">
                        LIVE
                      </div>
                    </div>
                    <div className="p-4 text-left space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-leetcode-yellow mb-1">TWO POINTERS PATTERN</div>
                        <div className="text-sm text-white">✓ Trigger: Sorted array + pair finding</div>
                        <div className="text-xs text-gray-400">Solved: 12 problems</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-leetcode-yellow mb-1">SLIDING WINDOW PATTERN</div>
                        <div className="text-sm text-white">✓ Trigger: Contiguous subarray/substring</div>
                        <div className="text-xs text-gray-400">Solved: 8 problems</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-leetcode-yellow mb-1">HASH MAP PATTERN</div>
                        <div className="text-sm text-white">✓ Trigger: Frequency counting + lookup</div>
                        <div className="text-xs text-gray-400">Solved: 15 problems</div>
                      </div>
                      <div className="pt-2 border-t border-gray-600">
                        <div className="text-xs text-leetcode-yellow font-semibold">NEXT RECOMMENDATION</div>
                        <div className="text-xs text-white">Practice: Binary Search patterns</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-red-500 text-white px-3 py-2 rounded-md shadow-lg rotate-12 text-sm font-bold">
                  25% OFF!
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

export default CtaSection;
