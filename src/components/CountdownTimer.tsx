import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Star } from "lucide-react";
interface CountdownTimerProps {
  onBookConsultation: () => void;
}
const CountdownTimer = ({
  onBookConsultation
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let {
          hours,
          minutes,
          seconds
        } = prevTime;
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
        return {
          hours,
          minutes,
          seconds
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="py-16 bg-red-50 border-t-4 border-red-500">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-4">
            ⏰ Limited Time Offer!
          </h2>
          <p className="text-xl text-red-700 mb-8">
            Book your FREE consultation today - Only a few slots remaining this week!
          </p>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-center items-center space-x-8 text-center">
              <div className="bg-red-100 p-4 rounded-xl">
                <div className="text-3xl font-bold text-red-800">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-sm text-red-600">Hours</div>
              </div>
              <div className="text-2xl text-red-500">:</div>
              <div className="bg-red-100 p-4 rounded-xl">
                <div className="text-3xl font-bold text-red-800">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-sm text-red-600">Minutes</div>
              </div>
              <div className="text-2xl text-red-500">:</div>
              <div className="bg-red-100 p-4 rounded-xl">
                <div className="text-3xl font-bold text-red-800">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-sm text-red-600">Seconds</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 text-red-700 mb-8">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>FREE 30-minute consultation worth ₹2000</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5 text-red-500" />
              <span>Personalized diet plan discussion</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>No commitment required</span>
            </div>
          </div>
          
          <Button 
            onClick={onBookConsultation}
            className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Book Your FREE Slot Now!
          </Button>
          
          <p className="text-sm text-red-600 mt-4">
            *Offer valid for new clients only. Limited slots available.
          </p>
        </div>
      </div>
    </section>
  );
};
export default CountdownTimer;