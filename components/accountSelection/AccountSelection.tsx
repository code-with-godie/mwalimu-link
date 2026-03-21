"use client";

import React, { useState } from "react";
import { TeacherForm } from "@/components/register/TeacherForm";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import { SchoolForm } from "../register/SchoolForm";

type AccountType = "teacher" | "parent" | "admin" | "school" | null;

const AccountSelecion = () => {
  const [selected, setSelected] = useState<AccountType>(null);

  const renderForm = () => {
    switch (selected) {
      case "teacher":
        return <TeacherForm />;
      case "parent":
        return <div>parents selection</div>;
      case "admin":
        return <div>admin selection</div>;
      case "school":
        return <SchoolForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {!selected ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
        >
          {[
            { label: "Teacher", value: "teacher" },
            { label: "Parent", value: "parent" },
            { label: "Admin", value: "admin" },
            { label: "School", value: "school" },
          ].map((item) => (
            <motion.div
              key={item.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className="cursor-pointer shadow-lg"
                onClick={() => setSelected(item.value as AccountType)}
              >
                <CardContent className="flex flex-col items-center justify-center h-32">
                  <h2 className="text-xl font-semibold">{item.label}</h2>
                  <p className="text-sm text-muted-foreground">
                    Register as {item.label}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key={selected}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-xl"
        >
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => setSelected(null)}
          >
            ← Back
          </Button>

          {renderForm()}
        </motion.div>
      )}
    </div>
  );
};

export default AccountSelecion;
