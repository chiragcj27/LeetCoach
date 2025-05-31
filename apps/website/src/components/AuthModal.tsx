import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { supabase } from '../lib/supabase'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-yellow-50 p-0 overflow-hidden border border-yellow-100">
        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome to LeetCoach</h2>
            <p className="text-gray-600 mt-2">Sign in to continue your coding journey</p>
          </div>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#EAB308',
                    brandAccent: '#CA8A04',
                    inputBackground: '#FFFFFF',
                    inputBorder: '#FCD34D',
                    inputText: '#1F2937',
                    inputPlaceholder: '#9CA3AF',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '0.5rem',
                    buttonBorderRadius: '0.5rem',
                    inputBorderRadius: '0.5rem',
                  },
                },
              },
              className: {
                container: 'auth-container space-y-4',
                button: 'auth-button w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-yellow-200 bg-white hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200',
                input: 'auth-input w-full border border-yellow-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-transparent bg-white',
                label: 'auth-label block text-sm font-medium text-gray-700 mb-1.5',
                divider: 'auth-divider relative my-6',
                message: 'auth-message text-sm text-gray-600 mt-2',
              },
            }}
            providers={['google', 'github']}
            redirectTo={window.location.origin}
            theme="light"
            view="sign_in"
            showLinks={false}
            onlyThirdPartyProviders={true}
            localization={{
              variables: {
                sign_in: {
                  button_label: 'Continue with',
                  loading_button_label: 'Signing in...',
                },
                sign_up: {
                  button_label: 'Continue with',
                  loading_button_label: 'Signing up...',
                },
              },
            }}
          />
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AuthModal 