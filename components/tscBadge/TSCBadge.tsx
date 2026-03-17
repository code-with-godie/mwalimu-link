import { CheckCircle2, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TSCStatus = "verified" | "pending" | "student";

const statusConfig = {
  verified: {
    label: "TSC Verified",
    icon: CheckCircle2,
    variant: "default" as const,
  },
  pending: {
    label: "Awaiting TSC",
    icon: Clock,
    variant: "secondary" as const,
  },
  student: {
    label: "Coursework",
    icon: BookOpen,
    variant: "destructive" as const,
  },
};

export function TSCBadge({ status }: { status: TSCStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <Badge variant={config.variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
