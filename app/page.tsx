"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GitBranch,
  ChevronRight,
  ChevronDown,
  Settings,
  LogOut,
  LayoutDashboard,
  Sparkles,
  MapPin,
  MoreHorizontal,
  Home as HomeIcon,
  UserCircle,
  HelpCircle,
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
import { cn } from "@/lib/utils";

// Organizations
const organizations = [
  { id: 'gitroll', name: 'GitRoll' },
  { id: 'acme', name: 'Acme Inc' },
  { id: 'techcorp', name: 'TechCorp' },
];

// Main navigation items
const mainNavItems = [
  { title: 'Home', url: '#', icon: HomeIcon },
  { title: 'Skill Maps', url: '#', icon: MapPin },
  { title: 'Ask AI', url: '#', icon: Sparkles },
];

// Structure teams, people, and repos by organization
const teamsByOrg: Record<string, Array<{ id: string; name: string; avatar: string; orgId: string }>> = {
  gitroll: [
    { 
      id: "frontend", 
      name: "Frontend Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=frontend&backgroundColor=6366f1",
      orgId: "gitroll"
    },
    { 
      id: "backend", 
      name: "Backend Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=backend&backgroundColor=10b981",
      orgId: "gitroll"
    },
    { 
      id: "devops", 
      name: "DevOps Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=devops&backgroundColor=f59e0b",
      orgId: "gitroll"
    },
    { 
      id: "mobile", 
      name: "Mobile Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=mobile&backgroundColor=ec4899",
      orgId: "gitroll"
    },
    {
      id: "data",
      name: "Data & Analytics",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=data&backgroundColor=06b6d4",
      orgId: "gitroll"
    },
    {
      id: "security",
      name: "Security",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=security&backgroundColor=8b5cf6",
      orgId: "gitroll"
    },
  ],
  acme: [
    { 
      id: "sales", 
      name: "Sales Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=sales&backgroundColor=ef4444",
      orgId: "acme"
    },
    { 
      id: "marketing", 
      name: "Marketing Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=marketing&backgroundColor=10b981",
      orgId: "acme"
    },
    { 
      id: "support", 
      name: "Support Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=support&backgroundColor=f59e0b",
      orgId: "acme"
    },
    {
      id: "engineering",
      name: "Engineering Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=engineering&backgroundColor=6366f1",
      orgId: "acme"
    },
  ],
  techcorp: [
    { 
      id: "product", 
      name: "Product Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=product&backgroundColor=8b5cf6",
      orgId: "techcorp"
    },
    { 
      id: "qa", 
      name: "QA Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=qa&backgroundColor=06b6d4",
      orgId: "techcorp"
    },
    { 
      id: "infrastructure", 
      name: "Infrastructure Team",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=infrastructure&backgroundColor=ec4899",
      orgId: "techcorp"
    },
  ],
};

const repositoriesByOrg: Record<string, Array<{ id: string; name: string; orgId: string }>> = {
  gitroll: [
    { id: "web-app", name: "web-app", orgId: "gitroll" },
    { id: "api-server", name: "api-server", orgId: "gitroll" },
    { id: "mobile-app", name: "mobile-app", orgId: "gitroll" },
    { id: "shared-libs", name: "shared-libs", orgId: "gitroll" },
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
      id: "john-doe", 
      name: "John Doe", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll"
    },
    { 
      id: "jane-smith", 
      name: "Jane Smith", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll"
    },
    { 
      id: "mike-wilson", 
      name: "Mike Wilson", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll"
    },
    { 
      id: "sarah-johnson", 
      name: "Sarah Johnson", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll"
    },
    { 
      id: "alex-chen", 
      name: "Alex Chen", 
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll"
    },
    { 
      id: "emily-brown", 
      name: "Emily Brown", 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll"
    },
    {
      id: "priya-patel",
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya-patel",
      orgId: "gitroll"
    },
    {
      id: "daniel-kim",
      name: "Daniel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim",
      orgId: "gitroll"
    },
    {
      id: "sofia-garcia",
      name: "Sofia Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia-garcia",
      orgId: "gitroll"
    },
    {
      id: "noah-lee",
      name: "Noah Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah-lee",
      orgId: "gitroll"
    },
  ],
  acme: [
    { 
      id: "sarah-johnson", 
      name: "Sarah Johnson", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      orgId: "acme"
    },
    { 
      id: "emily-brown", 
      name: "Emily Brown", 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      orgId: "acme"
    },
    {
      id: "daniel-kim",
      name: "Daniel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim",
      orgId: "acme"
    },
    {
      id: "sofia-garcia",
      name: "Sofia Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia-garcia",
      orgId: "acme"
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james-wilson",
      orgId: "acme"
    },
    {
      id: "lisa-anderson",
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa-anderson",
      orgId: "acme"
    },
  ],
  techcorp: [
    { 
      id: "robert-taylor", 
      name: "Robert Taylor", 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert-taylor",
      orgId: "techcorp"
    },
    { 
      id: "maria-rodriguez", 
      name: "Maria Rodriguez", 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria-rodriguez",
      orgId: "techcorp"
    },
    {
      id: "david-martinez",
      name: "David Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david-martinez",
      orgId: "techcorp"
    },
    {
      id: "jennifer-white",
      name: "Jennifer White",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer-white",
      orgId: "techcorp"
    },
  ],
};

