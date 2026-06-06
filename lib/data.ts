// SkillForge Dashboard — typed mock data
// In-universe date: 2026-06-07

export interface Stat {
  label: string;
  value: string;
  sub: string;
  icon: "clipboard" | "gauge" | "timer" | "flame";
}

export interface ActivityItem {
  title: string;
  detail: string;
  time: string;
  type: "assignment" | "skill" | "hackathon";
}

export interface WeeklyActivity {
  day: string; // "Mon".."Sun"
  hours: number; // 0..8
}

export type AssignmentStatus = "in-progress" | "submitted" | "graded";

export interface Assignment {
  id: string;
  title: string;
  course: string;
  due: string;
  status: AssignmentStatus;
  progress: number; // 0..100
  grade?: string; // only when graded
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  name: string;
  level: SkillLevel;
  progress: number; // 0..100
  focus?: boolean; // exactly one skill has focus: true
}

export interface Hackathon {
  id: string;
  name: string;
  date: string;
  format: string; // e.g. "Online" or "Bengaluru, IN"
  theme: string;
  registered?: boolean;
}

export interface PastHackathon {
  name: string;
  date: string;
  placement: string; // e.g. "1st Place", "Finalist"
  project: string;
}

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

export const user = {
  name: "Kartik",
  initials: "KM",
  role: "Developer",
};

// ---------------------------------------------------------------------------
// Stats (4)
// ---------------------------------------------------------------------------

export const stats: Stat[] = [
  {
    label: "Assignments Due",
    value: "3",
    sub: "2 due this week",
    icon: "clipboard",
  },
  {
    label: "Avg Skill Level",
    value: "74%",
    sub: "Up 6 pts this month",
    icon: "gauge",
  },
  {
    label: "Next Hackathon",
    value: "19d",
    sub: "BuildSprint — Jun 26",
    icon: "timer",
  },
  {
    label: "Day Streak",
    value: "14",
    sub: "Personal best: 21",
    icon: "flame",
  },
];

// ---------------------------------------------------------------------------
// Recent Activity (6)
// ---------------------------------------------------------------------------

export const recentActivity: ActivityItem[] = [
  {
    title: "Submitted: Build a REST API with Express",
    detail: "Backend Engineering",
    time: "2h ago",
    type: "assignment",
  },
  {
    title: "Skill leveled up: TypeScript",
    detail: "Intermediate → Advanced",
    time: "Yesterday",
    type: "skill",
  },
  {
    title: "Registered for OpenSource Sprint",
    detail: "Online — Jul 25–27",
    time: "Yesterday",
    type: "hackathon",
  },
  {
    title: "Started: Implement Auth with JWT",
    detail: "Security & Auth",
    time: "2 days ago",
    type: "assignment",
  },
  {
    title: "Completed System Design module 3",
    detail: "Distributed Systems Fundamentals",
    time: "3 days ago",
    type: "skill",
  },
  {
    title: "Graded: Docker Fundamentals Lab",
    detail: "Backend Engineering — A",
    time: "4 days ago",
    type: "assignment",
  },
];

// ---------------------------------------------------------------------------
// Weekly Activity (7 days: Mon..Sun)
// ---------------------------------------------------------------------------

export const weeklyActivity: WeeklyActivity[] = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 4.0 },
  { day: "Wed", hours: 6.5 }, // clear max day
  { day: "Thu", hours: 3.0 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 5.0 },
  { day: "Sun", hours: 0.5 },
];

// ---------------------------------------------------------------------------
// Assignments (8: 3 in-progress, 2 submitted, 3 graded)
// ---------------------------------------------------------------------------

export const assignments: Assignment[] = [
  // in-progress (3)
  {
    id: "a1",
    title: "Implement Auth with JWT",
    course: "Security & Auth",
    due: "Jun 10",
    status: "in-progress",
    progress: 45,
  },
  {
    id: "a2",
    title: "Design a Microservices Architecture",
    course: "System Design",
    due: "Jun 14",
    status: "in-progress",
    progress: 25,
  },
  {
    id: "a3",
    title: "Build a CLI Tool with Node.js",
    course: "Developer Tooling",
    due: "Jun 19",
    status: "in-progress",
    progress: 70,
  },
  // submitted (2)
  {
    id: "a4",
    title: "Build a REST API with Express",
    course: "Backend Engineering",
    due: "Jun 5",
    status: "submitted",
    progress: 100,
  },
  {
    id: "a5",
    title: "Write Unit Tests with Jest",
    course: "Testing Fundamentals",
    due: "Jun 3",
    status: "submitted",
    progress: 100,
  },
  // graded (3)
  {
    id: "a6",
    title: "Docker Fundamentals Lab",
    course: "Backend Engineering",
    due: "May 28",
    status: "graded",
    progress: 100,
    grade: "A",
  },
  {
    id: "a7",
    title: "Optimize SQL Query Performance",
    course: "Database Engineering",
    due: "May 22",
    status: "graded",
    progress: 100,
    grade: "A−",
  },
  {
    id: "a8",
    title: "Deploy a Next.js App to Vercel",
    course: "Full-Stack Fundamentals",
    due: "May 15",
    status: "graded",
    progress: 100,
    grade: "B+",
  },
];

// ---------------------------------------------------------------------------
// Skills (8, exactly one focus: true)
// ---------------------------------------------------------------------------

export const skills: Skill[] = [
  { name: "React", level: "Advanced", progress: 82 },
  { name: "TypeScript", level: "Advanced", progress: 78 },
  { name: "Next.js", level: "Intermediate", progress: 60 },
  { name: "SQL", level: "Intermediate", progress: 55 },
  { name: "Python", level: "Beginner", progress: 28 },
  { name: "Git", level: "Expert", progress: 95 },
  { name: "System Design", level: "Intermediate", progress: 48, focus: true },
  { name: "UI Design", level: "Beginner", progress: 22 },
];

// ---------------------------------------------------------------------------
// Upcoming Hackathons (3, first is featured ~3 weeks out)
// ---------------------------------------------------------------------------

export const upcomingHackathons: Hackathon[] = [
  {
    id: "h1",
    name: "BuildSprint 2026",
    date: "Jun 26–28, 2026",
    format: "Online",
    theme: "Dev Tools for the AI Age",
  },
  {
    id: "h2",
    name: "IndieHack Bengaluru",
    date: "Jul 11–12, 2026",
    format: "Bengaluru, IN",
    theme: "Sustainable Tech",
  },
  {
    id: "h3",
    name: "OpenSource Sprint",
    date: "Jul 25–27, 2026",
    format: "Online",
    theme: "Tooling & Infrastructure",
    registered: true,
  },
];

// ---------------------------------------------------------------------------
// Past Hackathons (3)
// ---------------------------------------------------------------------------

export const pastHackathons: PastHackathon[] = [
  {
    name: "HackIndia Winter 2025",
    date: "Dec 2025",
    placement: "1st Place",
    project: "Codebase Health Monitor",
  },
  {
    name: "BuildSprint 2025",
    date: "Mar 2025",
    placement: "Finalist",
    project: "LocalFirst Sync Engine",
  },
  {
    name: "OpenHack Spring 2026",
    date: "Apr 2026",
    placement: "Top 10",
    project: "PR Review Copilot",
  },
];
