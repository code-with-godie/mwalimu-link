import { useState } from "react";
import { motion } from "framer-motion";

import { GraduationCap, School, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

type AccountType = "teacher" | "school" | "admin" | "parent";

const accountTypes: {
  type: AccountType;
  label: string;
  desc: string;
  icon: React.ElementType;
}[] = [
  {
    type: "teacher",
    label: "Teacher",
    desc: "Find jobs and tutor students",
    icon: GraduationCap,
  },
  {
    type: "school",
    label: "School / Institution",
    desc: "Post jobs and hire teachers",
    icon: School,
  },
  { type: "admin", label: "Admin", desc: "Manage the platform", icon: Shield },
  {
    type: "parent",
    label: "Parent",
    desc: "Find tutors and resources",
    icon: Users,
  },
];

const Register = () => {
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            {step === 1 && (
              <>
                <h1 className="text-2xl font-bold tracking-tight text-center">
                  Create your account
                </h1>
                <p className="text-muted-foreground text-center mt-1">
                  Select your account type to get started.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {accountTypes.map((at) => (
                    <Card
                      key={at.type}
                      onClick={() => setSelectedType(at.type)}
                      className={cn(
                        "p-4 cursor-pointer press-effect transition-all",
                        selectedType === at.type
                          ? "ring-2 ring-primary border-primary"
                          : "hover:border-primary/30",
                      )}
                    >
                      <at.icon className="h-6 w-6 text-primary mb-2" />
                      <h3 className="font-semibold text-sm">{at.label}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {at.desc}
                      </p>
                    </Card>
                  ))}
                </div>
                <Button
                  className="w-full mt-6"
                  disabled={!selectedType}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <h1 className="text-2xl font-bold tracking-tight text-center">
                  Your details
                </h1>
                <p className="text-muted-foreground text-center mt-1 capitalize">
                  {selectedType} account
                </p>
                <div className="space-y-4 mt-8">
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Phone Number</Label>
                    <Input placeholder="+254 7XX XXX XXX" className="mt-1" />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      placeholder="Create a password"
                      className="mt-1"
                    />
                  </div>
                  {selectedType === "teacher" && (
                    <div>
                      <Label>TSC Number (optional)</Label>
                      <Input
                        placeholder="TSC/XXXX"
                        className="mt-1 font-mono"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave blank if awaiting or in coursework.
                      </p>
                    </div>
                  )}
                  {selectedType === "school" && (
                    <div>
                      <Label>Institution Name</Label>
                      <Input
                        placeholder="School or institution name"
                        className="mt-1"
                      />
                    </div>
                  )}
                  <Button className="w-full">Create Account</Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/sign-in"
                      className="text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-muted-foreground hover:text-foreground mt-4 block mx-auto"
                >
                  ← Back to account type
                </button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
