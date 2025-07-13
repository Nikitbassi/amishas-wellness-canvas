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
  return;
};
export default CountdownTimer;