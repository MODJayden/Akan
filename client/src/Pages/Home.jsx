import React from "react";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Globe,
  Book,
  Search,
  Users,
  History,
  Languages,
  Quote,
  Star,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Canonical from "@/components/component/Canonical";

const bg23 = "/bg23.jpeg";
const bg56 = "/bg56.jpeg";
const bg1 = "/bg1.jpg";
const bg12 = "/bg12.jpg";
const bg33 = "/bg33.gif";

// Featured content with Unsplash images
const featuredContent = [
  {
    title: "Akan Proverbs Collection",
    description:
      "Discover the wisdom of Akan elders through traditional proverbs",
    category: "Culture",
    image: bg23,
  },
  {
    title: "Basic Twi Lessons",
    description:
      "Start your journey learning the Twi dialect with interactive lessons",
    category: "Language",
    image: bg33,
  },
  {
    title: "Festivals Calendar",
    description: "Explore upcoming Akan cultural festivals and events",
    category: "Community",
    image: bg12,
  },
];

// Features section
const features = [
  {
    icon: <Languages className="h-8 w-8" />,
    title: "Language Learning",
    description: "Interactive lessons in Twi, Fante, and other Akan dialects",
    link: "/akan/language/lessons",
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Culture Highlights",
    description: "Explore Akan traditions, art, and history",
    link: "/culture",
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "Akan Dictionary",
    description: "Comprehensive dictionary with pronunciation guides",
    link: "/dictionary",
  },
  {
    icon: <History className="h-8 w-8" />,
    title: "Research Features",
    description: "Academic resources about Akan language and culture",
    link: "/research",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community",
    description: "Connect with other learners and culture enthusiasts",
    link: "/akan/community",
  },
];

// Testimonials
const testimonials = [
  {
    quote:
      "This platform helped me reconnect with my roots. The language lessons are so well structured!",
    author: "Kwame Asante",
    role: "Diaspora Member",
    rating: 5,
  },
  {
    quote:
      "As a teacher, I find the cultural resources invaluable for my classroom. The students love it!",
    author: "Ama Serwaa",
    role: "Educator",
    rating: 5,
  },
  {
    quote:
      "The most comprehensive Akan language resource I've found online. The pronunciation guides are exceptional.",
    author: "David Osei",
    role: "Language Learner",
    rating: 4,
  },
];

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Canonical url="/" />
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
              Akan Kasa ne Amammere
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto mb-10">
              Preserving and sharing the rich language and cultural heritage of
              the Akan people
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to={isAuthenticated ? "/akan/language/lessons" : "/login"}>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg">
                  Start Learning
                </Button>
              </Link>
              <Link to="/culture">
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-6 text-lg"
                >
                  Explore Culture
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=10')] opacity-10 bg-cover"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">Our Mission</h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6">
                Akan Kasa ne Amammere is dedicated to preserving and promoting
                the Akan language and cultural heritage through accessible
                education, authentic resources, and community engagement.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our platform serves as a bridge between generations, connecting
                diaspora communities with their roots, and introducing the world
                to the beauty of Akan traditions.
              </p>
              <Link to="/research/history">
                <Button
                  variant="outline"
                  className="border-amber-600 text-amber-700 hover:bg-amber-50"
                >
                  Learn About Our Story
                </Button>
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={bg1}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">
              Explore Our Resources
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow h-full"
              >
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-center text-amber-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-4 text-center">
                    <a
                      href={feature.link}
                      className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                    >
                      Discover more →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">
              Featured Content
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {featuredContent.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="h-full">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <span className="text-xs font-semibold text-white bg-amber-600 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900">
              What Our Community Says
            </h2>
            <div className="w-24 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 h-full">
                <div className="flex flex-col h-full">
                  <Quote className="h-8 w-8 text-amber-400 mb-4" />
                  <p className="text-gray-700 mb-6 flex-grow">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-amber-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {testimonial.role}
                    </p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Language Selector */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-amber-100">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-medium text-amber-900 mb-4">
            Available in: <span className="font-bold">English</span>
          </h3>
          <p className="text-amber-800">More languages coming soon!</p>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section
        style={{ backgroundImage: `url(${bg56})` }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center"
      >
        <div className="max-w-4xl mx-auto text-center bg-white/90 backdrop-blur-sm rounded-xl p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-900">
            Join Our Growing Community
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Connect with fellow learners, culture enthusiasts, and native
            speakers to deepen your understanding of Akan heritage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/akan/language/lessons">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg">
                  Start Learning
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-lg">
                  Become a Member
                </Button>
              </Link>
            )}

            <Link to="/culture">
              <Button
                variant="outline"
                className="border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-6 text-lg"
              >
                Take a Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Home;
