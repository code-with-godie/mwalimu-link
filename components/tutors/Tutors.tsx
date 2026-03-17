"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockTutors } from "@/data/mockData";
import { TutorCard } from "../tutor/TutorCard";

const ease = [0.16, 1, 0.3, 1] as const;

const Tutors = () => {
  const [search, setSearch] = useState("");
  const [tscFilter, setTscFilter] = useState("all");

  const filtered = mockTutors.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchTsc = tscFilter === "all" || t.tscStatus === tscFilter;
    return matchSearch && matchTsc;
  });

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="container py-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Find a Tutor
          </h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} verified tutors available
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or subject..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={tscFilter} onValueChange={setTscFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="TSC Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">TSC Verified</SelectItem>
              <SelectItem value="pending">Awaiting TSC</SelectItem>
              <SelectItem value="student">Coursework</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 mt-6">
          {filtered.map((tutor, i) => (
            <TutorCard key={tutor.id} tutor={tutor} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No tutors found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tutors;
