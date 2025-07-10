
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Star, Award } from "lucide-react";

interface ProgramDetailsProps {
  onBookConsultation: () => void;
}

const ProgramDetails = ({ onBookConsultation }: ProgramDetailsProps) => {
  const programs = [
    {
      duration: "1 Month",
      title: "Kickstart Program",
      description: "Perfect for trying our approach and seeing initial results",
      features: [
        "4 weekly personalized meal plans",
        "Weekly one-on-one consultations", 
        "Daily support (8 hours)",
        "Recipe collection access",
        "Progress tracking"
      ],
      popular: false
    },
    {
      duration: "3 Months", 
      title: "Transformation Program",
      description: "Most popular choice for sustainable lifestyle changes",
      features: [
        "12 weekly personalized meal plans",
        "Weekly one-on-one consultations",
        "Daily support (8 hours)",
        "Complete recipe collection",
        "Detailed progress tracking",
        "Habit formation guidance",
        "Emergency diet plans"
      ],
      popular: true
    },
    {
      duration: "6 Months",
      title: "Complete Wellness Program", 
      description: "Comprehensive transformation with lasting results",
      features: [
        "24 weekly personalized meal plans",
        "Bi-weekly one-on-one consultations",
        "Daily support (8 hours)",
        "Complete recipe collection",
        "Advanced progress tracking",
        "Lifestyle integration coaching",
        "Maintenance phase planning",
        "Family meal planning"
      ],
      popular: false
    },
    {
      duration: "12 Months",
      title: "Lifetime Transformation",
      description: "Ultimate program for complete lifestyle overhaul",
      features: [
        "52 weekly personalized meal plans",
        "Bi-weekly consultations",
        "Daily support (8 hours)",
        "Premium recipe collection",
        "Comprehensive health tracking",
        "Advanced lifestyle coaching",
        "Long-term maintenance",
        "Family nutrition guidance",
        "Special occasion planning"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Choose Your Transformation Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Flexible program durations designed to meet you where you are and take you where you want to go. 
            Experience real transformation within just a few weeks.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programs.map((program, index) => (
            <Card key={index} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${program.popular ? 'ring-2 ring-green-500' : ''}`}>
              {program.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {program.duration}
                </CardTitle>
                <h3 className="text-lg font-semibold text-green-600">
                  {program.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {program.description}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                What Makes Our Programs Different?
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-green-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Personalized Approach</h4>
                      <p className="text-gray-600 text-sm">Every meal plan is customized based on your preferences, health conditions, and lifestyle.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">No Gym Required</h4>
                      <p className="text-gray-600 text-sm">Achieve your goals with nutrition alone - perfect for busy professionals and homemakers.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-purple-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Home-Based Solutions</h4>
                      <p className="text-gray-600 text-sm">All recipes use common Indian ingredients available in your kitchen.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-orange-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Sustainable Results</h4>
                      <p className="text-gray-600 text-sm">Focus on lifestyle changes that last, not quick fixes that fail.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">Real Results</div>
                <p className="text-gray-700">Experience transformation within a few weeks, not months</p>
              </div>
              <Button
                onClick={onBookConsultation}
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Your Program Today
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramDetails;
