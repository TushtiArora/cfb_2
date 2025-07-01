import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Sparkles, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProjectMatch {
    project_name: string;
    link: string;
    match_score: number;
    reasons: string[];
    learning_resources: {
        title: string;
        link: string;
    }[];
}

interface ChatMessage {
    id: string;
    type: 'user' | 'bot' | 'form';
    content: string;
    timestamp: Date;
    matches?: ProjectMatch[];
}

const ProjectMatchingChatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            type: 'bot',
            content: "Hi! I'm your AI project matching assistant. I'll help you find open-source projects that match your skills and interests. Let's start by gathering some information about you!",
            timestamp: new Date()
        }
    ]);
    const [currentInput, setCurrentInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({
        name: '',
        experience_level: '',
        tech_stack: [] as string[],
        interests: [] as string[],
        github_profile: '',
        learning_goals: [] as string[],
        time_commitment_per_week: ''
    });
    const [currentStep, setCurrentStep] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const steps = [
        { field: 'name', question: "What's your name?" },
        { field: 'experience_level', question: "What's your experience level? (Beginner/Intermediate/Advanced)" },
        { field: 'tech_stack', question: "What technologies do you know? (e.g., Python, React, Node.js - separate with commas)" },
        { field: 'interests', question: "What domains interest you? (e.g., AI, Web Dev, Blockchain - separate with commas)" },
        { field: 'github_profile', question: "What's your GitHub profile URL? (optional)" },
        { field: 'learning_goals', question: "What would you like to learn? (separate with commas)" },
        { field: 'time_commitment_per_week', question: "How many hours per week can you commit?" }
    ];

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const addMessage = (type: 'user' | 'bot', content: string, matches?: ProjectMatch[]) => {
        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: new Date(),
            matches
        };
        setMessages(prev => [...prev, newMessage]);
    };

    const handleSendMessage = async () => {
        if (!currentInput.trim()) return;

        const userMessage = currentInput.trim();
        addMessage('user', userMessage);
        setCurrentInput('');

        if (currentStep < steps.length) {
            // Update user profile based on current step
            const currentField = steps[currentStep].field;

            if (currentField === 'tech_stack' || currentField === 'interests' || currentField === 'learning_goals') {
                setUserProfile(prev => ({
                    ...prev,
                    [currentField]: userMessage.split(',').map(item => item.trim())
                }));
            } else {
                setUserProfile(prev => ({
                    ...prev,
                    [currentField]: userMessage
                }));
            }

            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);

            // Ask next question or generate matches
            if (nextStep < steps.length) {
                setTimeout(() => {
                    addMessage('bot', steps[nextStep].question);
                }, 500);
            } else {
                // All information collected, generate matches
                setTimeout(() => {
                    generateProjectMatches();
                }, 500);
            }
        } else {
            // Handle general conversation after profile is complete
            handleGeneralChat(userMessage);
        }
    };

    const generateProjectMatches = async () => {
        setIsLoading(true);
        addMessage('bot', "Perfect! Let me analyze your profile and find the best project matches for you... 🔍");

        try {
            // Simulate AI matching (in real implementation, this would call your AI service)
            await new Promise(resolve => setTimeout(resolve, 2000));

            const mockMatches: ProjectMatch[] = [
                {
                    project_name: "AI Chat Assistant",
                    link: "https://github.com/example/ai-chat-assistant",
                    match_score: 95,
                    reasons: [
                        `Great match for ${userProfile.experience_level} level`,
                        `Uses technologies from your stack: ${userProfile.tech_stack.slice(0, 2).join(', ')}`,
                        "Active community with mentorship available",
                        "Aligns with your AI interests"
                    ],
                    learning_resources: [
                        {
                            title: "Building AI Chat Applications",
                            link: "https://example.com/ai-chat-tutorial"
                        },
                        {
                            title: "OpenAI API Integration Guide",
                            link: "https://example.com/openai-guide"
                        }
                    ]
                },
                {
                    project_name: "Open Source Learning Platform",
                    link: "https://github.com/example/learning-platform",
                    match_score: 88,
                    reasons: [
                        "Perfect for your learning goals",
                        "Good first issues available",
                        "Matches your time commitment",
                        "Educational domain aligns with interests"
                    ],
                    learning_resources: [
                        {
                            title: "Contributing to Educational Projects",
                            link: "https://example.com/edu-contrib"
                        }
                    ]
                }
            ];

            addMessage('bot', `Great news! I found ${mockMatches.length} projects that match your profile perfectly. Here are my top recommendations:`, mockMatches);

            toast({
                title: "Projects Found!",
                description: `Found ${mockMatches.length} matching projects for you.`,
            });
        } catch (error) {
            addMessage('bot', "I encountered an issue while finding matches. Please try again or contact support.");
            toast({
                title: "Error",
                description: "Failed to generate project matches. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGeneralChat = async (message: string) => {
        setIsLoading(true);

        try {
            // Simulate AI response
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (message.toLowerCase().includes('more projects') || message.toLowerCase().includes('other projects')) {
                addMessage('bot', "I can help you find more projects! Would you like me to search for projects in a specific technology or domain?");
            } else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('guidance')) {
                addMessage('bot', "I'm here to help! You can ask me to:\n• Find more project matches\n• Explain why a project is a good fit\n• Suggest learning resources\n• Update your profile information");
            } else {
                addMessage('bot', "Thanks for your message! If you'd like to find more projects or need help with anything else, just let me know. I'm here to help you succeed in open source!");
            }
        } catch (error) {
            addMessage('bot', "Sorry, I couldn't process your message right now. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            {!isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    size="lg"
                >
                    <MessageCircle className="h-6 w-6" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">AI Project Matcher</CardTitle>
                                    <p className="text-xs text-purple-100">Find your perfect open source project</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsOpen(false)}
                                className="text-white hover:bg-white/20 h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="flex flex-col h-[calc(600px-120px)]">
                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto space-y-4 py-4">
                            {messages.map((message) => (
                                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-lg ${message.type === 'user'
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                        <div className="flex items-start gap-2">
                                            {message.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                            {message.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                                            <div className="flex-1">
                                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                                                {/* Project Matches */}
                                                {message.matches && (
                                                    <div className="mt-4 space-y-3">
                                                        {message.matches.map((match, index) => (
                                                            <div key={index} className="bg-white/10 rounded-lg p-3 border border-white/20">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <h4 className="font-semibold text-white">{match.project_name}</h4>
                                                                    <Badge className="bg-emerald-500 text-white">
                                                                        {match.match_score}% match
                                                                    </Badge>
                                                                </div>

                                                                <div className="space-y-2">
                                                                    <div>
                                                                        <p className="text-xs text-purple-100 mb-1">Why it's a good fit:</p>
                                                                        <ul className="text-xs space-y-1">
                                                                            {match.reasons.slice(0, 2).map((reason, i) => (
                                                                                <li key={i} className="flex items-start gap-1">
                                                                                    <Sparkles className="h-3 w-3 text-yellow-300 mt-0.5 flex-shrink-0" />
                                                                                    {reason}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>

                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="border-white/40 text-white hover:bg-white/20 text-xs h-7"
                                                                            onClick={() => window.open(match.link, '_blank')}
                                                                        >
                                                                            <ExternalLink className="h-3 w-3 mr-1" />
                                                                            View Project
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <Bot className="h-4 w-4" />
                                            <p className="text-sm">Thinking...</p>
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="border-t pt-4">
                            <div className="flex gap-2">
                                <Input
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!currentInput.trim() || isLoading}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default ProjectMatchingChatbot;