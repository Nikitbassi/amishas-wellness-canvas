
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, TrendingUp, ArrowRight } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Initial Assessment & Personalized Plan",
      description: "Comprehensive nutritional and lifestyle assessment followed by a custom weekly diet plan tailored to your goals, preferences, and health conditions.",
      details: [
        "Detailed health history review",
        "Dietary preferences assessment", 
        "Lifestyle and schedule analysis",
        "Personalized weekly meal plan creation"
      ]
    },
    {
      number: "02", 
      icon: Calendar,
      title: "Weekly Customization & Dedicated Support",
      description: "Weekly plan adjustments based on your feedback and progress, alongside 8 hours of daily support to keep you motivated and on track.",
      details: [
        "Weekly plan reviews and updates",
        "8 hours daily support via chat/call",
        "Recipe modifications and alternatives",
        "Continuous motivation and guidance"
      ]
    },
    {
      number: "03",
      icon: TrendingUp,
      title: "Consistent Tracking & Lifestyle Integration",
      description: "Regular tracking of weight, body measurements, and lifestyle factors to ensure sustainable progress and long-term habit formation.",
      details: [
        "Weekly progress monitoring",
        "Body measurement tracking",
        "Habit formation support",
        "Long-term lifestyle integration"
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Proven 3-Step Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A systematic approach that has helped 500+ people achieve sustainable health transformation
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-4xl font-bold text-gray-300">
                          {step.number}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-3">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} relative`}>
                  <div className="relative z-10">
                    <img
                      src="/placeholder.svg"
                      alt={`Step ${step.number}`}
                      className="w-full h-80 object-cover rounded-3xl shadow-lg"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-3xl transform rotate-3"></div>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center mb-8">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Experience real transformation within just a few weeks with our proven process
          </p>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-sm text-gray-600">Lives Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.9★</div>
              <div className="text-sm text-gray-600">Google Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
