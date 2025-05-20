import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "@/store/Culture";
import { updateAvatar, updateUser } from "@/store/auth";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    role: user?.role,
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

  const validateProfileForm = () => {
    const newErrors = {};

    if (!formData?.name.trim()) {
      newErrors.name = "Username is required";
    } else if (formData?.name.length < 2) {
      newErrors.name = "Username must be at least 2 characters";
    }

    if (!formData?.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData?.role.trim()) {
      newErrors.role = "Role is required";
    } else if (formData?.role.trim() === "admin") {
      newErrors.role = "Role cannot be admin";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    if (validateProfileForm()) {
      dispatch(updateUser({ id: user?._id, data: formData }))
        .then((res) => {
          if (res?.payload?.success) {
            setFormData({
              name: res.payload.data.name,
              email: res.payload.data.email,
              role: res.payload.data.role,
              avatar: res.payload.data.avatar,
              createdAt: res.payload.data.createdAt.substring(0, 10),
            });
            setErrors({});
            toast.success("Profile updated successfully");
          }
          setIsEditing(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      dispatch(uploadFile(formData))
        .then((res) => {
          if (res?.payload?.success) {
            setFormData((prev) => ({
              ...prev,
              avatar: res.payload.data.url,
            }));
            dispatch(
              updateAvatar({ id: user?._id, avatar: res.payload.data.url })
            ).then((res) => {
              toast.success("Avatar uploaded successfully");
              window.location.reload();
            });
          } else {
            toast.error("File upload failed");
          }
        })
        .finally(() => setIsUploading(false));
    }
  }, [file]);

  const handleAvatarUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setFile(selectedFile);
    const previewUrl = URL.createObjectURL(selectedFile);
    setAvatarPreview(previewUrl);
    setFile(selectedFile);
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
                  <AvatarImage
                    src={avatarPreview || user?.avatar}
                    alt={user?.name}
                  />
                  <AvatarFallback className="text-2xl font-medium">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={isUploading}
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
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Role</p>
                  <p>{user?.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p>{user?.createdAt?.substring(0, 10)}</p>
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
                        value={formData?.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="disabled:opacity-100 disabled:cursor-text"
                      />
                      {errors?.name && (
                        <p className="text-sm font-medium text-destructive">
                          {errors?.name}
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
                        value={formData?.email}
                        onChange={handleInputChange}
                        disabled={true}
                        className="disabled:opacity-100 disabled:cursor-text"
                      />
                      {errors.email && (
                        <p className="text-sm font-medium text-destructive">
                          {errors?.email}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Role
                        </Label>
                        <Input
                          name="role"
                          value={formData?.role}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="disabled:opacity-100 disabled:cursor-text"
                        />
                        {errors?.role && (
                          <p className="text-sm font-medium text-destructive">
                            {errors?.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
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
                            name: user?.name,
                            email: user?.email,
                            bio: user?.bio,
                            phone: user?.phone,
                            location: user?.location,
                            website: user?.website,
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
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
