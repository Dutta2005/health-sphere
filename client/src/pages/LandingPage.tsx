import {
  Users, Droplet, Heart, Bell, Shield, 
  Activity, Calendar, ArrowRight, ChevronRight
} from "lucide-react";
import { Card } from "../components/ui/card";
import { NumberTicker } from "../components/ui/number-ticker";
import { Link } from "react-router";
import { BorderBeam } from "../components/ui/border-beam";
import PostCard from "../components/discussion/PostCard";
import { Marquee } from "../components/ui/marquee";

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary opacity-10 blur-[100px] animate-pulse" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent opacity-10 blur-[100px] animate-pulse delay-1000" />
    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary opacity-5 blur-[120px] animate-pulse delay-500" />
  </div>
);

function LandingPage() {
  const stats = [
    { icon: Droplet, label: "Donations Made", value: 2500, suffix: "+", color: "primary" },
    { icon: Users, label: "Active Donors", value: 500, suffix: "+", color: "secondary" },
    { icon: Heart, label: "Lives Saved", value: 1800, suffix: "+", color: "accent" },
    { icon: Calendar, label: "Monthly Requests", value: 300, suffix: "+", color: "primary" },
  ];

  const features = [
    {
      icon: Bell,
      title: "Quick Response",
      description: "Get notified instantly through realtime alerts and emails when your blood type is needed",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your information is protected and only shared with verified hospitals",
    },
    {
      icon: Activity,
      title: "Real-time Updates",
      description: "Track your donation's journey and see the impact you're making in real-time",
    },
  ];

  const discussionPosts1 = [
    {
      _id: "1",
      title: "Need help with fever symptoms",
      content: "I've had a fever for two days. Should I see a doctor or wait it out?",
      author: { name: "Amit" },
      createdAt: "2025-01-30T10:15:00Z",
      tags: ["help"],
    },
    {
      _id: "3",
      title: "Is intermittent fasting safe?",
      content: "I've been thinking about trying intermittent fasting. Is it safe for everyone?",
      author: { name: "Rahul" },
      createdAt: "2025-01-28T12:30:00Z",
      tags: ["question"],
    },
    {
      _id: "4",
      title: "Trouble sleeping at night",
      content: "Lately, I’ve been struggling with sleep. Any tips for better sleep?",
      author: { name: "Anonymous" },
      createdAt: "2025-01-24T22:30:00Z",
      tags: ["help"],
    },
  ];

  const discussionPosts2 = [{
    _id: "5",
    title: "Hydration tips for summer",
    content: "It's getting hotter, and I want to stay hydrated. Any tips?",
    author: { name: "Sneha" },
    createdAt: "2025-01-27T09:20:00Z",
    tags: ["discussion"],
  },
  {
    _id: "7",
    title: "How to reduce sugar cravings?",
    content: "I struggle with sugar cravings. Any natural ways to reduce them?",
    author: { name: "eera" },
    createdAt: "2025-01-25T20:55:00Z",
    tags: ["advice"],
  },]
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white dark:from-dark-bg dark:to-dark-bg/95 dark:text-dark-text -mt-16 pb-10">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] md:min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <HeroBackground />
        <div className="relative space-y-12 max-w-4xl mx-auto">
          <div className="space-y-6 mt-16 md:mt-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
              <span className="text-sm font-medium text-primary animate-pulse">✨ Welcome to the future of healthcare</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
                Health Sphere
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto leading-relaxed">
              Find symptoms, request blood, join discussions, and support health campaigns—all in one place.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/signup"
              className="group flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group flex items-center gap-2 bg-white dark:bg-dark-bg border-2 border-primary/20 hover:border-primary text-primary dark:text-white rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Sign In
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-8 space-y-4 pb-10">
            <p className="text-lg text-light-text/70 dark:text-dark-text/70">Are you an organization?</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-gray-900 dark:text-white rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Be a Part of This Movement</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <BorderBeam />
            </Link>
          </div>
        </div>
      </section>

      {/* BloodBridge Section */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white space-y-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
              <span className="text-sm font-medium">BloodBridge Network</span>
            </span>
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">BloodBridge</h2>
            <p className="text-xl font-light leading-relaxed">
              Every drop counts. Join our network of donors and be notified when your blood type is needed in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value, suffix, color }) => (
            <Card 
              key={label}
              className="p-8 border-0 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="text-center space-y-4">
                <div className={`inline-flex p-4 rounded-full bg-${color}/10`}>
                  <Icon className={`w-8 h-8 text-${color}`} />
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold flex justify-center items-baseline">
                    <NumberTicker value={value} />
                    <span className="text-2xl ml-1">{suffix}</span>
                  </div>
                  <p className="text-light-text/70 dark:text-dark-text/70">{label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 bg-gradient-to-br from-white to-light-bg dark:from-dark-bg dark:to-dark-bg/50"
            >
              <div className="space-y-6">
                <div className="inline-flex p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-light-text/70 dark:text-dark-text/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Discussions Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold">Chit Chat</h2>
            <p className="text-xl text-light-text/70 dark:text-dark-text/70">
              Join the conversation and connect with others
            </p>
          </div>
          <div className="relative  md:mx-12 lg:mx-20">
            <Marquee className="py-4">
              {discussionPosts1.map((post) => (
                <div key={post._id} className="mx-4">
                  <PostCard post={post} />
                </div>
              ))}
            </Marquee>
            <Marquee reverse className="py-4">
              {discussionPosts2.map((post) => (
                <div key={post._id} className="mx-4">
                  <PostCard post={post} />
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;