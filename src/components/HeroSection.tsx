
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Award } from "lucide-react";

interface HeroSectionProps {
  onBookConsultation: () => void;
}

const HeroSection = ({ onBookConsultation }: HeroSectionProps) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-green-50"></div>
      <div className="relative container mx-auto px-4">
        {/* Logo Header */}
        <div className="text-center mb-12">
          <img 
            src="/lovable-uploads/88e2e452-fb35-4bd3-a33f-b6c1ba158cc3.png" 
            alt="Diet with Amisha" 
            className="h-16 md:h-20 mx-auto mb-4"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                <Star className="w-4 h-4 mr-1" />
                4.9★ Google Rating
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                <Users className="w-4 h-4 mr-1" />
                500+ Lives Transformed
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                <Award className="w-4 h-4 mr-1" />
                5+ Years Experience
              </Badge>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Health with 
              <span className="text-green-600"> Sustainable </span>
              Diet Plans
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              Lose weight, reverse diabetes & PCOD with <strong>personalized home-based diet plans</strong>. 
              No gym required. No extreme restrictions. Just real food, real results.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">Customized weekly meal plans that fit your lifestyle</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">8 hours daily support + weekly follow-ups</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
                <span className="text-gray-700">Hundreds of delicious home-based recipes</span>
              </div>
            </div>
            
            <div className="pt-6">
              <Button onClick={onBookConsultation} className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Book Your FREE Consultation
              </Button>
              <p className="text-sm text-gray-600 mt-3">
                ⏰ Limited slots available this week
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <img src="/placeholder.svg" alt="Dietitian Amisha" className="w-full h-96 object-cover rounded-2xl" />
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <Award className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-400 rounded-3xl transform rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
