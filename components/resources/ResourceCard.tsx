"use client";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface Resource {
  id: string;
  title: string;
  subject: string;
  level: string;
  price: string;
  type: string;
  pages: number;
  downloads: number;
}

export function ResourceCard({
  resource,
  index = 0,
}: {
  resource: Resource;
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
      <Card className="overflow-hidden hover:ceramic-surface-lg transition-shadow duration-300 press-effect cursor-pointer">
        <div className="aspect-[3/4] bg-secondary flex items-center justify-center relative">
          <FileText className="h-16 w-16 text-muted-foreground/30" />
          <Badge variant="secondary" className="absolute top-3 left-3">
            {resource.type}
          </Badge>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">
            {resource.title}
          </h3>
          <p className="text-muted-foreground text-xs mt-1">
            {resource.subject} · {resource.level}
          </p>
          <div className="flex items-center justify-between mt-3">
            <p className="font-semibold text-base">{resource.price}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Download className="h-3 w-3" />
              {resource.downloads}
            </div>
          </div>
          <Button size="sm" className="w-full mt-3">
            Purchase
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
