"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GraduationCap,
  School,
  Shield,
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { PasswordRules } from "@/components/passwordRules/PasswordRules";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Import form components
import { TeacherForm } from "@/components/register/TeacherForm";
import { SchoolForm } from "@/components/register/SchoolForm";
import { ParentForm } from "@/components/register/ParentForm";

// Import schemas and types
import {
  AccountType,
  teacherSchema,
  schoolSchema,
  parentSchema,
  baseSchema,
  TeacherFormData,
  SchoolFormData,
  ParentFormData,
} from "@/schema/auth";

const accountTypes: {
  type: AccountType;
  label: string;
  desc: string;
  icon: React.ElementType;
  color: string;
}[] = [
  {
    type: "teacher",
    label: "Teacher",
    desc: "Find jobs and tutor students",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    type: "school",
    label: "School / Institution",
    desc: "Post jobs and hire teachers",
    icon: School,
    color: "from-emerald-500 to-teal-500",
  },
  {
    type: "parent",
    label: "Parent",
    desc: "Find tutors and resources",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    type: "admin",
    label: "Admin",
    desc: "Manage the platform",
    icon: Shield,
    color: "from-orange-500 to-red-500",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function RegisterPage() {
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Get the appropriate schema based on selected type
  const getSchema = () => {
    switch (selectedType) {
      case "teacher":
        return teacherSchema;
      case "school":
        return schoolSchema;
      case "parent":
        return parentSchema;
      default:
        return baseSchema;
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(getSchema()),
  });

  const passwordValue = watch("password");

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      // Prepare metadata based on account type
      const metadata: Record<string, any> = {
        accountType: selectedType,
        phone: data.phone,
      };

      // Add type-specific fields to metadata
      if (selectedType === "teacher") {
        metadata.tscNumber = data.tscNumber;
        metadata.subjects =
          data.subjects?.split(",").map((s: string) => s.trim()) || [];
        metadata.experience = data.experience;
        metadata.qualifications = data.qualifications;
      } else if (selectedType === "school") {
        metadata.institutionName = data.institutionName;
        metadata.institutionType = data.institutionType;
        metadata.location = {
          country: data.country,
          state: data.state,
          city: data.city === "other" ? data.customCity : data.city,
        };
        metadata.registrationNumber = data.registrationNumber;
      }

      // Call Better Auth sign up
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          metadata,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      toast.success(
        "Account created successfully! Please check your email to verify.",
      );

      // Redirect to sign in or verification page
      setTimeout(() => {
        router.push("/sign-in?registered=true");
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: string) => {
    alert(`Social sign up with ${provider} is not implemented in this demo.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20 w-full">
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="container max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-base">
                    ML
                  </span>
                </div>
                <span className="font-semibold text-xl tracking-tight">
                  Mwalimu Link
                </span>
              </Link>
              <h1 className="text-3xl font-bold tracking-tight">
                {step === 1 ? "Create your account" : "Complete your profile"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {step === 1
                  ? "Join Kenya's premier platform for educators and institutions."
                  : `Setting up your ${selectedType} account`}
              </p>
            </div>

            <Card className="border-border shadow-xl">
              <CardContent className="p-6 md:p-8">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Account Type Selection */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {accountTypes.map((at, index) => (
                        <motion.div
                          key={at.type}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card
                            onClick={() => setSelectedType(at.type)}
                            className={cn(
                              "relative overflow-hidden cursor-pointer press-effect transition-all",
                              selectedType === at.type
                                ? "ring-2 ring-primary border-primary shadow-lg"
                                : "hover:border-primary/30 hover:shadow-md",
                            )}
                          >
                            <div
                              className={cn(
                                "absolute inset-0 opacity-0 bg-gradient-to-br",
                                at.color,
                                selectedType === at.type && "opacity-5",
                              )}
                            />
                            <CardContent className="p-6">
                              <div
                                className={cn(
                                  "h-12 w-12 rounded-xl flex items-center justify-center mb-4",
                                  `bg-gradient-to-br ${at.color} bg-opacity-10`,
                                )}
                              >
                                <at.icon className="h-6 w-6 text-primary" />
                              </div>
                              <h3 className="font-semibold text-lg">
                                {at.label}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                {at.desc}
                              </p>
                              {selectedType === at.type && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="absolute top-3 right-3"
                                >
                                  <CheckCircle className="h-5 w-5 text-primary" />
                                </motion.div>
                              )}
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <Button
                      className="w-full mt-6 h-12 text-base"
                      disabled={!selectedType || loading}
                      onClick={() => setStep(2)}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                      Already have an account?{" "}
                      <Link
                        href="/sign-in"
                        className="text-primary hover:underline font-medium"
                      >
                        Sign in
                      </Link>
                    </p>
                  </motion.div>
                )}

                {step === 2 && selectedType && (
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Account Type Badge */}
                    <div className="flex items-center justify-center mb-6">
                      <span
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r text-white",
                          accountTypes.find((t) => t.type === selectedType)
                            ?.color,
                        )}
                      >
                        {
                          accountTypes.find((t) => t.type === selectedType)
                            ?.label
                        }{" "}
                        Account
                      </span>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative mt-1">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            {...register("name")}
                            placeholder="John Doe"
                            className="pl-9"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.name.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            className="pl-9"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.email.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            {...register("phone")}
                            placeholder="+254 7XX XXX XXX"
                            className="pl-9"
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.phone.message as string}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-9 pr-9"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.password.message as string}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Password Rules */}
                    <PasswordRules password={passwordValue || ""} />

                    {/* Type-specific forms */}
                    {selectedType === "teacher" && (
                      <TeacherForm
                        register={register}
                        errors={errors}
                        watch={watch}
                      />
                    )}

                    {selectedType === "school" && (
                      <SchoolForm
                        register={register}
                        errors={errors}
                        watch={watch}
                        setValue={setValue}
                      />
                    )}

                    {selectedType === "parent" && (
                      <ParentForm register={register} errors={errors} />
                    )}

                    <Button
                      type="submit"
                      className="w-full h-12 text-base"
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Creating account...
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </Button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm text-muted-foreground hover:text-foreground block mx-auto"
                    >
                      ← Back to account type
                    </button>
                  </motion.form>
                )}
              </CardContent>
            </Card>

            {/* Social Sign Up - Only show on step 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-background text-muted-foreground">
                      Or sign up with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignUp("google")}
                    disabled={loading}
                    className="w-full h-11"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialSignUp("facebook")}
                    disabled={loading}
                    className="w-full h-11"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-6 border-t">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>TSC Verified Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-primary" />
              <span>Secure & Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>12,400+ Teachers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
