import { useSelector } from "react-redux"
import LandingPage from "./LandingPage"

function Home() {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    return (
        <div>
            
            {isAuthenticated ? (
                <p>Welcome to the home page!</p>
            ) : (
                <LandingPage />
            )}
        </div>
    )
}

export default Home

// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useTheme } from 'next-themes';
// import { 
//   Calculator, 
//   Moon, 
//   Sun, 
//   Heart, 
//   Activity, 
//   Droplets,
//   Calendar 
// } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
// import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
// import { Alert, AlertDescription } from '../components/ui/alert';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
// import LandingPage from './LandingPage';

// interface BMIResult {
//   bmi: number;
//   category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
//   color: string;
// }

// const Home = () => {
//   const { theme, setTheme } = useTheme();
//   const [height, setHeight] = useState<string>('');
//   const [weight, setWeight] = useState<string>('');
//   const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
//   const [result, setResult] = useState<BMIResult | null>(null);

//   const calculateBMI = () => {
//     let bmi: number;
//     const weightNum = parseFloat(weight);
//     const heightNum = parseFloat(height);

//     if (unit === 'metric') {
//       bmi = weightNum / Math.pow(heightNum / 100, 2);
//     } else {
//       bmi = (weightNum * 703) / Math.pow(heightNum, 2);
//     }

//     let category: BMIResult['category'];
//     let color: string;

//     if (bmi < 18.5) {
//       category = 'Underweight';
//       color = 'text-blue-500';
//     } else if (bmi < 25) {
//       category = 'Normal';
//       color = 'text-green-500';
//     } else if (bmi < 30) {
//       category = 'Overweight';
//       color = 'text-yellow-500';
//     } else {
//       category = 'Obese';
//       color = 'text-red-500';
//     }

//     setResult({ bmi, category, color });
//   };

//   const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)

//   return (
//     <div>
            
//              {isAuthenticated ? (
//                 <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
//                 <header className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-16">
//                   <div className="container mx-auto px-4 text-center">
//                     <h1 className="text-5xl font-bold mb-4">HealthCare Hub</h1>
//                     <p className="text-xl font-light max-w-2xl mx-auto">
//                       Your one-stop destination for health monitoring and blood donation
//                     </p>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="mt-4"
//                       onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
//                     >
//                       {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
//                     </Button>
//                   </div>
//                 </header>
          
//                 <main className="container mx-auto px-4 py-8">
//                   <Tabs defaultValue="bmi" className="w-full max-w-4xl mx-auto">
//                     <TabsList className="flex justify-center space-x-2 p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
//                       <TabsTrigger value="bmi" className="flex items-center gap-2">
//                         <Calculator className="h-4 w-4" />
//                         BMI Calculator
//                       </TabsTrigger>
//                       <TabsTrigger value="donate" className="flex items-center gap-2">
//                         <Droplets className="h-4 w-4" />
//                         Blood Donation
//                       </TabsTrigger>
//                       <TabsTrigger value="health" className="flex items-center gap-2">
//                         <Activity className="h-4 w-4" />
//                         Health Stats
//                       </TabsTrigger>
//                     </TabsList>
          
//                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
//                       <TabsContent value="bmi" className="space-y-6">
//                         <Card>
//                           <CardHeader>
//                             <CardTitle>Calculate Your BMI</CardTitle>
//                             <CardDescription>
//                               Track your Body Mass Index to maintain a healthy weight
//                             </CardDescription>
//                           </CardHeader>
//                           <CardContent className="space-y-4">
//                             <Select
//                               value={unit}
//                               onValueChange={(value: 'metric' | 'imperial') => setUnit(value)}
//                             >
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select unit system" />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="metric">Metric (cm/kg)</SelectItem>
//                                 <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
//                               </SelectContent>
//                             </Select>
          
//                             <div className="grid grid-cols-2 gap-4">
//                               <div>
//                                 <Label htmlFor="height">Height ({unit === 'metric' ? 'cm' : 'inches'})</Label>
//                                 <Input
//                                   id="height"
//                                   type="number"
//                                   value={height}
//                                   onChange={(e) => setHeight(e.target.value)}
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="weight">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Label>
//                                 <Input
//                                   id="weight"
//                                   type="number"
//                                   value={weight}
//                                   onChange={(e) => setWeight(e.target.value)}
//                                 />
//                               </div>
//                             </div>
          
//                             <Button onClick={calculateBMI} className="w-full">Calculate</Button>
          
//                             {result && (
//                               <Alert>
//                                 <AlertDescription className="space-y-2">
//                                   <p>Your BMI: <span className="font-bold">{result.bmi.toFixed(1)}</span></p>
//                                   <p>Category: <span className={`font-bold ${result.color}`}>{result.category}</span></p>
//                                 </AlertDescription>
//                               </Alert>
//                             )}
//                           </CardContent>
//                         </Card>
//                       </TabsContent>
          
//                       <TabsContent value="donate">
//                         <Card>
//                           <CardHeader>
//                             <CardTitle className="flex items-center gap-2">
//                               <Heart className="h-6 w-6 text-red-500" />
//                               Blood Donation
//                             </CardTitle>
//                             <CardDescription>
//                               Your donation can save up to three lives. Join our life-saving mission.
//                             </CardDescription>
//                           </CardHeader>
//                           <CardContent className="space-y-6">
//                             <div className="grid md:grid-cols-2 gap-6">
//                               <div className="space-y-4">
//                                 <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
//                                 <ul className="space-y-2">
//                                   <li>• Age: 18-65 years</li>
//                                   <li>• Weight: Above 50kg</li>
//                                   <li>• Hemoglobin: 12.5g/dl minimum</li>
//                                   <li>• Good general health</li>
//                                 </ul>
//                               </div>
//                               <div className="space-y-4">
//                                 <h3 className="text-lg font-semibold">Next Steps</h3>
//                                 <div className="space-y-2">
//                                   <Button className="w-full">Schedule Donation</Button>
//                                   <Button variant="outline" className="w-full">Check Eligibility</Button>
//                                 </div>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </TabsContent>
          
//                       <TabsContent value="health">
//                         <Card>
//                           <CardHeader>
//                             <CardTitle className="flex items-center gap-2">
//                               <Activity className="h-6 w-6 text-green-500" />
//                               Health Statistics
//                             </CardTitle>
//                             <CardDescription>
//                               Track your health metrics and set wellness goals
//                             </CardDescription>
//                           </CardHeader>
//                           <CardContent>
//                             <div className="grid md:grid-cols-2 gap-6">
//                               <Card>
//                                 <CardHeader>
//                                   <CardTitle className="text-lg">Next Check-up</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="flex items-center gap-2">
//                                   <Calendar className="h-5 w-5" />
//                                   <span>Schedule your next health check-up</span>
//                                 </CardContent>
//                               </Card>
//                               <Card>
//                                 <CardHeader>
//                                   <CardTitle className="text-lg">Blood Donations</CardTitle>
//                                 </CardHeader>
//                                 <CardContent className="flex items-center gap-2">
//                                   <Droplets className="h-5 w-5 text-red-500" />
//                                   <span>View your donation history</span>
//                                 </CardContent>
//                               </Card>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </TabsContent>
//                     </div>
//                   </Tabs>
//                 </main>
//               </div>
//              ) : (
//                 <LandingPage />
//            )}
//         </div>
  
//   );
// };

// export default Home;
