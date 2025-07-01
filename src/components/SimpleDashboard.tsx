import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Link } from "react-router-dom";
import {
    User,
    FileText,
    Home,
    Users,
    Crown,
    Star,
    Search,
    Save,
    Edit3,
    Sparkles,
    ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FloatingShapes3D from "./FloatingShapes3D";

const SimpleDashboard = () => {
    const { user } = useAuth();
    const { data: profile } = useProfile();
    const { toast } = useToast();

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        username: profile?.username || '',
        full_name: profile?.full_name || '',
        bio: profile?.bio || '',
        skills: profile?.skills || [],
        github_url: profile?.github_url || '',
        linkedin_url: profile?.linkedin_url || ''
    });

    const [notes, setNotes] = useState('');
    const [savedNotes, setSavedNotes] = useState('Welcome to your personal notes section! Write anything you want here...');

    const handleSaveProfile = () => {
        // In a real implementation, this would save to the database
        setIsEditingProfile(false);
        toast({
            title: "Profile Updated!",
            description: "Your profile has been saved successfully.",
        });
    };

    const handleSaveNotes = () => {
        setSavedNotes(notes);
        setNotes('');
        toast({
            title: "Notes Saved!",
            description: "Your notes have been saved.",
        });
    };

    const quickLinks = [
        {
            title: "Landing Page",
            description: "Back to home",
            icon: Home,
            link: "/",
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: "Find Mentors",
            description: "Connect with experts",
            icon: Users,
            link: "/mentors",
            color: "from-purple-500 to-pink-400"
        },
        {
            title: "Go Pro",
            description: "Unlock premium features",
            icon: Crown,
            link: "/pro",
            color: "from-yellow-500 to-orange-400"
        },
        {
            title: "Fun Corner",
            description: "Rate & enjoy",
            icon: Star,
            link: "/#fun-corner",
            color: "from-green-500 to-emerald-400"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
            <FloatingShapes3D />

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                        Welcome Back!
                    </h1>
                    <p className="text-xl text-gray-300">
                        Hey {profile?.full_name || user?.email}, ready to contribute today?
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {quickLinks.map((link, index) => (
                        <Link key={index} to={link.link}>
                            <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group hover:scale-105">
                                <CardContent className="p-6 text-center">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${link.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <link.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">{link.title}</h3>
                                    <p className="text-gray-400 text-sm">{link.description}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Highlighted Explore Projects Button */}
                <div className="text-center mb-8">
                    <Link to="/explore">
                        <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse">
                            <Search className="mr-3 w-6 h-6" />
                            Explore Projects Now!
                            <ExternalLink className="ml-3 w-6 h-6" />
                        </Button>
                    </Link>
                    <p className="text-emerald-300 mt-2 font-medium">🚀 Find your next contribution opportunity</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Profile Update Section */}
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-10 h-10 rounded-full flex items-center justify-center">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                    <CardTitle className="text-white">Update Profile</CardTitle>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                                    className="border-purple-400 text-purple-300 hover:bg-purple-500/10"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    {isEditingProfile ? 'Cancel' : 'Edit'}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {isEditingProfile ? (
                                <>
                                    <div>
                                        <Label htmlFor="username" className="text-gray-300">Username</Label>
                                        <Input
                                            id="username"
                                            value={profileData.username}
                                            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="full_name" className="text-gray-300">Full Name</Label>
                                        <Input
                                            id="full_name"
                                            value={profileData.full_name}
                                            onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                                            className="bg-white/10 border-white/20 text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            className="bg-white/10 border-white/20 text-white"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>
                                    <Button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Profile
                                    </Button>
                                </>
                            ) : (
                                <div className="space-y-3">
                                    <div>
                                        <Label className="text-gray-400">Username</Label>
                                        <p className="text-white">{profileData.username || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-400">Full Name</Label>
                                        <p className="text-white">{profileData.full_name || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <Label className="text-gray-400">Bio</Label>
                                        <p className="text-gray-300">{profileData.bio || 'No bio added yet'}</p>
                                    </div>
                                    <Badge className="bg-purple-500">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        Profile {profileData.username && profileData.full_name ? 'Complete' : 'Incomplete'}
                                    </Badge>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Notes Section */}
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-10 h-10 rounded-full flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <CardTitle className="text-white">Your Notes</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Saved Notes Display */}
                            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <Label className="text-gray-400 text-sm">Saved Notes</Label>
                                <p className="text-gray-300 mt-2 whitespace-pre-wrap">{savedNotes}</p>
                            </div>

                            {/* New Note Input */}
                            <div>
                                <Label htmlFor="notes" className="text-gray-300">Add New Note</Label>
                                <Textarea
                                    id="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="bg-white/10 border-white/20 text-white mt-2"
                                    placeholder="Write your thoughts, ideas, or reminders..."
                                    rows={4}
                                />
                            </div>

                            <Button
                                onClick={handleSaveNotes}
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                                disabled={!notes.trim()}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Note
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default SimpleDashboard;

