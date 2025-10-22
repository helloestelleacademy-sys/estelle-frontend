import { Book, Inbox, LayoutDashboard, LogOut, MailOpen, Settings, UserCheck2 } from 'lucide-react';

export const NavItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Courses",
    url: "/dashboard/courses",
    icon: Book,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
  },
  {
    title: "Tasks",
    url: "/dashboard/tasks",
    icon: MailOpen,
  },
  {
    title: "Group",
    url: "#",
    icon: UserCheck2,
  },
]

export const NavItems2 =[
  {
    title: "Account",
    url: "/dashboard/profile",
    icon: Settings,
  },
  {
    title: "Log out",
    url: "/",
    icon: LogOut,
  },
]