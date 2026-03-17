"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  MoreHorizontal,
  User,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Ban,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { User as UserType, UserRole } from "@/typing";

const isBanned = (user: UserType): boolean => {
  if (!user.banned) return false;
  if (user.banExpires && new Date() > new Date(user.banExpires)) {
    return false;
  }
  return true;
};

const getUserDisplayName = (user: UserType): string => {
  return user.name ? user.name : user.email.split("@")[0];
};

// User Badge Component
export function UserBadge({ user }: { user: UserType }) {
  const getRoleConfig = (role: UserRole) => {
    const configs = {
      [UserRole.ADMIN]: {
        icon: ShieldAlert,
        bgColor: "bg-red-500/10",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        label: "Admin",
      },
      [UserRole.SUPER_ADMIN]: {
        icon: ShieldCheck,
        bgColor: "bg-purple-500/10",
        textColor: "text-purple-700",
        borderColor: "border-purple-200",
        label: "Super Admin",
      },
      [UserRole.MODERATOR]: {
        icon: Shield,
        bgColor: "bg-blue-500/10",
        textColor: "text-blue-700",
        borderColor: "border-blue-200",
        label: "Moderator",
      },
      [UserRole.EDITOR]: {
        icon: Shield,
        bgColor: "bg-green-500/10",
        textColor: "text-green-700",
        borderColor: "border-green-200",
        label: "Editor",
      },
      // [UserRole.VIEWER]: {
      //   icon: User,
      //   bgColor: "bg-gray-500/10",
      //   textColor: "text-gray-700",
      //   borderColor: "border-gray-200",
      //   label: "Viewer"
      // },
      [UserRole.USER]: {
        icon: User,
        bgColor: "bg-gray-500/10",
        textColor: "text-gray-700",
        borderColor: "border-gray-200",
        label: "User",
      },
    };

    return configs[role] || configs[UserRole.USER];
  };

  const getStatusConfig = (user: UserType) => {
    if (isBanned(user)) {
      return {
        icon: Ban,
        bgColor: "bg-red-500/10",
        textColor: "text-red-700",
        borderColor: "border-red-200",
        label: "Banned",
      };
    }

    if (user.emailVerified) {
      return {
        icon: CheckCircle2,
        bgColor: "bg-green-500/10",
        textColor: "text-green-700",
        borderColor: "border-green-200",
        label: "Verified",
      };
    }

    return {
      icon: XCircle,
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
      label: "Unverified",
    };
  };

  const roleConfig = getRoleConfig(user.role);
  const statusConfig = getStatusConfig(user);
  const RoleIcon = roleConfig.icon;
  const StatusIcon = statusConfig.icon;

  return (
    <div className="flex flex-wrap gap-2">
      {/* Role Badge */}
      <div
        className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
          roleConfig.bgColor,
          roleConfig.textColor,
          roleConfig.borderColor
        )}
      >
        <RoleIcon className="h-3 w-3" />
        <span>{roleConfig.label}</span>
      </div>

      {/* Status Badge */}
      <div
        className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
          statusConfig.bgColor,
          statusConfig.textColor,
          statusConfig.borderColor
        )}
      >
        <StatusIcon className="h-3 w-3" />
        <span>{statusConfig.label}</span>
      </div>
    </div>
  );
}

// User Avatar Component
export function UserAvatar({ user }: { user: UserType }) {
  return (
    <div className="flex items-center gap-3">
      {user.image ? (
        <img
          src={user.image}
          alt={user.name || user.email}
          className="h-8 w-8 rounded-full"
        />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
          {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-medium text-sm">{getUserDisplayName(user)}</span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>
    </div>
  );
}

// Format date utility
function formatDate(date: Date | string | undefined): string {
  if (!date) return "Never";
  const d = new Date(date);
  return d.toLocaleDateString();
}

function formatDateTime(date: Date | string | undefined): string {
  if (!date) return "Never";
  const d = new Date(date);
  return d.toLocaleString();
}

// Columns definition
export const columns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return <UserAvatar user={user} />;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return <div className="font-mono text-sm">{email}</div>;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;
      return <UserBadge user={user} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;

      if (isBanned(user)) {
        return (
          <div className="flex items-center gap-2">
            <Ban className="h-4 w-4 text-red-500" />
            <span className="text-red-600 font-medium">Banned</span>
            {user.banReason && (
              <span className="text-xs text-gray-500">({user.banReason})</span>
            )}
          </div>
        );
      }

      if (user.emailVerified) {
        return (
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span className="text-green-600 font-medium">Active</span>
          </div>
        );
      }

      return (
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-yellow-500" />
          <span className="text-yellow-600 font-medium">Unverified</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div className="text-sm">
          <div>{formatDate(date)}</div>
          <div className="text-xs text-gray-500">
            {new Date(date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.email)}
            >
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/users/${user.id}`}>
                View User Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/users/${user.id}/edit`}>Edit User</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!user.banned ? (
              <DropdownMenuItem className="text-red-600">
                Ban User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-green-600">
                Unban User
              </DropdownMenuItem>
            )}
            {user.role !== UserRole.ADMIN && (
              <DropdownMenuItem>Make Admin</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Optional: Filter components for the table
export const roleFilterOptions = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: UserRole.ADMIN },
  { label: "Moderator", value: UserRole.MODERATOR },
  { label: "Editor", value: UserRole.EDITOR },
  { label: "User", value: UserRole.USER },
  // { label: "Viewer", value: UserRole.VIEWER },
];

export const statusFilterOptions = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Banned", value: "banned" },
  { label: "Unverified", value: "unverified" },
];
