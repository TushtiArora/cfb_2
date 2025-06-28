
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Star, Users, MessageCircle, Github, Calendar, MapPin, CheckCircle, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Silk from "@/components/Silk";
import { useAuth } from "@/contexts/AuthContext";

const Mentors = () => {
  const { user } = useAuth();
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Mock mentor data
  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior Full Stack Developer",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b95aa37f?w=150&h=150&fit=crop&crop=face",
      expertise: ["React", "Node.js", "Python", "DevOps"],
      experience: "8 years",
      location: "San Francisco, CA",
      bio: "Passionate about helping new developers navigate their first open source contributions. I specialize in web technologies and love mentoring junior developers.",
      contributions: 1200,
      mentees: 45,
      rating: 4.9
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      title: "Principal Engineer",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      expertise: ["C#", ".NET", "Azure", "Microservices"],
      experience: "12 years",
      location: "Seattle, WA",
      bio: "I believe in learning by doing. I help contributors understand not just the 'how' but the 'why' behind good code practices.",
      contributions: 2100,
      mentees: 78,
      rating: 4.8
    },
    {
      id: 3,
      name: "Maya Patel",
      title: "ML Engineer",
      company: "OpenAI",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      expertise: ["Python", "TensorFlow", "PyTorch", "Data Science"],
      experience: "6 years",
      location: "New York, NY",
      bio: "Making AI accessible through open source. I help contributors get started with machine learning projects and data science workflows.",
      contributions: 890,
      mentees: 32,
      rating: 4.9
    },
    {
      id: 4,
      name: "David Kim",
      title: "DevOps Architect",
      company: "Amazon",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      expertise: ["AWS", "Kubernetes", "Docker", "CI/CD"],
      experience: "10 years",
      location: "Austin, TX",
      bio: "Infrastructure and deployment expert. I guide contributors through the complexities of modern DevOps practices and cloud architecture.",
      contributions: 1500,
      mentees: 56,
      rating: 4.7
    }
  ];

  const ProUpgradeDialog = ({ mentor, children }) => (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-purple-500/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Crown className="w-6 h-6 text-yellow-400" />
            Upgrade to openPR Pro
          </DialogTitle>
          <DialogDescription className="text-gray-300 pt-4">
            This feature is available for openPR Pro members. Upgrade now to get personalized help from experienced mentors.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-500/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              What you'll get:
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Unlimited access to verified mentors
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Priority support on issues
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Join exclusive contributor chat
              </li>
            </ul>
          </div>
          <Link to="/pro">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Become Pro
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <Silk />
      <Header />
      
      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Meet Our Mentors
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Connect with experienced developers who are passionate about helping you grow in open source.
            </p>
          </div>

          {/* Need Help Section */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl border border-white/10 p-8 mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4 text-white">🔍 Need Help from a Mentor?</h2>
              <p className="text-lg text-gray-300 mb-6">
                Get personal support from verified mentors on openPR. Our mentors are here to guide you, answer your doubts, and review your PRs — at your pace.
              </p>
              
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">To connect with a mentor, you'll need openPR Pro.</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      ✅ One-time activation
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      ✅ Unlimited mentor requests
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      ✅ Priority support on issues
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      ✅ Join exclusive contributor chat
                    </div>
                  </div>
                </div>
              </div>
              
              <Link to="/pro">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full">
                  Get Pro
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mentors.map((mentor) => (
              <Card key={mentor.id} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-white text-xl">{mentor.name}</CardTitle>
                  <CardDescription className="text-purple-300 font-medium">
                    {mentor.title}
                  </CardDescription>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {mentor.company}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {mentor.expertise.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                        {skill}
                      </Badge>
                    ))}
                    {mentor.expertise.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-500/20 text-gray-400">
                        +{mentor.expertise.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <div className="text-white font-semibold">{mentor.contributions}</div>
                      <div className="text-gray-400">Contributions</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{mentor.mentees}</div>
                      <div className="text-gray-400">Mentees</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold flex items-center justify-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        {mentor.rating}
                      </div>
                      <div className="text-gray-400">Rating</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {mentor.bio}
                  </p>
                  
                  <ProUpgradeDialog mentor={mentor}>
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Contact Mentor
                    </Button>
                  </ProUpgradeDialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Mentors;
