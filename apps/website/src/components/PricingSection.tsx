import { Button } from "@/components/ui/button";
import { Check, Crown, Zap, X } from "lucide-react";
import { useState } from "react";

const plans = [
    {
      name: "Free",
      price: "₹0",
      originalPrice: null,
      description: "Perfect for trying out LeetCoach",
      features: [
        "3 AI Chats per day",
        "No Pattern Journal",
        "Share-to-unlock more chats"
      ],
      cta: "Join Free Tier",
      popular: false,
      period: "",
      badge: null
    },
    {
      name: "Starter",
      price: "₹149",
      originalPrice: "₹199",
      description: "Great for casual LeetCode users",
      features: [
        "100 AI Chats/month",
        "50 Journals",
      ],
      cta: "Get Starter Plan",
      popular: true,
      period: "monthly",
      badge: "Best Value"
    },
    {
      name: "Pro",
      price: "₹299",
      originalPrice: "₹399",
      description: "For daily LeetCode problem solvers",
      features: [
        "400 AI Chats/month",
        "100 Journals",
      ],
      cta: "Upgrade to Pro",
      popular: false,
      period: "monthly",
      badge: "Pro Power"
    },
    {
      name: "Top-up",
      price: "₹49",
      originalPrice: null,
      description: "Buy more chats anytime",
      features: [
        "75 extra AI Chats",
        "Instant activation",
        "Active Plan Required"
      ],
      cta: "Buy Top-up",
      popular: false,
      period: "one-time",
      badge: null
    }
  ];
  

const PricingSection = () => {
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-300 rounded-full text-sm font-medium text-red-800 mb-4">
            <Zap className="h-4 w-4 mr-2" />
            Limited Time: 25% OFF for Early Birds!
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Learning Journey
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Join the waiting list now and secure your spot with exclusive early bird pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-[1400px] mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col
                ${plan.popular ? 'border-2 border-leetcode-yellow scale-105 relative z-10 shadow-lg' : 'border border-gray-200 shadow-md'}`}
            >
              {plan.badge && (
                <div className={`${plan.popular ? 'bg-leetcode-yellow text-leetcode-black' : 'bg-gray-800 text-white'} text-center py-2 font-semibold text-sm tracking-wide`}>
                  {plan.badge}
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  {plan.popular && <Crown className="h-5 w-5 text-leetcode-yellow" />}
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.period && plan.period !== "one-time" && (
                      <span className="ml-1 text-lg font-medium text-gray-500">/{plan.period}</span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-1 flex items-center">
                      <span className="text-base text-gray-400 line-through">{plan.originalPrice}</span>
                      {plan.period && plan.period !== "one-time" && (
                        <span className="text-gray-400">/{plan.period}</span>
                      )}
                      <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs font-bold rounded-full">SAVE 25%</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature === "No Pattern Journal" && plan.name === "Free" ? (
                          <X className="h-4 w-4 text-red-500" aria-hidden="true" />
                        ) : (
                          <Check className="h-4 w-4 text-leetcode-yellow" aria-hidden="true" />
                        )}
                      </div>
                      <p className="ml-2 text-sm text-gray-700 leading-relaxed">{feature}</p>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full py-4 text-sm font-semibold transition-all duration-300 mt-auto relative ${
                    plan.popular 
                      ? 'bg-leetcode-black text-white hover:bg-black hover:shadow-lg' 
                      : 'bg-white text-leetcode-black border-2 border-leetcode-black hover:bg-leetcode-yellow/10 hover:shadow-md'
                  }`}
                  onMouseEnter={() => setHoveredButton(index)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  {plan.cta}
                  {hoveredButton === index && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg animate-fade-in">
                      Coming Soon
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center bg-white rounded-lg p-6 shadow-md">
          <p className="text-gray-700 text-lg font-semibold mb-2">
            🎯 Join 2,000+ developers on the waiting list!
          </p>
          <p className="text-gray-500 text-sm">
            Early bird pricing expires when we launch. Lock in your 25% discount now!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
