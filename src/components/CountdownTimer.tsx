
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Star } from "lucide-react";

interface CountdownTimerProps {
  onBookConsultation: () => void;
}

const CountdownTimer = ({ onBookConsultation }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer when it reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 p-4 rounded-full">
                <Clock className="w-12 h-12 text-red-600" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ⚡ Limited Time Offer ⚡
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              FREE Consultation + Personalized Diet Plan Assessment
            </p>
            
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-4">Offer Expires In:</h3>
              <div className="flex justify-center space-x-4 md:space-x-8">
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-sm font-medium">Hours</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white text-orange-600 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-sm font-medium">Minutes</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl md:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-sm font-medium">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">FREE Consultation</h4>
                <p className="text-sm text-gray-600">Worth ₹2,000</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Personalized Assessment</h4>
                <p className="text-sm text-gray-600">Worth ₹1,500</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Custom Diet Plan Preview</h4>
                <p className="text-sm text-gray-600">Worth ₹2,500</p>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-6">
              <strong>Total Value: ₹6,000</strong> - Yours FREE today!
            </p>
            
            <Button
              onClick={onBookConsultation}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xl px-12 py-4 rounded-full font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            >
              Claim Your FREE Consultation NOW!
            </Button>
            
            <p className="text-sm text-gray-600 mt-4">
              ⚠️ Only <strong>5 slots</strong> remaining this week
            </p>
            
            <div className="mt-8 p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
              <p className="text-yellow-800 font-medium">
                🔥 <strong>Exclusive Bonus:</strong> First 3 bookings today get a FREE recipe book with 100+ healthy Indian recipes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
