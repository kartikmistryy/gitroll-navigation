"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Users,
  GitBranch,
  User,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarSeparator,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

// Sub-pages for each dashboard type
const orgSubPages = [
  { label: "Overview", href: "/org/overview" },
  { label: "Benchmarks", href: "/org/benchmarks" },
  { label: "Risks", href: "/org/risks" },
  { label: "Quality", href: "/org/quality" },
  { label: "People", href: "/org/people" },
];

const teams = [
  { 
    id: "frontend", 
    name: "Frontend Team",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=frontend&backgroundColor=6366f1"
  },
  { 
    id: "backend", 
    name: "Backend Team",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=backend&backgroundColor=10b981"
  },
  { 
    id: "devops", 
    name: "DevOps Team",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=devops&backgroundColor=f59e0b"
  },
  { 
    id: "mobile", 
    name: "Mobile Team",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=mobile&backgroundColor=ec4899"
  },
  {
    id: "data",
    name: "Data & Analytics",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=data&backgroundColor=06b6d4"
  },
  {
    id: "security",
    name: "Security",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=security&backgroundColor=8b5cf6"
  },
];

const teamSubPages = [
  { label: "Overview", href: "overview" },
  { label: "Benchmarks", href: "benchmarks" },
  { label: "Risks", href: "risks" },
  { label: "Quality", href: "quality" },
  { label: "Members", href: "members" },
];

const repositories = [
  { id: "web-app", name: "web-app" },
  { id: "api-server", name: "api-server" },
  { id: "mobile-app", name: "mobile-app" },
  { id: "shared-libs", name: "shared-libs" },
];

const repoSubPages = [
  { label: "Overview", href: "overview" },
  { label: "Benchmarks", href: "benchmarks" },
  { label: "Risks", href: "risks" },
  { label: "Quality", href: "quality" },
  { label: "Contributors", href: "contributors" },
];

const people = [
  { 
    id: "john-doe", 
    name: "John Doe", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: "jane-smith", 
    name: "Jane Smith", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: "mike-wilson", 
    name: "Mike Wilson", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: "sarah-johnson", 
    name: "Sarah Johnson", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: "alex-chen", 
    name: "Alex Chen", 
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
  },
  { 
    id: "emily-brown", 
    name: "Emily Brown", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya-patel"
  },
  {
    id: "daniel-kim",
    name: "Daniel Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim"
  },
  {
    id: "sofia-garcia",
    name: "Sofia Garcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia-garcia"
  },
  {
    id: "noah-lee",
    name: "Noah Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah-lee"
  },
];

const userSubPages = [
  { label: "Overview", href: "overview" },
  { label: "Benchmarks", href: "benchmarks" },
  { label: "Contributions", href: "contributions" },
  { label: "Activity", href: "activity" },
];

