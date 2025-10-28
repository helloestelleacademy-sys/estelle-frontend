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

export const testimonials = [
  {
    name: 'Abigail P.',
    img: '/assets/img4.png',
    text: 'I have a full-time job and 3 kids. I needed the flexibility offered by Coursera Plus in order to achieve my goals. My Coursera Plus subscription motivated me to keep learning.',
  },
  {
    name: 'James T.',
    img: '/assets/img4.png',
    text: 'The projects and mentorship were game changers. I learned practical skills that helped me land a remote role as a frontend developer.',
  },
  {
    name: 'Miriam S.',
    img: '/assets/img4.png',
    text: 'The platform kept me accountable and inspired. I finally built confidence in my tech career journey!',
  },
  {
    name: 'Kelvin A.',
    img: '/assets/img4.png',
    text: 'Its like learning from the best minds at your own pace — without pressure.',
  },
]

export const featuredCourses =[
  {
    title:'Building Your Personal Brand from Scratch',
    img:'/assets/courseImg1.jpg',
    time:'1 hour, 30mins',
    price:'35,000',
    level:'Beginner level',
    modules:'10 modules',
  },
  {
    title:'Building Your Personal Brand from Scratch',
    img:'/assets/courseImg1.jpg',
    time:'1 hour, 30mins',
    price:'55,000',
    level:'Intermediate level',
    modules:'10 modules',
  },
  {
    title:'Building Your Personal Brand from Scratch',
    img:'/assets/courseImg2.jpg',
    time:'1 hour, 30mins',
    price:'40,000',
    level:'Beginner level',
    modules:'10 modules',
  },
]