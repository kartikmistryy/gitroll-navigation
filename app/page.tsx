"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Home as HomeIcon,
  UserCircle,
  HelpCircle,
  Book,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/animate-ui/components/radix/sidebar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Tab groups per view type
const tabsByView: Record<string, string[]> = {
  org: ['Overview', 'Performance', 'SPOF', 'Outliers', 'SkillsGraph', 'AI Consultant'],
  repo: ['Overview', 'Performance', 'Contributors', 'Code Quality', 'Settings'],
  person: ['Overview', 'Performance', 'Skills', 'Activity', 'Code Reviews'],
};

// Organizations
const organizations = [
  { id: 'gitroll', name: 'Gitroll' },
  { id: 'acme', name: 'Acme Inc' },
  { id: 'techcorp', name: 'TechCorp' },
];

// Main navigation items
const mainNavItems = [
  { title: 'Home', url: '#', icon: HomeIcon },
  { title: 'SkillsGraph', url: '#', icon: LayoutDashboard },
  { title: 'Ask AI', url: '#', icon: Sparkles },
];

const repositoriesByOrg: Record<string, Array<{ id: string; name: string; orgId: string }>> = {
  gitroll: [
    { id: "browser-sdk", name: "browser-sdk", orgId: "gitroll" },
    { id: "datadog-agent", name: "datadog-agent", orgId: "gitroll" },
    { id: "web-app", name: "web-app", orgId: "gitroll" },
    { id: "api-server", name: "api-server", orgId: "gitroll" },
    { id: "mobile-app", name: "mobile-app", orgId: "gitroll" },
    { id: "shared-libs", name: "shared-libs", orgId: "gitroll" },
    { id: "infra-tools", name: "infra-tools", orgId: "gitroll" },
    { id: "docs-site", name: "docs-site", orgId: "gitroll" },
    { id: "cli-tools", name: "cli-tools", orgId: "gitroll" },
    { id: "design-system", name: "design-system", orgId: "gitroll" },
    { id: "analytics-lib", name: "analytics-lib", orgId: "gitroll" },
    { id: "auth-service", name: "auth-service", orgId: "gitroll" },
  ],
  acme: [
    { id: "crm-app", name: "crm-app", orgId: "acme" },
    { id: "marketing-site", name: "marketing-site", orgId: "acme" },
    { id: "support-portal", name: "support-portal", orgId: "acme" },
  ],
  techcorp: [
    { id: "platform-core", name: "platform-core", orgId: "techcorp" },
    { id: "analytics-engine", name: "analytics-engine", orgId: "techcorp" },
  ],
};

const peopleByOrg: Record<string, Array<{ id: string; name: string; avatar: string; orgId: string }>> = {
  gitroll: [
    {
      id: "andrew-lock",
      name: "Andrew Lock",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
    },
    {
      id: "sylvain-afchain",
      name: "Sylvain Afchain",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
    },
    {
      id: "jane-smith",
      name: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
    },
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
    },
    {
      id: "alex-chen",
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
    },
    {
      id: "emily-brown",
      name: "Emily Brown",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
    },
    {
      id: "priya-patel",
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya-patel",
      orgId: "gitroll",
    },
  ],
  acme: [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      orgId: "acme",
    },
    {
      id: "emily-brown",
      name: "Emily Brown",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      orgId: "acme",
    },
    {
      id: "daniel-kim",
      name: "Daniel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim",
      orgId: "acme",
    },
  ],
  techcorp: [
    {
      id: "robert-taylor",
      name: "Robert Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert-taylor",
      orgId: "techcorp",
    },
    {
      id: "maria-rodriguez",
      name: "Maria Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria-rodriguez",
      orgId: "techcorp",
    },
  ],
};

