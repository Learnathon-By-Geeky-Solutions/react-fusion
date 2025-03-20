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
import { authService } from "@/src/services/auth";
import { useFormik } from "formik";

export default function Login() {
  const handleLogIn = async (data) => {
    const result = await authService.logInUser(data);
    console.log(result);
  };
  const handleSignUp = async (data) => {
    const result = await authService.signUpUser(data);
    console.log(result);
    if (result.success === true) {
      toast.success("User Created.");
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
    //FIX: prefilled for testing
    initialValues: {
      name: "test",
      email: "@s.com",
      password: "test00",
      contactNumber: "0123456789",
      currentInstitution: "RUET",
      gender: "",
      qualification: "",
      address: "test addr 123",
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
                <CardTitle>Log In</CardTitle>
                <CardDescription>
                  Enter email password to log into your account
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
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Enter details to create account
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
                  <Label htmlFor="gender">Gender</Label>
                  <Select onValueChange={signupFormik.handleChange("gender")}>
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
                  <Label htmlFor="institution">Current Institution</Label>
                  <Input
                    id="institution"
                    onChange={signupFormik.handleChange("currentInstitution")}
                    value={signupFormik.values.currentInstitution}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Select
                    onValueChange={signupFormik.handleChange("qualification")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                      <SelectItem value="BACHELORS">Bachelors</SelectItem>
                      <SelectItem value="MASTERS">Masters</SelectItem>
                      <SelectItem value="PHD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    onChange={signupFormik.handleChange("address")}
                    value={signupFormik.values.address}
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
      <Toaster position="top-right" />
    </div>
  );
}
