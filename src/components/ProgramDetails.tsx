import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Star, Award } from "lucide-react";
interface ProgramDetailsProps {
  onBookConsultation: () => void;
}
const ProgramDetails = ({
  onBookConsultation
}: ProgramDetailsProps) => {
  const programs = [{
    duration: "1 Month",
    title: "Kickstart Program",
    description: "Perfect for trying our approach and seeing initial results",
    features: ["4 weekly personalized meal plans", "Weekly one-on-one consultations", "Daily support (8 hours)", "Recipe collection access", "Progress tracking"],
    popular: false
  }, {
    duration: "3 Months",
    title: "Transformation Program",
    description: "Most popular choice for sustainable lifestyle changes",
    features: ["12 weekly personalized meal plans", "Weekly one-on-one consultations", "Daily support (8 hours)", "Complete recipe collection", "Detailed progress tracking", "Habit formation guidance", "Emergency diet plans"],
    popular: true
  }, {
    duration: "6 Months",
    title: "Complete Wellness Program",
    description: "Comprehensive transformation with lasting results",
    features: ["24 weekly personalized meal plans", "Bi-weekly one-on-one consultations", "Daily support (8 hours)", "Complete recipe collection", "Advanced progress tracking", "Lifestyle integration coaching", "Maintenance phase planning", "Family meal planning"],
    popular: false
  }, {
    duration: "12 Months",
    title: "Lifetime Transformation",
    description: "Ultimate program for complete lifestyle overhaul",
    features: ["52 weekly personalized meal plans", "Bi-weekly consultations", "Daily support (8 hours)", "Premium recipe collection", "Comprehensive health tracking", "Advanced lifestyle coaching", "Long-term maintenance", "Family nutrition guidance", "Special occasion planning"],
    popular: false
  }];
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Choose Your Transformation Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the program that best fits your goals and timeline. All programs include personalized meal plans, one-on-one support, and our proven methodology.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card key={index} className={`relative border-2 ${program.popular ? 'border-green-500 shadow-lg scale-105' : 'border-gray-200'} hover:shadow-xl transition-all duration-300`}>
              {program.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">{program.duration}</div>
                <CardTitle className="text-xl mb-2">{program.title}</CardTitle>
                <p className="text-gray-600 text-sm">{program.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={onBookConsultation}
                  className={`w-full ${program.popular ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                >
                  Book Consultation
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProgramDetails;