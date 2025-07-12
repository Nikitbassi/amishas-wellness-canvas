
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Star, Clock, Users, Award, CheckCircle, Calendar, Phone, Mail } from "lucide-react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TransformationSlideshow from "@/components/TransformationSlideshow";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProcessSection from "@/components/ProcessSection";
import ProgramDetails from "@/components/ProgramDetails";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ConsultationForm from "@/components/ConsultationForm";
import CountdownTimer from "@/components/CountdownTimer";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBookConsultation = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header with Logo */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection onBookConsultation={handleBookConsultation} />
      
      {/* Transformation Slideshow */}
      <TransformationSlideshow />
      
      {/* Why Choose Us Section */}
      <WhyChooseUs onBookConsultation={handleBookConsultation} />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Program Details */}
      <ProgramDetails onBookConsultation={handleBookConsultation} />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Countdown Timer */}
      <CountdownTimer onBookConsultation={handleBookConsultation} />
      
      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of people who have already transformed their lives with Amisha's proven approach
          </p>
          <Button
            onClick={handleBookConsultation}
            className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book Your FREE Consultation Now
          </Button>
        </div>
      </section>

      {/* Consultation Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-600">
              Book Your FREE Consultation
            </DialogTitle>
          </DialogHeader>
          <ConsultationForm onClose={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
