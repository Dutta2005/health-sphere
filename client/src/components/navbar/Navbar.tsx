import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Moon, User } from "lucide-react";
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
      className={'fixed w-full top-0 z-50 backdrop-blur-sm '}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand/Logo */}
          <NavLink
            to="/"
            className={'text-xl font-semibold'}
          >
            <span className="text-accent">Health</span> <span className="text-primary">Sphere</span>
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
                          : "dark:text-dark-text"
                      }`
                    }
                  >
                    Home
                  </NavLink>
                </NavigationMenuItem>
              )}
              {isAuthenticated && (
                <NavigationMenuItem>
                  <NavLink
                    to="/bloodbridge"
                    className={({ isActive }) =>
                      `hover:text-accent transition-colors ${
                        isActive
                          ? "text-accent"
                          : "dark:text-dark-text"
                      }`
                    }
                  >
                    Blood Bridge
                  </NavLink>
                </NavigationMenuItem>
              )}
              {isAuthenticated && (
                <NavigationMenuItem>
                  <NavLink
                    to="/discussions"
                    className={({ isActive }) =>
                      `hover:text-accent transition-colors ${
                        isActive
                          ? "text-accent"
                          : "dark:text-dark-text"
                      }`
                    }
                  >
                    Discussions
                  </NavLink>
                </NavigationMenuItem>
              )}
              {isAuthenticated && (
                <NavigationMenuItem>
                  <NavLink
                    to="/posts"
                    className={({ isActive }) =>
                      `hover:text-accent transition-colors ${
                        isActive
                          ? "text-accent"
                          : "dark:text-dark-text"
                      }`
                    }
                  >
                    Campaigns
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
    <Avatar 
      className={`
        cursor-pointer 
        ${isAuthenticated 
          ? "hover:ring-2 hover:ring-accent transition-all" 
          : ""
        }
      `}
    >
      <AvatarFallback>
        <User className="h-5 w-5 text-light-text dark:text-dark-text" />
      </AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent
    align="end"
    className={`
      w-56 
      p-2 
      rounded-xl 
      shadow-2xl 
      backdrop-blur-md 
      border 
      ${theme === "dark" 
        ? "bg-dark-bg/80 text-dark-text border-secondary/20" 
        : "bg-light-bg/80 text-light-text border-secondary/20"
      }
    `}
  >
    {isAuthenticated && (
      <>
        <DropdownMenuItem 
          className="
            hover:bg-accent/10 
            rounded-md 
            transition-colors 
            focus:bg-accent/10
          "
        >
          <NavLink 
            to="/profile" 
            className="flex items-center w-full gap-2"
          >
            <User className="h-4 w-4 opacity-70" />
            Profile
          </NavLink>
        </DropdownMenuItem>
        
        <div className="border-t border-secondary/20 my-1" />
      </>
    )}
    
    <DropdownMenuItem 
      className="
        hover:bg-accent/10 
        rounded-md 
        transition-colors 
        focus:bg-accent/10
      "
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Moon className="h-4 w-4 opacity-70" />
          <span>Dark Mode</span>
        </div>
        <Switch
          checked={theme === "dark"}
          onCheckedChange={handleThemeToggle}
        />
      </div>
    </DropdownMenuItem>
    
    {isAuthenticated && (
      <>
        <div className="border-t border-secondary/20 my-1" />
        
        <DropdownMenuItem 
          className="
            hover:bg-accent/10 
            rounded-md 
            transition-colors 
            focus:bg-accent/10
            text-primary
          "
        >
          <Logoutbtn />
        </DropdownMenuItem>
      </>
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
