import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = [
    {
      title: "Resources",
      links: [
        { name: "Language Learning", href: "/language" },
        { name: "Culture Highlights", href: "/culture" },
        { name: "Akan Dictionary", href: "/dictionary" },
        { name: "Research Features", href: "/research" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Discussion Forums", href: "/community/forums" },
        { name: "Events Calendar", href: "/community/events" },
        { name: "Meet Native Speakers", href: "/community/speakers" },
        { name: "Volunteer Opportunities", href: "/community/volunteer" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Partnerships", href: "/partners" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-amber-900 text-amber-50">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Akan Kasa ne Amammere</h2>
            <p className="mb-6 opacity-80">
              Preserving and promoting the Akan language and cultural heritage
              for future generations.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-50 hover:bg-amber-800"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-50 hover:bg-amber-800"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-50 hover:bg-amber-800"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-50 hover:bg-amber-800"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="opacity-80 hover:opacity-100 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4 opacity-80">
              Subscribe to our newsletter for the latest resources and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Button className="bg-amber-600 hover:bg-amber-700 rounded-l-none rounded-r-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="opacity-80 mb-4 md:mb-0">
            © {new Date().getFullYear()} Akan Kasa ne Amammere. All rights
            reserved.
          </p>
          <div className="flex space-x-6">
            <a href="/privacy" className="opacity-80 hover:opacity-100">
              Privacy Policy
            </a>
            <a href="/terms" className="opacity-80 hover:opacity-100">
              Terms of Service
            </a>
            <a href="/cookies" className="opacity-80 hover:opacity-100">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
