import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnWaitlist, setIsOnWaitlist] = useState(false);
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
        }
      }
    };

    checkWaitlistStatus();
  }, [session]);

  return (
    <nav className="bg-white border-b border-leetcode-lightGray sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/leetcoachLogo.svg" 
              alt="LeetCoach Logo" 
              className="h-40 w-auto object-contain hover:opacity-90 transition-opacity"
            />
            <p className="text-3xl font-bold">LeetCoach</p>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-700 hover:text-leetcode-yellow px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-leetcode-yellow px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-leetcode-yellow px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              FAQ
            </a>
            {!session ? (
              <>
                <Button variant="outline" className="ml-4 hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200" onClick={() => setIsAuthModalOpen(true)}>
                  Sign In
                </Button>
                <Button className="bg-leetcode-yellow text-black hover:bg-leetcode-yellow/90 hover:scale-105 hover:shadow-md transition-all duration-200" onClick={() => setIsAuthModalOpen(true)}>
                  Get Started
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  {session.user.user_metadata?.full_name || session.user.email?.split('@')[0]}
                  {isOnWaitlist && (
                    <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                      On Waitlist
                    </span>
                  )}
                </span>
                <Button 
                  variant="outline" 
                  className="hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200"
                  onClick={() => supabase.auth.signOut()}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-leetcode-yellow hover:bg-gray-50 focus:outline-none transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <a href="#features" className="text-gray-700 hover:text-leetcode-yellow hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-leetcode-yellow hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-leetcode-yellow hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              Testimonials
            </a>
            <a href="#faq" className="text-gray-700 hover:text-leetcode-yellow hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200">
              FAQ
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {!session ? (
                <>
                  <div className="flex items-center px-5">
                    <Button variant="outline" className="w-full mb-2 hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200" onClick={() => setIsAuthModalOpen(true)}>
                      Sign In
                    </Button>
                  </div>
                  <div className="flex items-center px-5">
                    <Button className="w-full bg-leetcode-yellow text-black hover:bg-leetcode-yellow/90 hover:scale-105 hover:shadow-md transition-all duration-200" onClick={() => setIsAuthModalOpen(true)}>
                      Get Started
                    </Button>
                  </div>
                </>
              ) : (
                <div className="px-5 space-y-2">
                  <div className="text-gray-700 text-center mb-2">
                    {session.user.user_metadata?.full_name || session.user.email?.split('@')[0]}
                    {isOnWaitlist && (
                      <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        On Waitlist
                      </span>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-gray-50 hover:scale-105 hover:shadow-md transition-all duration-200"
                    onClick={() => supabase.auth.signOut()}
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
