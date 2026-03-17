"use client";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { ParentFormData } from "@/schema/auth";

interface ParentFormProps {
  register: UseFormRegister<ParentFormData>;
  errors: FieldErrors<ParentFormData>;
}

export function ParentForm({ register, errors }: ParentFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="space-y-4 pt-4 border-t"
    >
      <h3 className="font-semibold text-sm">Parent Information</h3>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="childrenCount">Number of Children (optional)</Label>
          {/* <div className="relative mt-1">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="childrenCount"
              {...register("childrenCount")}
              type="number"
              placeholder="2"
              className="pl-9"
            />
          </div> */}
          <p className="text-xs text-muted-foreground mt-1">
            How many children do you have?
          </p>
        </div>
      </div>
    </motion.div>
  );
}
