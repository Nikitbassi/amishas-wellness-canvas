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
  return;
};
export default ProgramDetails;