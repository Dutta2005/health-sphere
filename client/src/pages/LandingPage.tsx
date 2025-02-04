import {
  Users,
  Droplet,
  Heart,
  Bell,
  Shield,
  Activity,
  Calendar,
  ArrowRight,
  ChevronRight,
  MapPin,
  Info,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { NumberTicker } from "../components/ui/number-ticker";
import { Link } from "react-router";
import { BorderBeam } from "../components/ui/border-beam";
import PostCard from "../components/discussion/PostCard";
import { Marquee } from "../components/ui/marquee";

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary opacity-10 blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent opacity-10 blur-[100px]" />
  </div>
);

const CampaignCard = ({
  title,
  description,
  icon: Icon,
  category,
  date,
  location,
}: any) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10"></div>
    <div className="relative p-8 flex flex-col h-full">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-sm font-medium px-4 py-1 rounded-full bg-primary/5 dark:bg-primary/10 text-primary">
          {category}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
        {description}
      </p>

      <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
        {date && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{date}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

function LandingPage() {
  const stats = [
    {
      icon: Droplet,
      label: "Donations Made",
      value: 2500,
      suffix: "+",
      color: "primary",
    },
    {
      icon: Users,
      label: "Active Donors",
      value: 500,
      suffix: "+",
      color: "secondary",
    },
    {
      icon: Heart,
      label: "Lives Saved",
      value: 1800,
      suffix: "+",
      color: "accent",
    },
    {
      icon: Calendar,
      label: "Monthly Requests",
      value: 300,
      suffix: "+",
      color: "primary",
    },
  ];

  const features = [
    {
      icon: Bell,
      title: "Quick Response",
      description:
        "Get notified instantly through realtime alerts and emails when your blood type is needed",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "Your information is protected and only shared with verified hospitals",
    },
    {
      icon: Activity,
      title: "Real-time Updates",
      description:
        "Track your donation's journey and see the impact you're making in real-time",
    },
  ];

  const discussionPosts1 = [
    {
      _id: "1",
      title: "Need help with fever symptoms",
      content:
        "I've had a fever for two days. Should I see a doctor or wait it out?",
      author: { name: "Amit" },
      createdAt: "2025-01-30T10:15:00Z",
      tags: ["help"],
    },
    {
      _id: "3",
      title: "Is intermittent fasting safe?",
      content:
        "I've been thinking about trying intermittent fasting. Is it safe for everyone?",
      author: { name: "Rahul" },
      createdAt: "2025-01-28T12:30:00Z",
      tags: ["question"],
    },
    {
      _id: "4",
      title: "Trouble sleeping at night",
      content:
        "Lately, I’ve been struggling with sleep. Any tips for better sleep?",
      author: { name: "Anonymous" },
      createdAt: "2025-01-24T22:30:00Z",
      tags: ["help"],
    },
  ];

  const discussionPosts2 = [
    {
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
      content:
        "I struggle with sugar cravings. Any natural ways to reduce them?",
      author: { name: "Meera" },
      createdAt: "2025-01-25T20:55:00Z",
      tags: ["advice"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-light-bg to-white dark:from-dark-bg dark:to-dark-bg/95 dark:text-dark-text -mt-16 pb-10 pt-10">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] md:min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <HeroBackground />
        <div className="relative space-y-12 max-w-4xl mx-auto">
          <div className="space-y-6 mt-16 md:mt-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800">
              <span className="text-sm font-medium text-primary animate-pulse">
                ✨ Welcome to the future of healthcare
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
                Health Sphere
              </span>
            </h1>
            <p className="text-lg md:text-xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto leading-relaxed">
              Find symptoms, request blood, join discussions, and support health
              campaigns—all in one place.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg px-4 py-2 text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="group flex items-center gap-2 bg-white dark:bg-dark-bg border-2 border-primary/20 hover:border-primary text-primary dark:text-white rounded-lg px-4 py-2 text-base font-medium transition-all duration-300"
            >
              Sign In
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-8 space-y-4 pb-10">
            <p className="text-lg text-light-text/70 dark:text-dark-text/70">
              Are you an organization?
            </p>
            <Link
              to="/organisation"
              className="inline-flex items-center gap-2 text-gray-900 dark:text-dark-text rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">Be a part of our journey</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <BorderBeam />
            </Link>
          </div>
        </div>
      </section>

      {/* BloodBridge Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 bg-light-bg dark:bg-dark-bg">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
          {/* Subtle red circular elements */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/15"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-primary/15"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">
                BloodBridge Network
              </span>
            </span>

            <div className="space-y-4">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                BloodBridge
              </h2>
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"></div>
            </div>

            <p className="text-xl font-light leading-relaxed text-light-text dark:text-dark-text/70">
            Every drop counts. Effortlessly connecting blood donors with recipients, ensuring a transparent and efficient blood donation network.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value, suffix, color }) => (
            <Card
              key={label}
              className="p-8 border-0 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex p-4 rounded-full bg-primary/5">
                  <Icon className={`w-8 h-8 text-${color}`} />
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold flex justify-center items-baseline">
                    <NumberTicker value={value} />
                    <span className="text-2xl ml-1">{suffix}</span>
                  </div>
                  <p className="text-light-text/80 dark:text-dark-text/80">
                    {label}
                  </p>
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
      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-dark-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Community Space
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Chit Chat
            </h2>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-secondary/50 to-transparent rounded-full"></div>
            <p className="text-xl text-light-text/80 dark:text-dark-text/70 max-w-2xl mx-auto">
            Share your thoughts and experiences on health, wellness, and support—whether openly or anonymously.
            </p>
          </div>

          <div className="relative -mx-4 md:mx-12 lg:mx-20">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent dark:from-dark-bg z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent dark:from-dark-bg z-10"></div>

            <div className="relative overflow-hidden">
              <Marquee className="py-4">
                {discussionPosts1.map((post) => (
                  <div key={post._id} className="mx-4">
                    <PostCard post={post} />
                  </div>
                ))}
              </Marquee>

              <Marquee className="py-4" reverse>
                {discussionPosts2.map((post) => (
                  <div key={post._id} className="mx-4">
                    <PostCard post={post} />
                  </div>
                ))}
              </Marquee>
            </div>
            <p className="text-xl text-light-text/80 dark:text-dark-text/70 max-w-2xl mx-auto text-center mt-6">Replies from doctors and medical students are highlighted, ensuring credibility and helping you make informed, trustworthy decisions.</p>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-dark-bg">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Active Campaigns
            </div>
            <h2 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Join Our Latest Initiatives
            </h2>
            <p className="text-lg text-light-text/70 dark:text-dark-text/70">
              Connect with organizations and participate in campaigns that make
              a real difference in your community's healthcare.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <CampaignCard
              title="Emergency Blood Drive"
              description="Join our urgent blood donation camp. Your contribution can help save lives in critical situations. All blood types are welcome, especially O-negative and B-positive."
              icon={Users}
              category="Blood Drive"
              date="February 15, 2025"
              location="City General Hospital"
            />

            <CampaignCard
              title="Community Health Awareness"
              description="Learn about preventing seasonal diseases through our comprehensive awareness program. Get access to expert advice, free health checks, and educational resources."
              icon={Info}
              category="Health Education"
              date="February 20, 2025"
              location="Community Center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
