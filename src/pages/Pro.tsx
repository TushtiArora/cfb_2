
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Crown, Star, Users, MessageCircle, Zap, Shield, ArrowRight, CreditCard, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Silk from "@/components/Silk";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Pro = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    githubUsername: '',
    paymentMethod: 'card'
  });

  const plans = [
    {
      id: 'free',
      name: 'Basic (Free)',
      monthly: 0,
      quarterly: 0,
      description: 'Access projects, issues',
      features: [
        'Browse open source projects',
        'View good first issues',
        'Basic project search',
        'Community support'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Contributor',
      monthly: 199,
      quarterly: 499,
      description: 'Mentor access + Pro features',
      features: [
        'Unlimited access to verified mentors',
        'Early access to top "Good First Issues"',
        'Priority support from our AI PR assistant',
        'Access to mentor community',
        'Contribute faster, smarter, with real support'
      ],
      popular: true
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = async() => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to upgrade to Pro.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.githubUsername) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      toast({
        title: "Processing payment...",
        description: "Redirecting to Stripe...",
      });

      const response = await axios.post("https://payment-backend-9nf4.onrender.com/create-checkout-session", {
        name: formData.name,
        email: formData.email,
        githubUsername: formData.githubUsername,
        selectedPlan,
      });

      if (response.data.url) {
        window.open(response.data.url, "_blank"); // ✅ opens Stripe in a new tab
      } else {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "No URL returned from server",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: error.response?.data?.error || "An unexpected error occurred.",
        variant: "destructive"
      });
    }

    toast({
      title: "Payment processing",
      description: "Redirecting to secure payment gateway...",
    });

    /*setTimeout(() => {
      toast({
        title: "Welcome to openPR Pro! 🎉",
        description: "Your account has been upgraded successfully.",
      });
    }, 5000);*/
  };


  const selectedPlanData = plans.find(plan => plan.id === 'pro');
  const price = selectedPlan === 'monthly' ? selectedPlanData?.monthly : selectedPlanData?.quarterly;
  const period = selectedPlan === 'monthly' ? 'month' : 'quarter';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Silk />
      <Header />
      
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-4 py-2 text-sm font-medium">
              <Crown className="mr-2 w-4 h-4" />
              Upgrade to Pro
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
              Upgrade to openPR Pro
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get expert mentorship, issue guidance, and personalized PR support.
            </p>
            
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl border border-white/10 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                🎯 For just ₹{selectedPlan === 'monthly' ? '199/month' : '499/quarter'}:
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {selectedPlanData?.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            {/* Pricing Plans */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-6">🧮 Pricing Table</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {plans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`relative bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 ${
                      plan.popular ? 'ring-2 ring-purple-500/50' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-1">
                          <Star className="mr-1 w-3 h-3" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                      <CardDescription className="text-gray-300">{plan.description}</CardDescription>
                      
                      <div className="py-4">
                        <div className="text-4xl font-bold text-white">
                          ₹{plan.monthly}
                          <span className="text-lg text-gray-400">/month</span>
                        </div>
                        {plan.id === 'pro' && (
                          <div className="text-sm text-gray-400 mt-1">
                            or ₹{plan.quarterly}/quarter (save ₹{(plan.monthly * 3) - plan.quarterly})
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3 text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.id === 'pro' && (
                        <Button 
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          onClick={() => document.getElementById('payment-form')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          Choose Pro
                        </Button>
                      )}
                      
                      {plan.id === 'free' && (
                        <Button variant="outline" className="w-full border-gray-600 text-gray-400" disabled>
                          Current Plan
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="grid md:grid-cols-3 gap-4 text-center text-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Payments via UPI, Card, Netbanking
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Cancel anytime
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    2-day refund policy
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div>
              <Card id="payment-form" className="bg-white/5 backdrop-blur-sm border-white/10 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Secure Payment
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Complete your upgrade to openPR Pro
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email" className="text-white">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="github" className="text-white">GitHub Username *</Label>
                      <Input
                        id="github"
                        type="text"
                        placeholder="Your GitHub username"
                        value={formData.githubUsername}
                        onChange={(e) => handleInputChange('githubUsername', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                  
                  <Separator className="bg-white/20" />
                  
                  <div>
                    <Label className="text-white mb-3 block">Plan Selection</Label>
                    <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="text-white flex-1 cursor-pointer">
                          Monthly - ₹199/month
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10">
                        <RadioGroupItem value="quarterly" id="quarterly" />
                        <Label htmlFor="quarterly" className="text-white flex-1 cursor-pointer">
                          Quarterly - ₹499/quarter 
                          <Badge className="ml-2 bg-green-500/20 text-green-300 text-xs">Save ₹98</Badge>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator className="bg-white/20" />
                  
                  <div>
                    <Label className="text-white mb-3 block">Payment Method</Label>
                    <RadioGroup value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        <Label htmlFor="card" className="text-white flex-1 cursor-pointer">
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10">
                        <RadioGroupItem value="upi" id="upi" />
                        <Smartphone className="w-4 h-4 text-gray-400" />
                        <Label htmlFor="upi" className="text-white flex-1 cursor-pointer">
                          UPI
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex justify-between items-center text-white">
                      <span>Total Amount:</span>
                      <span className="text-2xl font-bold">₹{price}</span>
                    </div>
                    <div className="text-sm text-gray-400 mt-1">
                      Billed {period}ly • Cancel anytime
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-6"
                    onClick={handlePayment}
                  >
                    Start Your Journey → Pay Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <div className="text-xs text-gray-400 text-center">
                    Secured by industry-standard encryption. Your payment information is safe with us.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pro;
