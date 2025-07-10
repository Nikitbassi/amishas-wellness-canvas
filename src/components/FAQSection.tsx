
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I need to go to the gym or exercise extensively?",
      answer: "No gym required! Our approach focuses on nutrition and sustainable dietary changes. While light physical activity is beneficial for overall health, our meal plans are designed to help you achieve your goals through proper nutrition alone."
    },
    {
      question: "Will I have to give up my favorite foods completely?", 
      answer: "Absolutely not! Our philosophy is about adding nutritious foods rather than restricting everything you love. We believe some junk food can still fit into your weight loss journey when planned properly. We'll show you how to enjoy your favorites while still achieving your goals."
    },
    {
      question: "How quickly can I expect to see results?",
      answer: "Most clients start seeing visible changes within 2-3 weeks. Significant transformation typically occurs within a few weeks to 2 months, depending on your starting point and goals. We focus on sustainable, healthy weight loss of 1-2kg per week."
    },
    {
      question: "What if I have specific health conditions like diabetes or PCOD?",
      answer: "We specialize in managing health conditions through nutrition! Amisha has extensive experience in diabetes management and PCOD reversal. Your meal plans will be specifically designed to address your health conditions while achieving your weight goals."
    },
    {
      question: "How does the weekly support system work?",
      answer: "You'll receive 8 hours of daily support via chat/call from our dedicated team, plus weekly one-on-one consultations with Amisha. Your meal plans are updated every week based on your progress, feedback, and changing needs."
    },
    {
      question: "Are the recipes complicated or require special ingredients?",
      answer: "Not at all! All our recipes use common Indian ingredients that are easily available in your kitchen or local market. The recipes are designed to be simple, quick to prepare, and suitable for the whole family."
    },
    {
      question: "What if I'm very busy and don't have time for meal prep?",
      answer: "Our plans are specifically designed for busy professionals and homemakers. Most recipes take 15-30 minutes to prepare, and we provide meal prep strategies to save time. We also offer simple alternatives for extremely busy days."
    },
    {
      question: "Can I follow the plan if I'm vegetarian or have food allergies?",
      answer: "Absolutely! All meal plans are completely personalized based on your dietary preferences, allergies, and restrictions. Whether you're vegetarian, vegan, or have specific food allergies, we'll create a plan that works for you."
    },
    {
      question: "What happens after I complete my program?",
      answer: "We provide comprehensive maintenance guidance to help you sustain your results long-term. Longer programs include specific maintenance phase planning, and you'll have all the tools and knowledge needed to continue your healthy lifestyle independently."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "We're confident in our approach and have a 95% success rate. While we don't offer money-back guarantees, we do provide continuous support and plan adjustments to ensure you achieve your goals. Your success is our priority!"
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers! Here are the most common questions about our approach and programs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="mb-4 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader 
                className="cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <CardTitle className="flex justify-between items-center text-left">
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-green-600 flex-shrink-0" />
                  )}
                </CardTitle>
              </CardHeader>
              {openFAQ === index && (
                <CardContent className="pt-0">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our team is here to help! Book a free consultation to get all your questions answered personally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <span>📞</span>
                <span>Call us for instant answers</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <span>💬</span>
                <span>Free consultation available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