export default function Home() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    organization: true,
    teams: false,
    repositories: false,
    people: false,
  });

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleItem = (item: string) => {
    setExpandedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              GR
            </div>
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">
              GitRoll
            </span>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          {/* Organization Dashboard */}
          <SidebarGroup>
            <Collapsible
              open={openSections.organization}
              onOpenChange={() => toggleSection("organization")}
            >
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="group/label h-10 w-full cursor-pointer justify-between pr-2 hover:bg-sidebar-accent">
                  <div className="flex items-center gap-2 ">
                    <Building2 className="size-4" />
                    <span>Organization</span>
                  </div>
                  <ChevronRight
                    className={`size-4 transition-transform duration-200 ${
                      openSections.organization ? "rotate-90" : ""
                    }`}
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="ml-5">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {orgSubPages.map((page) => (
                      <SidebarMenuItem key={page.label} className="h-10">
                        <SidebarMenuButton asChild className="h-10">
                          <a className="text-sm" href={page.href}>
                            <span>{page.label}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Teams Dashboard */}
          <SidebarGroup>
            <Collapsible
              open={openSections.teams}
              onOpenChange={() => toggleSection("teams")}
            >
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="group/label h-10 w-full cursor-pointer justify-between pr-2 hover:bg-sidebar-accent">
                  <div className="flex items-center gap-2">
                    <Users className="size-4" />
                    <span>Teams</span>
                  </div>
                  <ChevronRight
                    className={`size-4 transition-transform duration-200 ${
                      openSections.teams ? "rotate-90" : ""
                    }`}
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent className="pl-5">
                  <SidebarMenu>
                    {teams.map((team) => (
                      <Collapsible
                        key={team.id}
                        open={expandedItems[`team-${team.id}`]}
                        onOpenChange={() => toggleItem(`team-${team.id}`)}
                      >
                        <SidebarMenuItem className="h-10">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="h-10">
                              <Image
                                src={team.avatar}
                                alt={team.name}
                                width={16}
                                height={16}
                                className="rounded"
                                unoptimized
                              />
                              <span>{team.name}</span>
                              <ChevronRight
                                className={`ml-auto size-4 transition-transform duration-200 ${
                                  expandedItems[`team-${team.id}`] ? "rotate-90" : ""
                                }`}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {teamSubPages.map((page) => (
                                <SidebarMenuSubItem key={page.label}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={`/team/${team.id}/${page.href}`}>
                                      {page.label}
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Repositories Dashboard */}
          <SidebarGroup>
            <Collapsible
              open={openSections.repositories}
              onOpenChange={() => toggleSection("repositories")}
            >
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="group/label w-full h-10 cursor-pointer justify-between pr-2 hover:bg-sidebar-accent">
                  <div className="flex items-center gap-2">
                    <GitBranch className="size-4" />
                    <span>Repositories</span>
                  </div>
                  <ChevronRight
                    className={`size-4 transition-transform duration-200 ${
                      openSections.repositories ? "rotate-90" : ""
                    }`}
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="pl-5">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {repositories.map((repo) => (
                      <Collapsible
                        key={repo.id}
                        open={expandedItems[`repo-${repo.id}`]}
                        onOpenChange={() => toggleItem(`repo-${repo.id}`)}
                      >
                        <SidebarMenuItem className="h-10">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="h-10">
                              <GitBranch className="size-4" />
                              <span className="font-mono text-xs">{repo.name}</span>
                              <ChevronRight
                                className={`ml-auto size-4 transition-transform duration-200 ${
                                  expandedItems[`repo-${repo.id}`] ? "rotate-90" : ""
                                }`}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {repoSubPages.map((page) => (
                                <SidebarMenuSubItem key={page.label}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={`/repo/${repo.id}/${page.href}`}>
                                      {page.label}
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Users/People Dashboard */}
          <SidebarGroup>
            <Collapsible
              open={openSections.people}
              onOpenChange={() => toggleSection("people")}
            >
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="group/label w-full h-10 cursor-pointer justify-between pr-2 hover:bg-sidebar-accent">
                  <div className="flex items-center gap-2">
                    <User className="size-4" />
                    <span>People</span>
                  </div>
                  <ChevronRight
                    className={`size-4 transition-transform duration-200 ${
                      openSections.people ? "rotate-90" : ""
                    }`}
                  />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="pl-5">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {people.map((person) => (
                      <Collapsible
                        key={person.id}
                        open={expandedItems[`user-${person.id}`]}
                        onOpenChange={() => toggleItem(`user-${person.id}`)}
                      >
                        <SidebarMenuItem className="h-10">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="h-10">
                              <Image
                                src={person.avatar}
                                alt={person.name}
                                width={16}
                                height={16}
                                className="rounded-full object-cover"
                                unoptimized
                              />
                              <span>{person.name}</span>
                              <ChevronRight
                                className={`ml-auto size-4 transition-transform duration-200 ${
                                  expandedItems[`user-${person.id}`] ? "rotate-90" : ""
                                }`}
                              />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {userSubPages.map((page) => (
                                <SidebarMenuSubItem key={page.label}>
                                  <SidebarMenuSubButton asChild>
                                    <a href={`/user/${person.id}/${page.href}`}>
                                      {page.label}
                                    </a>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings className="size-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Log out">
                <LogOut className="size-4" />
                <span>Log out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Dashboard</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
          <h3 className="text-lg font-semibold">The page content goes here...</h3>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/">Variant One</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/variant-two">Variant Two</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/variant-three">Variant Three</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/variant-four">Variant Four</Link>
            </Button>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
