'use client';

import * as React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
  Users,
  Building2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
} from '@/components/animate-ui/components/radix/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

const repositories = [
  { id: "web-app", name: "web-app", teamId: "frontend" },
  { id: "api-server", name: "api-server", teamId: "backend" },
  { id: "mobile-app", name: "mobile-app", teamId: "mobile" },
  { id: "shared-libs", name: "shared-libs", teamId: "frontend" },
  { id: "data-pipeline", name: "data-pipeline", teamId: "data" },
  { id: "security-tools", name: "security-tools", teamId: "security" },
  { id: "infra-config", name: "infra-config", teamId: "devops" },
];

const people = [
  { 
    id: "john-doe", 
    name: "John Doe", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    teamId: "frontend"
  },
  { 
    id: "jane-smith", 
    name: "Jane Smith", 
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    teamId: "frontend"
  },
  { 
    id: "mike-wilson", 
    name: "Mike Wilson", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    teamId: "backend"
  },
  { 
    id: "sarah-johnson", 
    name: "Sarah Johnson", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    teamId: "backend"
  },
  { 
    id: "alex-chen", 
    name: "Alex Chen", 
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
    teamId: "mobile"
  },
  { 
    id: "emily-brown", 
    name: "Emily Brown", 
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    teamId: "devops"
  },
  {
    id: "priya-patel",
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya-patel",
    teamId: "data"
  },
  {
    id: "daniel-kim",
    name: "Daniel Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim",
    teamId: "security"
  },
  {
    id: "sofia-garcia",
    name: "Sofia Garcia",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia-garcia",
    teamId: "frontend"
  },
  {
    id: "noah-lee",
    name: "Noah Lee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah-lee",
    teamId: "backend"
  },
];

function VariantFourContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get team from URL params or default to first team
  const teamIdFromUrl = searchParams.get('teamId') || 'frontend';
  const currentTeam = teams.find(t => t.id === teamIdFromUrl) || teams[0]!;
  const currentOrg = organizations[0]!;

  const [selectedTeam, setSelectedTeam] = useState(currentTeam);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [showAllPeople, setShowAllPeople] = useState(false);

  // Sync selectedTeam with URL changes
  React.useEffect(() => {
    const teamIdFromUrl = searchParams.get('teamId') || 'frontend';
    const team = teams.find(t => t.id === teamIdFromUrl) || teams[0]!;
    if (team.id !== selectedTeam.id) {
      setSelectedTeam(team);
      setShowAllRepos(false);
      setShowAllPeople(false);
    }
  }, [searchParams, selectedTeam.id]);

  // Filter people and repos by selected team
  const teamPeople = React.useMemo(() => 
    people.filter(p => p.teamId === selectedTeam.id),
    [selectedTeam.id]
  );
  const teamRepos = React.useMemo(() => 
    repositories.filter(r => r.teamId === selectedTeam.id),
    [selectedTeam.id]
  );

  const visibleRepos = showAllRepos ? teamRepos : teamRepos.slice(0, 2);
  const visiblePeople = showAllPeople ? teamPeople : teamPeople.slice(0, 2);

  const createQueryString = React.useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [k, v] of Object.entries(updates)) {
        if (v == null) params.delete(k);
        else params.set(k, v);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleTeamChange = (team: typeof teams[0]) => {
    setSelectedTeam(team);
    setShowAllRepos(false);
    setShowAllPeople(false);
    const qs = createQueryString({ teamId: team.id });
    router.replace(`${pathname}?${qs}`, { scroll: false });
  };

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="border-b border-sidebar-border p-2">
          {/* Team Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-sidebar-accent">
                <div className="flex items-center gap-2">
                  <Image
                    src={selectedTeam.avatar}
                    alt={selectedTeam.name}
                    width={24}
                    height={24}
                    className="rounded"
                    unoptimized
                  />
                  <span className="font-semibold text-sm">{selectedTeam.name}</span>
                </div>
                <ChevronDown className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuLabel>Switch Team</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {teams.map((team) => (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => handleTeamChange(team)}
                  className={cn(
                    'flex items-center gap-2',
                    selectedTeam.id === team.id && 'bg-accent',
                  )}
                >
                  <Image
                    src={team.avatar}
                    alt={team.name}
                    width={20}
                    height={20}
                    className="rounded"
                    unoptimized
                  />
                  <span>{team.name}</span>
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

          {/* People */}
          {teamPeople.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                People
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visiblePeople.map((person) => (
                    <SidebarMenuItem key={person.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/user/${person.id}/overview`}>
                          <Image
                            src={person.avatar}
                            alt={person.name}
                            width={20}
                            height={20}
                            className="rounded-full object-cover"
                            unoptimized
                          />
                          <span className="text-sm font-medium">{person.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {teamPeople.length > 2 && (
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
          {teamRepos.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                Repositories
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleRepos.map((repo) => (
                    <SidebarMenuItem key={repo.id}>
                      <SidebarMenuButton asChild>
                        <Link href={`/repo/${repo.id}/overview`}>
                          <GitBranch className="size-3" />
                          <span className="font-mono text-sm font-medium">{repo.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {teamRepos.length > 2 && (
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
                  src={people[0]!.avatar}
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
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="font-semibold text-foreground">
                    {currentOrg.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold">
                  {selectedTeam.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
          <div className="max-w-2xl space-y-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Image
                src={selectedTeam.avatar}
                alt={selectedTeam.name}
                width={48}
                height={48}
                className="rounded-lg"
                unoptimized
              />
              <h3 className="text-lg font-semibold">{selectedTeam.name} Dashboard</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Team-specific dashboard view. This is the sidebar state when navigating to a specific team.
              The sidebar maintains the same structure as Variant One but is contextualized for the team dashboard.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t pt-6">
              <Button asChild variant="outline" size="sm">
                <Link href="/">Variant One</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/variant-two">Variant Two</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/variant-three">Variant Three</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href="/variant-four">One/Team</Link>
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function VariantFour() {
  return (
    <React.Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <VariantFourContent />
    </React.Suspense>
  );
}
