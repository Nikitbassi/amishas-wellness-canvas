import { Card, CardContent } from "@/components/ui/card";
import { FileText, Calendar, TrendingUp, CheckCircle } from "lucide-react";

const ProcessSection = () => {
  const steps = [{
    number: "01",
    icon: FileText,
    title: "Initial Assessment & Personalized Plan",
    description: "Comprehensive nutritional and lifestyle assessment followed by a custom weekly diet plan tailored to your goals, preferences, and health conditions.",
    details: ["Detailed health history review", "Dietary preferences assessment", "Lifestyle and schedule analysis", "Personalized weekly meal plan creation"]
  }, {
    number: "02",
    icon: Calendar,
    title: "Weekly Customization & Dedicated Support",
    description: "Weekly plan adjustments based on your feedback and progress, alongside 8 hours of daily support to keep you motivated and on track.",
    details: ["Weekly plan reviews and updates", "8 hours daily support via chat/call", "Recipe modifications and alternatives", "Continuous motivation and guidance"]
  }, {
    number: "03",
    icon: TrendingUp,
    title: "Consistent Tracking & Lifestyle Integration",
    description: "Regular tracking of weight, body measurements, and lifestyle factors to ensure sustainable progress and long-term habit formation.",
    details: ["Weekly progress monitoring", "Body measurement tracking", "Habit formation support", "Long-term lifestyle integration"]
  }];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Proven 3-Step Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A systematic approach that has helped 1500+ people achieve sustainable health transformation
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      {/* Step Number & Icon */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                            <step.icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Details */}
                        <div className="grid md:grid-cols-2 gap-3">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center py-6">
                    <div className="w-px h-8 bg-gradient-to-b from-green-300 to-green-500"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Stats Section */}
        <div className="text-center mt-16 p-8 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Experience real transformation within just a few weeks with our proven process
          </p>
          <div className="grid grid-cols-3 divide-x divide-gray-200 max-w-md mx-auto">
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-green-600 mb-1">1500+</div>
              <div className="text-sm text-gray-600">Lives Transformed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">4.9★</div>
              <div className="text-sm text-gray-600">Google Rating</div>
            </div>
            <div className="text-center px-4">
              <div className="text-3xl font-bold text-purple-600 mb-1">5+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;