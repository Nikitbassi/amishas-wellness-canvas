
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Users, Heart, BookOpen, Brain, Award, Calendar } from "lucide-react";

interface WhyChooseUsProps {
  onBookConsultation: () => void;
}

const WhyChooseUs = ({ onBookConsultation }: WhyChooseUsProps) => {
  const features = [
    {
      icon: Award,
      title: "5+ Years of Proven Success",
      description: "Transformed 500+ lives with sustainable, science-backed approaches to weight loss and health management."
    },
    {
      icon: Heart,
      title: "Specialized Expertise",
      description: "Expert in weight loss, diabetes management, and PCOD reversal through personalized home-based nutrition plans."
    },
    {
      icon: Users,
      title: "Unique Food-First Philosophy",
      description: "Focus on ADDING nutritious foods rather than restriction. Yes, some junk food can still fit in your weight loss journey!"
    },
    {
      icon: Calendar,
      title: "Weekly Personalized Plans",
      description: "Custom meal plans updated every week based on your progress, preferences, and lifestyle changes."
    },
    {
      icon: Clock,
      title: "8 Hours Daily Support",
      description: "Dedicated support team available 8 hours daily plus weekly one-on-one follow-ups with Amisha."
    },
    {
      icon: BookOpen,
      title: "Hundreds of Home Recipes",
      description: "Extensive collection of delicious, easy-to-make recipes using ingredients available in your kitchen."
    },
    {
      icon: Brain,
      title: "Holistic Mindset Approach",
      description: "Address physical, emotional, and mental aspects of health transformation for lasting lifestyle changes."
    },
    {
      icon: Star,
      title: "4.9★ Google Rating",
      description: "Consistently rated as the top choice by our clients for sustainable health transformation and results."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose Amisha's Diet Clinic?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our proven approach that focuses on sustainable lifestyle changes, 
            not quick fixes. Here's what makes us different:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Meet Dietitian Amisha
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  With over <strong>5 years of dedicated experience</strong> and <strong>500+ successful transformations</strong>, 
                  Amisha specializes in creating sustainable, home-based nutrition plans that work with your real life.
                </p>
                <p>
                  Her unique approach focuses on <strong>adding nutritious foods</strong> rather than restrictive dieting, 
                  helping clients achieve lasting results while still enjoying the foods they love.
                </p>
                <p>
                  Amisha's holistic methodology addresses not just physical health, but also the emotional and 
                  mental aspects of transformation, ensuring long-term success and lifestyle integration.
                </p>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                <p className="text-green-800 font-semibold">
                  "My mission is to help you create a healthy relationship with food while achieving your dream body and optimal health."
                </p>
                <p className="text-green-600 text-sm mt-2">- Dietitian Amisha</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg"
                alt="Dietitian Amisha with clients"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-gray-900">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">Google Rating</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={onBookConsultation}
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Transformation Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
