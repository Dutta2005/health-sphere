import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const Signup = () => {
    return (
      <div className="min-h-screen w-full bg-light-bg dark:bg-dark-bg/90 flex justify-center items-center p-4">
        <div className="fixed top-0 left-0 w-1/2 h-full bg-accent/85 transform -skew-x-12 -translate-x-20" />
        
        <Card className="relative w-full max-w-md bg-white/95 dark:bg-dark-bg/95 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl font-bold text-center text-light-text dark:text-dark-text">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-dark-text/80">
              Join us today and get started
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form className="flex flex-col space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-light-text dark:text-dark-text font-medium">
                    First Name
                  </Label>
                  <Input 
                    id="firstName" 
                    placeholder="John" 
                    className="h-11 bg-white dark:bg-dark-bg border-secondary focus:border-accent focus:ring-accent dark:text-dark-text"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-light-text dark:text-dark-text font-medium">
                    Last Name
                  </Label>
                  <Input 
                    id="lastName" 
                    placeholder="Doe" 
                    className="h-11 bg-white dark:bg-dark-bg border-secondary focus:border-accent focus:ring-accent dark:text-dark-text"
                  />
                </div>
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="email" className="text-light-text dark:text-dark-text font-medium">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="john.doe@example.com" 
                  className="h-11 bg-white dark:bg-dark-bg border-secondary focus:border-accent focus:ring-accent dark:text-dark-text"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-light-text dark:text-dark-text font-medium">
                  Password
                </Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a strong password"
                  className="h-11 bg-white dark:bg-dark-bg border-secondary focus:border-accent focus:ring-accent dark:text-dark-text"
                />
              </div>
  
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-light-text dark:text-dark-text font-medium">
                  Confirm Password
                </Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Confirm your password"
                  className="h-11 bg-white dark:bg-dark-bg border-secondary focus:border-accent focus:ring-accent dark:text-dark-text"
                />
              </div>
              
              <div className="flex items-start space-x-2 text-sm">
                <input type="checkbox" id="terms" className="mt-1 rounded border-secondary text-accent focus:ring-accent" />
                <label htmlFor="terms" className="text-gray-600 dark:text-gray-400">
                  I agree to the{' '}
                  <Link to={'/'} className="text-accent hover:text-secondary dark:text-secondary dark:hover:text-accent transition-colors">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to={'/'} className="text-accent hover:text-secondary dark:text-secondary dark:hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full h-11 bg-accent dark:bg-accent hover:bg-accent/90 dark:hover:bg-accent/90 transition-colors">
              Create Account
            </Button>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{' '}
              <Link to={'/login'} className="text-accent hover:text-secondary dark:text-secondary dark:hover:text-accent transition-colors">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  };
  

export default Signup;