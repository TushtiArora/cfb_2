
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Users, Code, Award, Zap, Github, MessageCircle, Heart, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Silk from "@/components/Silk";
import ProjectMatchingChatbot from "@/components/ProjectMatchingChatbot";
import { useAuth } from "@/contexts/AuthContext";
import FingerRating from "@/components/dashboards/FingerRating";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const { user } = useAuth();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Matching",
      description: "Get personalized project recommendations based on your skills, interests, and experience level.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-Time Mentorship",
      description: "Connect with experienced contributors for guidance, code reviews, and pair programming sessions.",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Achievement System",
      description: "Earn badges, track your progress, and celebrate every contribution with our gamified experience.",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Smart Issue Tracking",
      description: "Auto-generated templates, difficulty labels, and smart filtering make finding good first issues effortless.",
      color: "from-orange-500 to-red-400"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Contributors" },
    { number: "500+", label: "Open Source Projects" },
    { number: "25K+", label: "Issues Resolved" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Silk />
      <Header />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-4 py-2 text-sm font-medium">
              🚀 Now in Public Beta
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Open Source.
              <br />
              Open Community.
              <br />
              <span className="text-4xl md:text-6xl">Open Opportunities.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              OpenPR transforms open source contribution from intimidating to inspiring through 
              AI-powered project matching, real-time mentorship, and community-driven collaboration tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-xl">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-xl">
                    Start Contributing
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <a href="https://github.com/Pasta-coder/cfb_2" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-400 text-purple-300 hover:bg-purple-500/10 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
                >
                  <Github className="mr-2 w-5 h-5" />
                  View on GitHub
                </Button>
              </a>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Why Choose OpenPR?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We've reimagined open source collaboration from the ground up, combining the best of GitHub with the community spirit of hackathons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group hover:scale-105"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Become a Mentor Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent text-center">
                💡 Become a Mentor on openPR
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed text-center max-w-2xl mx-auto">
                Help new contributors grow. Guide, review, and support them — all while growing your own open-source impact.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-2xl font-semibold text-white mb-4">🛠 You'll:</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      Review PRs
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      Clarify issues
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      Offer guidance via chat
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      Share your wisdom with new developers
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <blockquote className="text-lg italic text-gray-300 mb-4">
                    💬 "Mentorship should be about connection, not complexity. That's what we believe at openPR."
                  </blockquote>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/mentors">
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 text-lg">
                    Become a Mentor
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Fun Zone
              </h3>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Let's rate openPR in a fun way!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
               
             

                  {!showRating ? (
                    // Centered button BEFORE webcam opens
                    <div className="flex items-center justify-center h-full">
                      <Link to="/review">
                          <Button
                            onClick={() => setShowRating(true)}
                            className="bg-discord-purple hover:bg-discord-purple/80 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                          >
                            Click to Play
                          </Button>
                      </Link>
                      
                    </div>
                  ) : (
                    // Webcam section AFTER clicking "Click to Play"
                    <div className="flex flex-col items-center space-y-6">
                      <FingerRating />
                      <button
                        onClick={() => setShowRating(false)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Close
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
        {/* Community Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Join Our Thriving Community
              </h3>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Connect with thousands of contributors, maintainers, and mentors who are passionate about making open source accessible for everyone.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-discord-purple hover:bg-discord-purple/80 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300">
                  Join Discord Community
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Ready to Make Your Mark?
            </h3>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Whether you're writing your first line of code or leading major projects, OpenPR has a place for you.
            </p>
            
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl">
                  Go to Dashboard
                  <Star className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl">
                  Get Started Today
                  <Star className="ml-3 w-6 h-6" />
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer />
      {/* AI Project Matching Chatbot */}
      <ProjectMatchingChatbot />

      
    </div>
  );
};

export default Index;
