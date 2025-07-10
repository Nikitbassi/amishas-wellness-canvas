
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface ConsultationFormProps {
  onClose: () => void;
}

const ConsultationForm = ({ onClose }: ConsultationFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    phoneNumber: "",
    healthGoals: "",
    whyLoseWeight: "",
    healthConditions: [] as string[],
    pastAttempts: [] as string[],
    weightGainReason: "",
    busynessLevel: "",
    okayWithPaidPlan: ""
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const healthConditionOptions = [
    "Diabetes/Pre-diabetes",
    "PCOD/PCOS", 
    "Thyroid issues",
    "High blood pressure",
    "High cholesterol",
    "Heart disease",
    "Digestive issues",
    "Joint pain/Arthritis",
    "None of the above"
  ];

  const pastAttemptsOptions = [
    "Gym/Fitness center",
    "Crash diets",
    "Weight loss supplements",
    "Intermittent fasting",
    "Keto diet",
    "Other diet programs",
    "Personal trainer",
    "Nothing before"
  ];

  const timeSlots = [
    "Tomorrow 10:00 AM",
    "Tomorrow 2:00 PM", 
    "Tomorrow 4:00 PM",
    "Day after 10:00 AM",
    "Day after 11:00 AM",
    "Day after 2:00 PM",
    "Day after 4:00 PM",
    "This weekend 10:00 AM",
    "This weekend 11:00 AM"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleStep1Submit = () => {
    if (!formData.fullName || !formData.age || !formData.gender || !formData.city || !formData.phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(2);
  };

  const handleStep2Submit = () => {
    if (!formData.healthGoals || !formData.whyLoseWeight || !formData.weightGainReason || !formData.busynessLevel) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(3);
  };

  const handleStep3Submit = () => {
    if (!formData.okayWithPaidPlan) {
      toast.error("Please select whether you're okay with a paid plan");
      return;
    }
    
    if (formData.okayWithPaidPlan === "yes") {
      setShowCalendar(true);
    } else {
      // Redirect to WhatsApp group
      window.open("https://wa.me/+919876543210?text=Hi! I'm interested in free weight loss tips and joining your community group.", "_blank");
      toast.success("Redirecting to our WhatsApp community for free tips!");
      onClose();
    }
  };

  const handleBookingConfirm = () => {
    if (!selectedSlot) {
      toast.error("Please select a consultation time slot");
      return;
    }
    
    // Simulate booking confirmation
    toast.success("Consultation booked successfully! You'll receive confirmation via WhatsApp and SMS.");
    
    // Here you would typically send the data to your backend
    console.log("Booking confirmed:", { ...formData, selectedSlot });
    
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (showCalendar) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Consultation Time</h3>
          <p className="text-gray-600">Select your preferred time slot for your FREE consultation with Amisha</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-3">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelectedSlot(slot)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedSlot === slot
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        
        <Button
          onClick={handleBookingConfirm}
          disabled={!selectedSlot}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
        >
          Confirm Booking
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex justify-center space-x-4 mb-6">
        {[1, 2, 3].map((stepNum) => (
          <div
            key={stepNum}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= stepNum ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {stepNum}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter your age"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            
            <Button onClick={handleStep1Submit} className="w-full bg-green-600 hover:bg-green-700">
              Next Step
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Health & Lifestyle Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="healthGoals">What are your health goals? *</Label>
              <Textarea
                id="healthGoals"
                value={formData.healthGoals}
                onChange={(e) => handleInputChange('healthGoals', e.target.value)}
                placeholder="Describe your health and weight goals"
                rows={3}
              />
            </div>
            
            <div>
              <Label>Why do you want to lose weight? *</Label>
              <Select onValueChange={(value) => handleInputChange('whyLoseWeight', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your primary reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="health">Health reasons</SelectItem>
                  <SelectItem value="confidence">Boost confidence</SelectItem>
                  <SelectItem value="appearance">Improve appearance</SelectItem>
                  <SelectItem value="fitness">Better fitness</SelectItem>
                  <SelectItem value="medical">Medical advice</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Do you have any of the following health conditions?</Label>
              <div className="grid md:grid-cols-2 gap-2 mt-2">
                {healthConditionOptions.map((condition) => (
                  <div key={condition} className="flex items-center space-x-2">
                    <Checkbox
                      id={condition}
                      checked={formData.healthConditions.includes(condition)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('healthConditions', condition, checked as boolean)
                      }
                    />
                    <Label htmlFor={condition} className="text-sm">{condition}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Have you attempted any of the following in the past to lose weight?</Label>
              <div className="grid md:grid-cols-2 gap-2 mt-2">
                {pastAttemptsOptions.map((attempt) => (
                  <div key={attempt} className="flex items-center space-x-2">
                    <Checkbox
                      id={attempt}
                      checked={formData.pastAttempts.includes(attempt)}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange('pastAttempts', attempt, checked as boolean)
                      }
                    />
                    <Label htmlFor={attempt} className="text-sm">{attempt}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>What led to your weight gain? *</Label>
              <Select onValueChange={(value) => handleInputChange('weightGainReason', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lifestyle">Sedentary lifestyle</SelectItem>
                  <SelectItem value="eating">Poor eating habits</SelectItem>
                  <SelectItem value="stress">Stress/Emotional eating</SelectItem>
                  <SelectItem value="medical">Medical condition</SelectItem>
                  <SelectItem value="pregnancy">Post-pregnancy</SelectItem>
                  <SelectItem value="medication">Medication side effects</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>How busy are you on an average day? *</Label>
              <Select onValueChange={(value) => handleInputChange('busynessLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your busyness level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Not very busy - I have plenty of time</SelectItem>
                  <SelectItem value="moderate">Moderately busy - I have some free time</SelectItem>
                  <SelectItem value="high">Very busy - Limited free time</SelectItem>
                  <SelectItem value="extreme">Extremely busy - Almost no free time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                Previous
              </Button>
              <Button onClick={handleStep2Submit} className="flex-1 bg-green-600 hover:bg-green-700">
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-green-600">Program Interest</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">About Our Paid Programs</h3>
              <p className="text-gray-700 mb-4">
                Our personalized diet programs offer comprehensive support including:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Weekly customized meal plans</li>
                <li>✓ 8 hours daily support</li>
                <li>✓ Regular follow-ups with Amisha</li>
                <li>✓ Hundreds of home-based recipes</li>
                <li>✓ Holistic lifestyle guidance</li>
              </ul>
            </div>
            
            <div>
              <Label className="text-lg font-semibold">Are you okay with a paid plan for comprehensive transformation? *</Label>
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-green-50">
                  <input
                    type="radio"
                    id="paid-yes"
                    name="paidPlan"
                    value="yes"
                    onChange={(e) => handleInputChange('okayWithPaidPlan', e.target.value)}
                    className="text-green-600"
                  />
                  <Label htmlFor="paid-yes" className="flex-1 cursor-pointer">
                    <div className="font-medium">Yes, I'm interested in a personalized paid program</div>
                    <div className="text-sm text-gray-600">Book a consultation to discuss program options</div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-blue-50">
                  <input
                    type="radio"
                    id="paid-no"
                    name="paidPlan"
                    value="no"
                    onChange={(e) => handleInputChange('okayWithPaidPlan', e.target.value)}
                    className="text-blue-600"
                  />
                  <Label htmlFor="paid-no" className="flex-1 cursor-pointer">
                    <div className="font-medium">Not right now, but I'd like free tips</div>
                    <div className="text-sm text-gray-600">Join our WhatsApp community for free weight loss tips</div>
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                Previous
              </Button>
              <Button onClick={handleStep3Submit} className="flex-1 bg-green-600 hover:bg-green-700">
                {formData.okayWithPaidPlan === "yes" ? "Book Consultation" : "Join Community"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConsultationForm;
