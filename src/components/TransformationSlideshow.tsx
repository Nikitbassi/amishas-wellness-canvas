
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const transformations = [
  {
    id: 1,
    name: "Priya S.",
    beforeWeight: "78kg",
    afterWeight: "62kg",
    duration: "4 months",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    story: "Lost 16kg and reversed pre-diabetes with Amisha's home-based meal plans"
  },
  {
    id: 2,
    name: "Rahul M.",
    beforeWeight: "95kg",
    afterWeight: "75kg",
    duration: "6 months",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    story: "Transformed completely while managing a busy corporate schedule"
  },
  {
    id: 3,
    name: "Sneha K.",
    beforeWeight: "68kg",
    afterWeight: "55kg",
    duration: "3 months",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    story: "PCOD reversal and 13kg weight loss with sustainable diet changes"
  },
  {
    id: 4,
    name: "Amit P.",
    beforeWeight: "88kg",
    afterWeight: "72kg",
    duration: "5 months",
    beforeImage: "/placeholder.svg",
    afterImage: "/placeholder.svg",
    story: "Diabetes management and significant weight loss without giving up favorite foods"
  }
];

const TransformationSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % transformations.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? transformations.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real People, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our clients have transformed their lives with personalized diet plans
          </p>
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-blue-50 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="text-center">
                    <img
                      src={transformations[currentIndex].beforeImage}
                      alt="Before transformation"
                      className="w-32 h-40 object-cover rounded-2xl shadow-lg"
                    />
                    <p className="mt-2 font-semibold text-gray-700">Before</p>
                    <p className="text-red-600 font-bold">{transformations[currentIndex].beforeWeight}</p>
                  </div>
                  <div className="flex items-center">
                    <ChevronRight className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-center">
                    <img
                      src={transformations[currentIndex].afterImage}
                      alt="After transformation"
                      className="w-32 h-40 object-cover rounded-2xl shadow-lg"
                    />
                    <p className="mt-2 font-semibold text-gray-700">After</p>
                    <p className="text-green-600 font-bold">{transformations[currentIndex].afterWeight}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {transformations[currentIndex].name}
                </h3>
                <div className="flex space-x-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-600">Weight Lost</p>
                    <p className="text-lg font-bold text-green-600">
                      {parseInt(transformations[currentIndex].beforeWeight) - 
                       parseInt(transformations[currentIndex].afterWeight)}kg
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-lg font-bold text-blue-600">
                      {transformations[currentIndex].duration}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  "{transformations[currentIndex].story}"
                </p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            onClick={nextSlide}
            variant="outline"
            size="sm"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          
          <div className="flex justify-center mt-6 space-x-2">
            {transformations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransformationSlideshow;
