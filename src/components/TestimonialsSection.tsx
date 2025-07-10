
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 32,
    location: "Mumbai",
    condition: "Pre-diabetes & Weight Loss",
    rating: 5,
    weightLoss: "16kg in 4 months",
    text: "Amisha completely changed my relationship with food. I lost 16kg and my pre-diabetes is now completely under control. The best part? I never felt like I was on a 'diet'. Her plans were so easy to follow and delicious!",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Rahul Mehta", 
    age: 28,
    location: "Delhi",
    condition: "Weight Loss & Fitness",
    rating: 5,
    weightLoss: "20kg in 6 months",
    text: "Being in corporate, I thought healthy eating was impossible with my schedule. Amisha proved me wrong! Lost 20kg without stepping into a gym. Her 8-hour support system kept me motivated throughout.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Sneha Patel",
    age: 26,
    location: "Bangalore", 
    condition: "PCOD Reversal",
    rating: 5,
    weightLoss: "13kg in 3 months",
    text: "My PCOD symptoms completely disappeared! Amisha's holistic approach didn't just help me lose 13kg, but also regulated my hormones naturally. I feel like a completely new person.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Amit Kumar",
    age: 45,
    location: "Pune",
    condition: "Diabetes Management",
    rating: 5,
    weightLoss: "18kg in 5 months", 
    text: "At 45, I thought it was too late to change. Amisha's program not only helped me lose 18kg but also brought my diabetes under perfect control. My doctor is amazed at the results!",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Kavya Reddy",
    age: 29,
    location: "Hyderabad",
    condition: "Post-pregnancy Weight Loss",
    rating: 5,
    weightLoss: "22kg in 7 months",
    text: "After my pregnancy, I struggled to lose weight. Amisha's personalized plans fit perfectly with my new mom schedule. Lost 22kg while still enjoying my favorite foods. Highly recommend!",
    image: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Rohan Singh",
    age: 35,
    location: "Chennai",
    condition: "Weight Loss & Energy",
    rating: 5,
    weightLoss: "15kg in 4 months",
    text: "The weekly check-ins and constant support made all the difference. Lost 15kg and my energy levels are through the roof. Amisha's approach is sustainable and actually enjoyable!",
    image: "/placeholder.svg"
  }
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % (testimonials.length - visibleCount + 1)
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [visibleCount]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (testimonials.length - visibleCount + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - visibleCount : prevIndex - 1
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people who transformed their lives with our personalized approach
          </p>
          <div className="flex justify-center items-center mt-6 space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-600">(200+ reviews)</span>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className={`grid ${visibleCount === 1 ? 'grid-cols-1' : visibleCount === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`}>
            {visibleTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-600">{testimonial.age} years, {testimonial.location}</p>
                      <p className="text-xs text-green-600 font-medium">{testimonial.condition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex mr-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      {testimonial.weightLoss}
                    </span>
                  </div>
                  
                  <div className="relative">
                    <Quote className="w-8 h-8 text-green-200 absolute -top-2 -left-2" />
                    <p className="text-gray-700 italic leading-relaxed pl-6">
                      {testimonial.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline" 
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: testimonials.length - visibleCount + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Join hundreds of satisfied clients who have transformed their lives with our proven approach
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <div className="text-sm text-gray-600">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
