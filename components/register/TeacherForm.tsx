"use client";

import { UseFormRegister, FieldErrors, UseFormWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, FileText, BookOpen, Briefcase } from "lucide-react";
import { TeacherFormData } from "@/schema/auth";

interface TeacherFormProps {
  register: UseFormRegister<TeacherFormData>;
  errors: FieldErrors<TeacherFormData>;
  watch: UseFormWatch<TeacherFormData>;
}

export function TeacherForm({ register, errors, watch }: TeacherFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 pt-4 border-t"
    >
      <h3 className="font-semibold text-sm">Professional Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label
            className="block text-sm font-medium text-left mb-1"
            htmlFor="tscNumber"
          >
            TSC Number (optional)
          </Label>
          <div className="relative mt-1">
            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="tscNumber"
              {...register("tscNumber")}
              placeholder="TSC/XXXXX"
              className="pl-9 font-mono"
            />
          </div>
          {errors.tscNumber && (
            <p className="text-xs text-destructive mt-1">
              {errors.tscNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label
            className="block text-sm font-medium text-left mb-1"
            htmlFor="experience"
          >
            Years of Experience
          </Label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="experience"
              {...register("experience")}
              type="number"
              placeholder="5"
              className="pl-9"
            />
          </div>
          {errors.experience && (
            <p className="text-xs text-destructive mt-1">
              {errors.experience.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label
            className="block text-sm font-medium text-left mb-1"
            htmlFor="subjects"
          >
            Subjects
          </Label>
          <div className="relative mt-1">
            <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="subjects"
              {...register("subjects")}
              placeholder="Mathematics, Physics, Chemistry"
              className="pl-9"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Separate subjects with commas
          </p>
          {errors.subjects && (
            <p className="text-xs text-destructive mt-1">
              {errors.subjects.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label
            className="block text-sm font-medium text-left mb-1"
            htmlFor="qualifications"
          >
            Qualifications
          </Label>
          <div className="relative mt-1">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="qualifications"
              {...register("qualifications")}
              placeholder="B.Ed, PGDE, etc."
              className="pl-9"
            />
          </div>
          {errors.qualifications && (
            <p className="text-xs text-destructive mt-1">
              {errors.qualifications.message}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
