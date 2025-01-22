import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { User } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
import { RootState } from "../../store/store";
import { toggleTheme } from "../../store/themeSlice";
import Logoutbtn from "../Logoutbtn";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 backdrop-blur-sm ${
        theme === "dark"
          ? "bg-dark-bg text-dark-text"
          : "bg-light-bg text-light-text"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand/Logo */}
          <NavLink
            to="/"
            className={`text-xl font-semibold ${
              theme === "dark" ? "text-dark-text" : "text-primary"
            } hover:text-accent transition-colors`}
          >
            Health Sphere
          </NavLink>

          {/* Center - Navigation */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="flex gap-6">
              {isAuthenticated && (
                <NavigationMenuItem>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `hover:text-accent transition-colors ${
                        isActive
                          ? "text-accent"
                          : theme === "dark"
                          ? "text-dark-text"
                          : "text-light-text"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </NavigationMenuItem>
              )}
              {!isAuthenticated && (
                <>
                  <NavigationMenuItem>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `hover:text-accent transition-colors ${
                          isActive
                            ? "text-accent"
                            : theme === "dark"
                            ? "text-dark-text"
                            : "text-light-text"
                        }`
                      }
                    >
                      Login
                    </NavLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavLink
                      to="/signup"
                      className={({ isActive }) =>
                        `hover:text-accent transition-colors ${
                          isActive
                            ? "text-accent"
                            : theme === "dark"
                            ? "text-dark-text"
                            : "text-light-text"
                        }`
                      }
                    >
                      Signup
                    </NavLink>
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side - User Menu */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {isAuthenticated ? (
                  <Avatar className="cursor-pointer hover:ring-2 hover:ring-accent transition-all">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <Avatar className="cursor-pointer">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={`w-48 p-2 rounded-lg shadow-lg backdrop-blur-md ${
                  theme === "dark"
                    ? "bg-dark-bg/75 text-dark-text"
                    : "bg-light-bg/75 text-light-text"
                }`}
              >
                {isAuthenticated && (
                  <DropdownMenuItem className="hover:bg-accent/20 rounded-md transition-colors">
                    <NavLink to="/profile" className="w-full">
                      Profile
                    </NavLink>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem className="hover:bg-accent/20 rounded-md transition-colors">
                  <div className="flex items-center justify-between w-full">
                    <span>Dark Mode</span>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={handleThemeToggle}
                      className="ml-2"
                    />
                  </div>
                </DropdownMenuItem>
                {isAuthenticated && (
                  <DropdownMenuItem className="hover:bg-accent/20 rounded-md transition-colors">
                    <Logoutbtn />
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
