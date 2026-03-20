"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, BookOpen, Briefcase } from "lucide-react";
import { teacherSchema, TeacherFormData } from "@/schema/auth";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
export function TeacherForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
  });
  console.log("form errros", errors);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const onSubmit = async (data: TeacherFormData) => {
    try {
      console.log("Submitted Data:", data);

      // simulate API
      await new Promise((res) => setTimeout(res, 1500));

      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* RIGHT - LOTTIE (HIDDEN ON MOBILE) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex justify-center"
        >
          <Player
            autoplay
            loop
            src="/coding.json"
            style={{ height: "400px", width: "400px" }}
          />
        </motion.div>
        {/* LEFT - FORM */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 bg-white dark:bg-background p-6 rounded-2xl shadow-lg"
          >
            <h2 className="text-xl font-semibold">Teacher Professional Info</h2>

            {/* TSC */}
            <div>
              <Label>TSC Number (optional)</Label>
              <div className="relative mt-1">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("tscNumber")}
                  placeholder="TSC/XXXXX"
                  className="pl-9"
                />
              </div>
              {errors.tscNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.tscNumber.message}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <Label>Years of Experience</Label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("experience", { valueAsNumber: true })}
                  type="number"
                  placeholder={5 + " years"}
                  className="pl-9"
                />
              </div>
              {errors.experience && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Subjects */}
            <div>
              <Label>Subjects</Label>
              <div className="relative mt-1">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("subjects")}
                  placeholder="Math, Physics"
                  className="pl-9"
                />
              </div>
              {errors.subjects && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.subjects.message}
                </p>
              )}
            </div>

            {/* Qualifications */}
            <div>
              <Label>Qualifications</Label>

              <Select
                onValueChange={(value) => {
                  setSelectedOption(value);

                  if (value !== "other") {
                    setValue("qualifications", value);
                  } else {
                    setValue("qualifications", "");
                  }
                }}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select qualification" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="diploma">Diploma in Education</SelectItem>
                  <SelectItem value="bed">B.Ed</SelectItem>
                  <SelectItem value="pgde">PGDE</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="awaiting">Awaiting Graduation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              {selectedOption === "other" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3"
                >
                  <Input
                    placeholder="Enter your qualification"
                    onChange={(e) => setValue("qualifications", e.target.value)}
                  />
                </motion.div>
              )}

              {errors.qualifications && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.qualifications.message}
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
