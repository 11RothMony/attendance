"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeSlash, WarningCircle, X } from "@phosphor-icons/react";
import { Field, Form, Formik } from "formik";
import { School } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include at least 1 uppercase letter")
    .matches(/[0-9]/, "Must include at least 1 number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least 1 special character"
    )
    .required(
      "Password at least 8 characters includes 1 uppercase, 1 number, 1 special character."
    ),
});

interface FormValues {
  email: string;
  password: string;
}
export function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showAuthError, setShowAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();

      if (users.length === 0 || users[0].password !== values.password) {
        throw new Error("Invalid email or password");
      }

      // If login is successful, store user data (optional)
      localStorage.setItem("user", JSON.stringify(users[0]));
      router.push(`/dashboard?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      if (error instanceof Error) {
        setShowAuthError(true);
        setErrorMessage(error.message);
      } else {
        // Handle cases where the error is not an instance of Error
        console.error("Login failed with an unknown error:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Card className="w-[400px] border-none shadow-none">
        <CardHeader className="space-y-1 flex flex-col relative items-center">
          {showAuthError && (
            <Alert
              variant={"error"}
              className="absolute left-16 top-8 flex gap-2 text-white items-center"
            >
              <AlertTitle>
                <WarningCircle size={16} />
              </AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              <Button
                className="px-0 cursor-pointer"
                onClick={() => setShowAuthError(false)}
                variant={"ghost"}
                size={"icon"}
              >
                <X size={16} />
              </Button>
            </Alert>
          )}
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
            <School className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Teacher Login
          </CardTitle>
        </CardHeader>
        {/* <div className="px-6 flex flex-col"> */}
        <CardContent>
          <Formik
            initialValues={{ email: "", password: "", rememberMe: false }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleChange,
              handleBlur,
              values,
              isValid,
              dirty,
            }) => (
              <Form className="w-full mt-4 space-y-6">
                <div>
                  <Label>Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.email && touched.email ? "border-red-500" : ""
                    }
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password..."
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "border-red-500"
                          : ""
                      }
                    />
                    <Button
                      variant={"ghost"}
                      type="button"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeSlash size={20} />
                      )}
                    </Button>
                  </div>
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full  rounded-xl"
                  disabled={!isValid || !dirty}
                  // asChild={!isValid || !dirty}
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </>
  );
}
