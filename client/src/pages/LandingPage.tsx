import {
  Users,
  Droplet,
  Heart,
  Bell,
  Shield,
  Activity,
  Calendar,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Card } from "../components/ui/card";
import { NumberTicker } from "../components/ui/number-ticker";
import { Link } from "react-router";
import { BorderBeam } from "../components/ui/border-beam";

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary opacity-5 blur-3xl animate-pulse" />
    <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent opacity-5 blur-3xl animate-pulse delay-1000" />
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

  return (
    <div className="min-h-screen dark:bg-dark-bg dark:text-dark-text pb-10">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <HeroBackground />
        <div className="relative space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Health Sphere
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-light-text/80 dark:text-dark-text/80 max-w-2xl mx-auto">
              Find symptoms, request blood, join discussions, and support health campaigns—all in one place.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="group flex items-center gap-2 bg-white dark:bg-dark-bg border-2 border-primary text-primary dark:text-white rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Sign In
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-8 space-y-4">
            <p className="text-lg text-light-text/70 dark:text-dark-text/70">Are you an organization?</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-gray-900 dark:text-white rounded-full px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              Be a Part of This Movement
              <ArrowRight className="w-5 h-5" />
            <BorderBeam />
            </Link>
          </div>
        </div>
      </section>

      {/* BloodBridge Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white space-y-8">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">BloodBridge</h2>
            <p className="text-xl font-light">
              Every drop counts. Join our network of donors and be notified when your blood type is needed in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, label, value, suffix, color }) => (
            <Card className="p-6 border-0" key={label}>
                <div className="text-center space-y-4">
                  <div className={`inline-flex p-3 rounded-full bg-${color}/10`}>
                    <Icon className={`w-8 h-8 text-${color}`} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold flex justify-center items-baseline">
                      <NumberTicker value={value} />
                      <span className="text-2xl">{suffix}</span>
                    </div>
                    <p className="text-light-text/70 dark:text-dark-text/70">{label}</p>
                  </div>
                </div>
              </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-0 bg-gradient-to-br from-white to-light-bg dark:from-dark-bg dark:to-dark-bg/50"
            >
              <div className="space-y-4">
                <div className="inline-flex p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-light-text/70 dark:text-dark-text/70">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;