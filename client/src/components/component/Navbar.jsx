import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ChevronDown,
  BookOpen,
  Globe,
  Book,
  Search,
  Users,
  History,
  Languages,
  Bookmark,
  User,
  Gem,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const mobileNavItems = [
    {
      title: "Language Learning",
      icon: <Languages className="h-5 w-5" />,
      subItems: [
        {
          title: "Lessons",
          to: "/language/lessons",
          icon: <BookOpen className="h-4 w-4" />,
        },
        {
          title: "Pronunciation Guide",
          to: "/language/pronunciation",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          title: "Exercises",
          to: "/language/exercises",
          icon: <Bookmark className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Akan Culture Highlights",
      to: "/culture",
      icon: <Book className="h-5 w-5" />,
    },
    {
      title: "Akan Dictionary",
      to: "/dictionary",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "Research Features",
      icon: <History className="h-5 w-5" />,
      subItems: [
        {
          title: "Historical Documents",
          to: "/research/history",
          icon: <BookOpen className="h-4 w-4" />,
        },
        {
          title: "Linguistic Analysis",
          to: "/research/linguistics",
          icon: <Languages className="h-4 w-4" />,
        },
        {
          title: "Cultural Studies",
          to: "/research/cultural-studies",
          icon: <Book className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Community",
      to: "/community",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: isLoggedIn ? "My Profile" : "Login/Signup",
      to: isLoggedIn ? "/profile" : "/auth",
      icon: <User className="h-5 w-5" />,
    },
  ];

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="flex text-amber-500 text-xl font-bold">
            <Gem className="text-amber-500" /> Akan Heritage
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Language Learning Dropdown */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex gap-1 text-sm text-amber-500 font-medium"
                    >
                      <Languages className="h-4 w-4" />
                      Language Learning
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <Link
                      to="/language/lessons"
                      className="flex items-center gap-2 w-full"
                    >
                      <DropdownMenuItem>
                        <BookOpen className="h-4 w-4" />
                        Lessons
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/language/pronunciation"
                      className="flex items-center gap-2 w-full"
                    >
                      <DropdownMenuItem>
                        <Globe className="h-4 w-4" />
                        Pronunciation Guide
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      to="/language/exercises"
                      className="flex items-center gap-2 w-full"
                    >
                      <DropdownMenuItem>
                        <Bookmark className="h-4 w-4" />
                        Exercises
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              {/* Akan Culture Highlights */}
              <NavigationMenuItem>
                <Link
                  to="/culture"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-amber-500 flex gap-2 text-sm font-medium"
                  )}
                >
                  <Book className="h-4 w-4" />
                  Akan Culture
                </Link>
              </NavigationMenuItem>

              {/* Akan Dictionary */}
              <NavigationMenuItem>
                <Link
                  to="/dictionary"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 text-sm font-medium text-amber-500"
                  )}
                >
                  <Search className="h-4 w-4" />
                  Dictionary
                </Link>
              </NavigationMenuItem>

              {/* Research Features Dropdown */}
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex text-amber-500 gap-1 text-sm font-medium"
                    >
                      <History className="h-4 w-4" />
                      Research
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuItem>
                      <Link
                        to="/research/history"
                        className="flex items-center gap-2 w-full"
                      >
                        <BookOpen className="h-4 w-4" />
                        Historical Documents
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/research/linguistics"
                        className="flex items-center gap-2 w-full"
                      >
                        <Languages className="h-4 w-4" />
                        Linguistic Analysis
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/research/cultural-studies"
                        className="flex items-center gap-2 w-full"
                      >
                        <Book className="h-4 w-4" />
                        Cultural Studies
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              {/* Community */}
              <NavigationMenuItem>
                <Link
                  to="/community"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 text-sm font-medium text-amber-500"
                  )}
                >
                  <Users className="h-4 w-4" />
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className=" relative h-8 w-8 rounded-full ml-2"
                >
                  <Avatar className=" h-8 w-8">
                    <AvatarImage
                      src={isLoggedIn ? "/avatars/default.png" : undefined}
                      alt="User"
                    />
                    <AvatarFallback>
                      {isLoggedIn ? "U" : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/default.png" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          user@example.com
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 w-full"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 w-full"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={toggleLogin}
                      className="text-red-600 focus:text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/login"
                        onClick={toggleLogin}
                        className="flex items-center gap-2 w-full"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/signup"
                        onClick={toggleLogin}
                        className="flex items-center gap-2 w-full"
                      >
                        <UserPlus className="h-4 w-4" />
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className=" md:hidden hover:bg-transparent focus-visible:ring-0"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-xs sm:max-w-md px-0"
            >
              <div className="px-6 py-2 border-b">
                <h2 className="text-lg font-semibold">Menu</h2>
              </div>
              <nav className="flex flex-col gap-1 p-2">
                {mobileNavItems.map((item) => (
                  <div key={item.title} className="flex flex-col">
                    {item.to ? (
                      <Link
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium">
                          {item.icon}
                          {item.title}
                        </div>
                        <div className="ml-8 flex flex-col border-l pl-2">
                          {item.subItems?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.to}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              {subItem.icon}
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
