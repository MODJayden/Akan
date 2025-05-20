import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Globe,
  Calendar,
  Edit,
  Check,
  X,
  Upload,
  Shield,
  Bell,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  // Form state
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio,
    phone: user.phone,
    location: user.location,
    website: user.website,
  });

  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    twoFactorAuth: true,
    notifications: true,
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecurityData({
      ...securityData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateProfileForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Username is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Username must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    } else if (formData.bio.length < 4) {
      newErrors.bio = "Bio must be at least 4 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (formData.phone.length < 10) {
      newErrors.phone = "Phone must be at least 10 characters";
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required";
    } else if (
      !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
        formData.website
      )
    ) {
      newErrors.website = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSecurityForm = () => {
    const newErrors = {};

    if (!securityData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    } else if (securityData.currentPassword.length < 8) {
      newErrors.currentPassword = "Password must be at least 8 characters";
    }

    if (!securityData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (securityData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (validateProfileForm()) {
      setUser({
        ...user,
        ...formData,
      });
      setIsEditing(false);
      toast({
        title: "Profile updated successfully",
        variant: "default",
      });
    }
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    if (validateSecurityForm()) {
      toast({
        title: "Security settings updated",
        variant: "default",
      });
      // Reset password fields
      setSecurityData({
        ...securityData,
        currentPassword: "",
        newPassword: "",
      });
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({
          ...user,
          avatar: event.target.result,
        });
      };
      reader.readAsDataURL(file);
      toast({
        title: "Avatar updated successfully",
        variant: "default",
      });
    }
  };

  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="avatar-upload"
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background text-sm font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p>{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p>{user.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p>{user.joinDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3 space-y-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your personal details and information.
                      </CardDescription>
                    </div>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleProfileSubmit}>
                          <Check className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setFormData({
                              name: user.name,
                              email: user.email,
                              bio: user.bio,
                              phone: user.phone,
                              location: user.location,
                              website: user.website,
                            });
                            setErrors({});
                            setIsEditing(false);
                          }}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Username
                      </Label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="disabled:opacity-100 disabled:cursor-text"
                      />
                      {errors.name && (
                        <p className="text-sm font-medium text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="disabled:opacity-100 disabled:cursor-text"
                      />
                      {errors.email && (
                        <p className="text-sm font-medium text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone
                        </Label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="disabled:opacity-100 disabled:cursor-text"
                        />
                        {errors.phone && (
                          <p className="text-sm font-medium text-destructive">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location
                        </Label>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="disabled:opacity-100 disabled:cursor-text"
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
