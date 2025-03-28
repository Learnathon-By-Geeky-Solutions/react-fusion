import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { instructorAuthService } from "@/src/services/auth";
import { useFormik } from "formik";
import useInstructorAuth from "@/src/context/authContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function InstructorLogin() {
  const { instructor, storeToken } = useInstructorAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (instructor.authenticated) {
      navigate("/dashboard");
    }
  }, [instructor, navigate]);

  const handleLogIn = async (data) => {
    const result = await instructorAuthService.logInInstructor(data);
    if (result.success === true) {
      toast.success("Log In Successful!");
      storeToken(result.data.accessToken);
    } else {
      toast.error("ERROR!");
    }
  };

  const handleSignUp = async (data) => {
    const result = await instructorAuthService.signUpInstructor(data);
    if (result.success === true) {
      toast.success("Instructor Account Created.");
    } else {
      toast.error("ERROR!");
    }
    signupFormik.resetForm();
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogIn(values);
    },
  });

  const signupFormik = useFormik({
    initialValues: {
      name: "test",
      email: "instructor@s.com",
      password: "test00",
      contactNumber: "0123456789",
      experience: 5,
      gender: "MALE",
      qualification: "MASTERS",
      currentWorkingPlace: "XYZ University",
      designation: "Senior Lecturer",
    },
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <div className="flex align-middle my-12 justify-around">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <form onSubmit={loginFormik.handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Instructor Log In</CardTitle>
                <CardDescription>
                  Enter email and password to log in
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    onChange={loginFormik.handleChange("email")}
                    value={loginFormik.values.email}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    onChange={loginFormik.handleChange("password")}
                    value={loginFormik.values.password}
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Log In</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={signupFormik.handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Instructor Sign Up</CardTitle>
                <CardDescription>
                  Enter details to create an instructor account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    onChange={signupFormik.handleChange("name")}
                    value={signupFormik.values.name}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    onChange={signupFormik.handleChange("email")}
                    value={signupFormik.values.email}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    onChange={signupFormik.handleChange("password")}
                    value={signupFormik.values.password}
                    type="password"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Contact No</Label>
                  <Input
                    id="phone"
                    onChange={signupFormik.handleChange("contactNumber")}
                    value={signupFormik.values.contactNumber}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="experience">Experience (Years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    onChange={signupFormik.handleChange("experience")}
                    value={signupFormik.values.experience}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={signupFormik.handleChange("gender")}
                    value={signupFormik.values.gender}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Select
                    onValueChange={signupFormik.handleChange("qualification")}
                    value={signupFormik.values.qualification}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BACHELORS">Bachelors</SelectItem>
                      <SelectItem value="MASTERS">Masters</SelectItem>
                      <SelectItem value="PHD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="currentWorkingPlace">Current Workplace</Label>
                  <Input
                    id="currentWorkingPlace"
                    onChange={signupFormik.handleChange("currentWorkingPlace")}
                    value={signupFormik.values.currentWorkingPlace}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    onChange={signupFormik.handleChange("designation")}
                    value={signupFormik.values.designation}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Sign Up</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