export default function Home() {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]!);
  const [activeNav, setActiveNav] = useState('Home');
  const [activeView, setActiveView] = useState<'org' | 'repo' | 'person'>('org');
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedEntityName, setSelectedEntityName] = useState<string | null>(null);

  const allRepositories = React.useMemo(() => repositoriesByOrg[selectedOrg.id] || [], [selectedOrg.id]);
  const allPeople = React.useMemo(() => peopleByOrg[selectedOrg.id] || [], [selectedOrg.id]);

  const visibleRepos = allRepositories.slice(0, 2);
  const visiblePeople = allPeople.slice(0, 2);

  const currentTabs = tabsByView[activeView];
  const displayName = activeView === 'org' ? selectedOrg.name : selectedEntityName || selectedOrg.name;
  const displayDescription = activeView === 'org'
    ? 'Monitor performance and AI insights in real time.'
    : activeView === 'repo'
      ? 'Repository performance and code quality metrics.'
      : 'Individual performance and contribution insights.';

  const handleSelectRepo = (repoName: string) => {
    setActiveView('repo');
    setSelectedEntityName(repoName);
    setActiveTab('Overview');
  };

  const handleSelectPerson = (personName: string) => {
    setActiveView('person');
    setSelectedEntityName(personName);
    setActiveTab('Overview');
  };

  // Reset to org view when nav Home is clicked or org changes
  React.useEffect(() => {
    setActiveView('org');
    setSelectedEntityName(null);
    setActiveTab('Overview');
  }, [selectedOrg.id]);

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="p-4 pb-0">
          {/* Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-lg py-1 hover:bg-sidebar-accent px-1">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-white text-xs font-bold">
                    {selectedOrg.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="font-semibold text-sm">{selectedOrg.name}</span>
                </div>
                <ChevronDown className="size-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {organizations.map((org) => (
                <DropdownMenuItem
                  key={org.id}
                  onClick={() => setSelectedOrg(org)}
                  className={cn(
                    'flex items-center gap-2',
                    selectedOrg.id === org.id && 'bg-accent',
                  )}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500 text-white text-xs font-bold">
                    {org.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span>{org.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto px-2 mt-4">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={activeNav === item.title}
                      onClick={() => {
                        setActiveNav(item.title);
                        if (item.title === 'Home') {
                          setActiveView('org');
                          setSelectedEntityName(null);
                          setActiveTab('Overview');
                        }
                      }}
                      className={cn(
                        "h-9 font-medium rounded-md cursor-pointer!",
                        activeNav === item.title && "bg-[#171717]! text-white! hover:bg-[#171717]/90! hover:text-white!"
                      )}
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Repositories */}
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 flex items-center gap-2">
              <Book className="size-3.5" />
              <span className="text-sm font-medium text-foreground">Repositories</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleRepos.map((repo) => (
                  <SidebarMenuItem key={repo.id}>
                    <SidebarMenuButton
                      className="h-8 pl-6 cursor-pointer!"
                      onClick={() => handleSelectRepo(repo.name)}
                      isActive={activeView === 'repo' && selectedEntityName === repo.name}
                    >
                      <Book className="size-3.5 text-muted-foreground" />
                      <span className="text-sm">{repo.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <button className="pl-6 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    View all ({allRepositories.length})
                  </button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* People */}
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 flex items-center gap-2">
              <Users className="size-3.5" />
              <span className="text-sm font-medium text-foreground">People</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visiblePeople.map((person) => (
                  <SidebarMenuItem key={person.id}>
                    <SidebarMenuButton
                      className="h-8 pl-6 cursor-pointer!"
                      onClick={() => handleSelectPerson(person.name)}
                      isActive={activeView === 'person' && selectedEntityName === person.name}
                    >
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        width={20}
                        height={20}
                        className="rounded-full object-cover size-5"
                        unoptimized
                      />
                      <span className="text-sm">{person.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <button className="pl-6 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    View all ({allPeople.length})
                  </button>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-auto w-full py-2">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                  alt="John Doe"
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                  unoptimized
                />
                <div className="flex flex-1 flex-col items-start text-left">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">Admin</span>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserCircle className="size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="size-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <LogOut className="size-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        {/* Search bar */}
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm text-muted-foreground w-full max-w-md">
            <Search className="size-4" />
            <span>Search or type a command</span>
            <kbd className="ml-auto rounded bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘F
            </kbd>
          </div>
        </header>

        <main className="flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
          {/* Page header with title + tabs */}
          <div className="border-b bg-white dark:bg-zinc-900 px-8 pt-8">
            <h1 className="text-3xl font-bold tracking-tight">{displayName}</h1>
            <p className="mt-1 text-muted-foreground">{displayDescription}</p>

            {/* Tab group */}
            <div className="mt-6 flex items-center gap-6 overflow-x-auto">
              {currentTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-3 text-sm font-medium cursor-pointer whitespace-nowrap transition-colors border-b-2",
                    activeTab === tab
                      ? "border-[#171717] text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="flex-1 p-8">
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <Button asChild variant="default" size="sm">
                <Link href="/">Variant One</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/variant-two">Variant Two</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/variant-three">Variant Three</Link>
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
