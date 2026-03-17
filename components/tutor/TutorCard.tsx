"use client";
import { motion } from "framer-motion";
import { Star, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monogram } from "../monogram/Monogram";
import { TSCBadge } from "../tscBadge/TSCBadge";

export interface Tutor {
  id: string;
  name: string;
  subject: string;
  level: string;
  location: string;
  rate: string;
  rating: number;
  reviews: number;
  tscStatus: "verified" | "pending" | "student";
  experience: string;
}

export function TutorCard({
  tutor,
  index = 0,
}: {
  tutor: Tutor;
  index?: number;
}) {
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
        <div className="flex gap-4">
          <Monogram name={tutor.name} className="h-12 w-12 text-lg shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-base">{tutor.name}</h3>
              <TSCBadge status={tutor.tscStatus} />
            </div>
            <p className="text-muted-foreground text-sm mt-0.5">
              {tutor.subject} · {tutor.level}
            </p>
            <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                {tutor.rating} ({tutor.reviews})
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {tutor.location}
              </span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <p className="font-semibold">
                {tutor.rate}
                <span className="text-muted-foreground font-normal text-sm">
                  /hr
                </span>
              </p>
              <Button size="sm">Request Session</Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
