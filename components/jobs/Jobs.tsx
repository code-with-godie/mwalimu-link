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
import { mockJobs } from "@/data/mockData";
import { JobCard } from "@/components/jobs/JobCard";

const ease = [0.16, 1, 0.3, 1] as const;

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const filtered = mockJobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.school.toLowerCase().includes(search.toLowerCase());
    const matchSubject =
      subjectFilter === "all" || job.subject === subjectFilter;
    return matchSearch && matchSubject;
  });

  const subjects = [...new Set(mockJobs.map((j) => j.subject))];

  return (
    <div className="min-h-screen flex flex-col flex-1 items-center">
      <div className="container py-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Teaching Jobs
          </h1>
          <p className="text-muted-foreground mt-1">
            {filtered.length} positions available
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs or schools..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 mt-6">
          {filtered.map((job, i) => (
            <JobCard key={job.id} job={job} index={i} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No jobs found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
