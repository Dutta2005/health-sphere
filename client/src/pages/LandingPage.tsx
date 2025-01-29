import {
  Users,
  Droplet,
  Heart,
  Bell,
  Shield,
  Activity,
  Calendar,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { NumberTicker } from "../components/ui/number-ticker";
import { Link } from "react-router";

const HeroBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full bg-red-500 opacity-10 blur-3xl animate-pulse" />
    <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full bg-red-700 opacity-10 blur-3xl animate-pulse delay-700" />
  </div>
);

function LandingPage() {
  const stats = [
    { icon: Droplet, label: "Donations Made", value: 2500, suffix: "+" },
    { icon: Users, label: "Active Donors", value: 500, suffix: "+" },
    { icon: Heart, label: "Lives Saved", value: 1800, suffix: "+" },
    { icon: Calendar, label: "Monthly Requests", value: 300, suffix: "+" },
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

  return (
    <div className="dark:bg-dark-bg dark:text-dark-text overflow-hidden">
      <section className="md:h-[70vh] flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-bold py-4 bg-gradient-to-r from-accent via-secondary to-primary text-transparent bg-clip-text">
          Health Sphere
        </h1>
        <h3 className="px-6 md:px-10 text-lg font-semibold text-light-text dark:text-dark-text max-w-2xl">
          Find symptoms, request blood, join discussions, and support health
          campaigns—all in one place.
        </h3>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            to="/signup"
            className="bg-accent text-white rounded-lg px-6 py-2 shadow-lg hover:bg-opacity-90 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-primary text-white rounded-lg px-6 py-2 shadow-lg hover:bg-opacity-90 transition"
          >
            Sign In
          </Link>
        </div>
        <div className="mt-8">
          <p className="mb-5">Are you a organization?</p>
          <Link
            to="/register"
            className="bg-secondary text-white rounded-lg px-6 py-2 shadow-lg hover:bg-opacity-90 transition"
          >
            Be a Part of This Movement
          </Link>
        </div>
      </section>

      <section className="relative">
        <HeroBackground />
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white relative">
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold mb-4 animate-fade-in">
                  BloodBridge
                </h1>
                <p className="text-lg md:text-xl font-light animate-fade-up">
                  Every drop counts. Join our network of donors and be notified
                  when your blood type is needed in your area.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {stats.map(({ icon: Icon, label, value, suffix }) => (
              <Card
                key={label}
                className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                    <Icon className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white flex justify-center items-baseline">
                      <NumberTicker value={value} />
                      <span>{suffix}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                    <feature.icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
