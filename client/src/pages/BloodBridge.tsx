import RequestForm from "../components/blood bridge/RequestForm";
import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "../components/ui/tabs";
import UserRequests from "../components/blood bridge/UserRequests";
import { Heart, Users, Droplet, Clock } from "lucide-react";

function BloodBridge() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <header className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">BloodBridge</h1>
          <p className="text-xl font-light max-w-2xl mx-auto">
            Every drop counts. Join our community of life-savers and make a
            difference today.
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Heart, label: "Lives Saved", value: "1,000+" },
            { icon: Users, label: "Active Donors", value: "500+" },
            { icon: Droplet, label: "Donations Made", value: "2,500+" },
            { icon: Clock, label: "Response Time", value: "30 mins" },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            >
              <Icon className="w-8 h-8 mx-auto mb-4 text-red-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {value}
              </p>
              <p className="text-gray-600 dark:text-gray-300">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="donor" className="w-full max-w-4xl mx-auto">
          <TabsList className="flex justify-center space-x-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
            <TabsTrigger
              value="donor"
              className="flex-1 px-8 py-3 text-base font-semibold rounded-md data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Be a Donor
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="flex-1 px-8 py-3 text-base font-semibold rounded-md data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Blood Requests
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <TabsContent value="donor" className="space-y-6">
              <RequestForm />
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Become a Life Saver
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Your decision to donate blood can save up to three lives. Join
                  our network of donors and be notified when your blood type is
                  needed in your area.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: "Quick Response",
                    description:
                      "Get notified instantly when your blood type is needed nearby",
                  },
                  {
                    title: "Safe & Secure",
                    description:
                      "Your information is protected and only shared with verified hospitals",
                  },
                  {
                    title: "Save Lives",
                    description:
                      "Make a real difference in your community by helping those in need",
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requests">
              <UserRequests />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
}

export default BloodBridge;