export default function Home() {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]!);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [showAllPeople, setShowAllPeople] = useState(false);

  // Get teams, people, and repos for selected organization
  const teams = React.useMemo(() => teamsByOrg[selectedOrg.id] || [], [selectedOrg.id]);
  const repositories = React.useMemo(() => repositoriesByOrg[selectedOrg.id] || [], [selectedOrg.id]);
  const people = React.useMemo(() => peopleByOrg[selectedOrg.id] || [], [selectedOrg.id]);

  // Reset show/hide states when org changes
  React.useEffect(() => {
    setShowAllTeams(false);
    setShowAllRepos(false);
    setShowAllPeople(false);
  }, [selectedOrg.id]);

  const visibleTeams = showAllTeams ? teams : teams.slice(0, 3);
  const visibleRepos = showAllRepos ? repositories : repositories.slice(0, 2);
  const visiblePeople = showAllPeople ? people : people.slice(0, 2);

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="border-b border-sidebar-border p-2">
          {/* Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-sidebar-accent">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                    {selectedOrg.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-sm">{selectedOrg.name}</span>
                </div>
                <ChevronDown className="size-4" />
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
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-primary-foreground text-xs font-bold">
                    {org.name.charAt(0)}
                  </div>
                  <span>{org.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                {mainNavItems.map((item) => (
                  <SidebarMenuItem className="h-10 font-medium" key={item.title}>
                    <SidebarMenuButton asChild>
                      <a className="h-10 font-medium" href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Teams */}
          {teams.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                Teams
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleTeams.map((team) => (
                    <SidebarMenuItem key={team.id}>
                      <SidebarMenuButton asChild>
                        <a href={`/team/${team.id}/overview`}>
                          <Image
                            src={team.avatar}
                            alt={team.name}
                            width={16}
                            height={16}
                            className="rounded"
                            unoptimized
                          />
                          <span className="text-sm font-medium">{team.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {teams.length > 3 && (
                    <SidebarMenuItem>
                      <button
                        onClick={() => setShowAllTeams(!showAllTeams)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                        <span>{showAllTeams ? 'Show less' : 'More'}</span>
                      </button>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* People */}
          {people.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                People
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visiblePeople.map((person) => (
                    <SidebarMenuItem key={person.id}>
                      <SidebarMenuButton asChild>
                        <a href={`/user/${person.id}/overview`}>
                          <Image
                            src={person.avatar}
                            alt={person.name}
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                            unoptimized
                          />
                          <span className="text-sm font-medium">{person.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {people.length > 2 && (
                    <SidebarMenuItem>
                      <button
                        onClick={() => setShowAllPeople(!showAllPeople)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                        <span>{showAllPeople ? 'Show less' : 'More'}</span>
                      </button>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Repositories */}
          {repositories.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                Repositories
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleRepos.map((repo) => (
                    <SidebarMenuItem key={repo.id}>
                      <SidebarMenuButton asChild>
                        <a href={`/repo/${repo.id}/overview`}>
                          <GitBranch className="size-3" />
                          <span className="font-mono text-sm font-medium">{repo.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {repositories.length > 2 && (
                    <SidebarMenuItem>
                      <button
                        onClick={() => setShowAllRepos(!showAllRepos)}
                        className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="size-4" />
                        <span>{showAllRepos ? 'Show less' : 'More'}</span>
                      </button>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border p-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="h-auto w-full py-2">
                <Image
                  src={people.length > 0 ? people[0]!.avatar : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"}
                  alt="User"
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
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <LayoutDashboard className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Project Management & Task Tracking</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-2xl space-y-6 text-center">
            <h3 className="text-lg font-semibold">Clean Sidebar Navigation</h3>
            <p className="text-muted-foreground leading-relaxed">
              A minimal sidebar with organization switcher at top, flat main navigation, 
              and collapsible sections for teams, people, and repositories with &quot;Show more&quot; buttons.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t pt-6">
              <Button asChild variant="default" size="sm">
                <Link href="/">Variant One</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/variant-two">Variant Two</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/variant-three">Variant Three</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/variant-four">One/Team</Link>
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
