"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, Banknote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Job {
  id: string;
  title: string;
  school: string;
  location: string;
  salary: string;
  type: "Full-time" | "Part-time" | "Contract";
  subject: string;
  level: string;
  postedAgo: string;
  urgent?: boolean;
}

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.06,
      }}
    >
      <Card className="p-6 hover:ceramic-surface-lg transition-shadow duration-300 press-effect cursor-pointer">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-base leading-tight">
              {job.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">{job.school}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-base">{job.salary}</p>
            <p className="text-muted-foreground text-xs mt-1">{job.type}</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {job.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {job.postedAgo}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Badge variant="secondary">{job.subject}</Badge>
            {job.urgent && <Badge variant="secondary">Urgent</Badge>}
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button size="sm">Apply Now</Button>
        </div>
      </Card>
    </motion.div>
  );
}
