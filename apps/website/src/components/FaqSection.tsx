import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does LeetCoach help me solve LeetCode problems without giving direct solutions?",
    answer: "LeetCoach acts as your AI coach by analyzing your code approach and providing intelligent hints that guide your thinking process. Instead of showing you the answer, it helps you understand the underlying patterns and gives you contextual clues to discover the solution yourself, making your learning more effective and lasting.",
  },
  {
    question: "What is the Pattern Journal and how does it work?",
    answer: "The Pattern Journal is your personalized DSA playbook that gets built automatically as you solve problems. It includes trigger clues (like 'sorted array + sum = use two pointers'), problem variants, and records of your past attempts. This becomes your mental framework for recognizing and solving similar problems in the future.",
  },
  {
    question: "How does LeetCoach analyze my code and scrape problems?",
    answer: "Our Chrome extension monitors your LeetCode activity in real-time, analyzing your code as you write it and automatically extracting problem statements and test cases. The AI then identifies the underlying DSA patterns and provides personalized coaching based on your specific approach and coding style.",
  },
  {
    question: "What's the difference between the Free and Pro plans?",
    answer: "The Free plan allows you to use our AI coaching for 1 question per day but doesn't include the Pattern Journal feature. Pro plans (Monthly/Yearly) give you unlimited AI coaching sessions, full Pattern Journal access, real-time code analysis, and advanced learning paths with progress analytics.",
  },
  {
    question: "How much time will I save with the automatic note-taking feature?",
    answer: "Instead of spending 10-15 minutes after each problem writing notes, reviewing patterns, and organizing your learning - LeetCoach does this automatically. Most users save 2-3 hours per week that they would otherwise spend on manual note-taking and pattern organization.",
  },
  {
    question: "Will LeetCoach work with all LeetCode problems and languages?",
    answer: "Yes, LeetCoach supports all LeetCode problems and major programming languages including Python, Java, C++, JavaScript, and more. Our AI can analyze different coding approaches and identify patterns regardless of the language you choose to solve problems in.",
  },
  {
    question: "How does the early bird discount work?",
    answer: "By joining our waiting list now, you lock in a 25% discount on all our plans. Once we launch, you'll pay ₹75/month instead of ₹100 for the Monthly Pro plan, and ₹750/year instead of ₹1000 for the Yearly Pro plan. This discount is exclusively for early supporters.",
  },
  {
    question: "When will LeetCoach be available and how will I be notified?",
    answer: "We're launching LeetCoach in Q1 2025. All waiting list members will receive priority access via email when we launch. You'll get installation instructions for the Chrome extension and immediate access to start building your Pattern Journal.",
  },
];

const FaqSection = () => {
  return (
    <section id="faq" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Everything you need to know about LeetCoach.
          </p>
        </div>

        <Accordion type="single" collapsible className="bg-white rounded-xl shadow-md">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
              <AccordionTrigger className="px-6 text-left font-medium text-gray-900 hover:text-leetcode-yellow">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-gray-700">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Still have questions? {" "}
            <a href="#" className="text-leetcode-yellow font-medium hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
