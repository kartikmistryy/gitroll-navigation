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
  MapPin,
  MoreHorizontal,
  Home as HomeIcon,
  UserCircle,
  HelpCircle,
  Search,
  Minus,
  Book,
  Bookmark,
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
import { Input } from "@/components/ui/input";
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

const repositoriesByOrg: Record<string, Array<{ id: string; name: string; orgId: string; teamId?: string }>> = {
  gitroll: [
    { id: "web-app", name: "web-app", orgId: "gitroll", teamId: "frontend" },
    { id: "api-server", name: "api-server", orgId: "gitroll", teamId: "backend" },
    { id: "mobile-app", name: "mobile-app", orgId: "gitroll", teamId: "mobile" },
    { id: "shared-libs", name: "shared-libs", orgId: "gitroll", teamId: "frontend" },
  ],
  acme: [
    { id: "crm-app", name: "crm-app", orgId: "acme", teamId: "sales" },
    { id: "marketing-site", name: "marketing-site", orgId: "acme", teamId: "marketing" },
    { id: "support-portal", name: "support-portal", orgId: "acme", teamId: "support" },
  ],
  techcorp: [
    { id: "platform-core", name: "platform-core", orgId: "techcorp", teamId: "infrastructure" },
    { id: "analytics-engine", name: "analytics-engine", orgId: "techcorp", teamId: "product" },
  ],
};

const peopleByOrg: Record<string, Array<{ id: string; name: string; avatar: string; orgId: string; teamId?: string }>> = {
  gitroll: [
    { 
      id: "john-doe", 
      name: "John Doe", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
      teamId: "frontend"
    },
    { 
      id: "jane-smith", 
      name: "Jane Smith", 
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
      teamId: "frontend"
    },
    { 
      id: "mike-wilson", 
      name: "Mike Wilson", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
      teamId: "backend"
    },
    { 
      id: "sarah-johnson", 
      name: "Sarah Johnson", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
      teamId: "backend"
    },
    { 
      id: "alex-chen", 
      name: "Alex Chen", 
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
      teamId: "mobile"
    },
    { 
      id: "emily-brown", 
      name: "Emily Brown", 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      orgId: "gitroll",
      teamId: "devops"
    },
    {
      id: "priya-patel",
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya-patel",
      orgId: "gitroll",
      teamId: "data"
    },
    {
      id: "daniel-kim",
      name: "Daniel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim",
      orgId: "gitroll",
      teamId: "security"
    },
    {
      id: "sofia-garcia",
      name: "Sofia Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia-garcia",
      orgId: "gitroll",
      teamId: "frontend"
    },
    {
      id: "noah-lee",
      name: "Noah Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=noah-lee",
      orgId: "gitroll",
      teamId: "backend"
    },
  ],
  acme: [
    { 
      id: "sarah-johnson", 
      name: "Sarah Johnson", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      orgId: "acme",
      teamId: "sales"
    },
    { 
      id: "emily-brown", 
      name: "Emily Brown", 
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      orgId: "acme",
      teamId: "marketing"
    },
    {
      id: "daniel-kim",
      name: "Daniel Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim",
      orgId: "acme",
      teamId: "support"
    },
    {
      id: "sofia-garcia",
      name: "Sofia Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia-garcia",
      orgId: "acme",
      teamId: "engineering"
    },
    {
      id: "james-wilson",
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james-wilson",
      orgId: "acme",
      teamId: "engineering"
    },
    {
      id: "lisa-anderson",
      name: "Lisa Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa-anderson",
      orgId: "acme",
      teamId: "sales"
    },
  ],
  techcorp: [
    { 
      id: "robert-taylor", 
      name: "Robert Taylor", 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=robert-taylor",
      orgId: "techcorp",
      teamId: "product"
    },
    { 
      id: "maria-rodriguez", 
      name: "Maria Rodriguez", 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria-rodriguez",
      orgId: "techcorp",
      teamId: "qa"
    },
    {
      id: "david-martinez",
      name: "David Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david-martinez",
      orgId: "techcorp",
      teamId: "infrastructure"
    },
    {
      id: "jennifer-white",
      name: "Jennifer White",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jennifer-white",
      orgId: "techcorp",
      teamId: "product"
    },
  ],
};

type FavoriteItem = {
  type: 'team' | 'person' | 'repo';
  id: string;
  orgId: string;
};

type HoveredItem = { type: 'team' | 'person' | 'repo'; id: string } | null;

// Reusable Bookmark Button Component
function BookmarkButton({
  isFavorited,
  onToggle,
  className = "ml-auto",
}: {
  isFavorited: boolean;
  onToggle: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={cn(
        className,
        "p-0.5 hover:bg-sidebar-accent-hover rounded transition-all"
      )}
      title={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Bookmark
        className={cn(
          "size-3.5 cursor-pointer",
          isFavorited && "fill-current"
        )}
      />
    </button>
  );
}

export default function Home() {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]!);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [showAllRepos, setShowAllRepos] = useState(false);
  const [showAllPeople, setShowAllPeople] = useState(false);
  const [peopleSearchQuery, setPeopleSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<HoveredItem>(null);

  // Helper functions for hover handlers
  const handleMouseEnter = (type: 'team' | 'person' | 'repo', id: string) => {
    setHoveredItem({ type, id });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const isItemHovered = (type: 'team' | 'person' | 'repo', id: string) => {
    return hoveredItem?.type === type && hoveredItem?.id === id;
  };

  // Get teams, people, and repos for selected organization
  const allTeams = React.useMemo(() => teamsByOrg[selectedOrg.id] || [], [selectedOrg.id]);
  const allRepositories = React.useMemo(() => repositoriesByOrg[selectedOrg.id] || [], [selectedOrg.id]);
  const allPeople = React.useMemo(() => peopleByOrg[selectedOrg.id] || [], [selectedOrg.id]);

  // Filter people and repos by selected team
  const repositories = React.useMemo(() => {
    if (!selectedTeam) return allRepositories;
    return allRepositories.filter((repo) => repo.teamId === selectedTeam);
  }, [allRepositories, selectedTeam]);

  const people = React.useMemo(() => {
    let filtered = allPeople;
    // Filter by team if selected
    if (selectedTeam) {
      filtered = filtered.filter((person) => person.teamId === selectedTeam);
    }
    // Filter by search query
    if (peopleSearchQuery.trim()) {
      const query = peopleSearchQuery.trim().toLowerCase();
      filtered = filtered.filter((person) =>
        person.name.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [allPeople, selectedTeam, peopleSearchQuery]);

  // Get favorites for current org
  const orgFavorites = React.useMemo(() => {
    return favorites.filter((fav) => fav.orgId === selectedOrg.id);
  }, [favorites, selectedOrg.id]);

  // Helper to check if item is favorited
  const isFavorited = (type: 'team' | 'person' | 'repo', id: string) => {
    return favorites.some((fav) => fav.type === type && fav.id === id && fav.orgId === selectedOrg.id);
  };

  // Helper to toggle favorite
  const toggleFavorite = (type: 'team' | 'person' | 'repo', id: string) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.type === type && fav.id === id && fav.orgId === selectedOrg.id);
      if (exists) {
        return prev.filter((fav) => !(fav.type === type && fav.id === id && fav.orgId === selectedOrg.id));
      }
      return [...prev, { type, id, orgId: selectedOrg.id }];
    });
  };

  // Reset states when org changes
  React.useEffect(() => {
    setSelectedTeam(null);
    setShowAllTeams(false);
    setShowAllRepos(false);
    setShowAllPeople(false);
    setPeopleSearchQuery("");
  }, [selectedOrg.id]);

  const visibleTeams = showAllTeams ? allTeams : allTeams.slice(0, 3);
  const visibleRepos = showAllRepos ? repositories : repositories.slice(0, 2);
  const visiblePeople = showAllPeople ? people : people.slice(0, 2);

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="border-b border-sidebar-border p-2">
          {/* Organization Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="flex w-full items-center justify-between rounded-lg p-2 hover:bg-sidebar-accent"
                onClick={() => {
                  // If clicking the trigger when a team is selected, reset to org view
                  if (selectedTeam) {
                    setSelectedTeam(null);
                    setPeopleSearchQuery("");
                  }
                }}
              >
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

          {/* Favorites */}
          {orgFavorites.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                Favorites
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {orgFavorites.map((fav) => {
                    if (fav.type === 'team') {
                      const team = allTeams.find((t) => t.id === fav.id);
                      if (!team) return null;
                      return (
                        <SidebarMenuItem key={`team-${fav.id}`}>
                          <SidebarMenuButton
                            onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                            isActive={selectedTeam === team.id}
                            className="relative cursor-pointer"
                            onMouseEnter={() => handleMouseEnter('team', team.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Image
                              src={team.avatar}
                              alt={team.name}
                              width={16}
                              height={16}
                              className="rounded"
                              unoptimized
                            />
                            <span className="text-sm font-medium flex-1">{team.name}</span>
                            {isItemHovered('team', team.id) && (
                              <BookmarkButton
                                isFavorited={isFavorited('team', team.id)}
                                onToggle={() => toggleFavorite('team', team.id)}
                              />
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }
                    if (fav.type === 'person') {
                      const person = allPeople.find((p) => p.id === fav.id);
                      if (!person) return null;
                      return (
                        <SidebarMenuItem key={`person-${fav.id}`}>
                          <SidebarMenuButton
                            className="relative cursor-pointer"
                            onMouseEnter={() => handleMouseEnter('person', person.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Image
                              src={person.avatar}
                              alt={person.name}
                              width={20}
                              height={20}
                              className="rounded-full object-cover"
                              unoptimized
                            />
                            <span className="text-sm font-medium flex-1">{person.name}</span>
                            {isItemHovered('person', person.id) && (
                              <BookmarkButton
                                isFavorited={isFavorited('person', person.id)}
                                onToggle={() => toggleFavorite('person', person.id)}
                              />
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }
                    if (fav.type === 'repo') {
                      const repo = allRepositories.find((r) => r.id === fav.id);
                      if (!repo) return null;
                      return (
                        <SidebarMenuItem key={`repo-${fav.id}`}>
                          <SidebarMenuButton
                            className="relative cursor-pointer"
                            onMouseEnter={() => handleMouseEnter('repo', repo.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Book className="size-3" />
                            <span className="font-mono text-sm font-medium flex-1">{repo.name}</span>
                            {isItemHovered('repo', repo.id) && (
                              <BookmarkButton
                                isFavorited={isFavorited('repo', repo.id)}
                                onToggle={() => toggleFavorite('repo', repo.id)}
                              />
                            )}
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }
                    return null;
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Teams */}
          {allTeams.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                Teams
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {visibleTeams.map((team) => (
                    <SidebarMenuItem key={team.id}>
                      <SidebarMenuButton
                        onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                        isActive={selectedTeam === team.id}
                        className="relative cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('team', team.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image
                          src={team.avatar}
                          alt={team.name}
                          width={16}
                          height={16}
                          className="rounded"
                          unoptimized
                        />
                        <span className="text-sm font-medium flex-1">{team.name}</span>
                        <div className="ml-auto flex items-center gap-1">
                          {selectedTeam === team.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTeam(null);
                                setPeopleSearchQuery("");
                              }}
                              className="p-0.5 hover:bg-sidebar-accent-hover rounded transition-colors"
                              title="Clear team filter"
                            >
                              <Minus className="size-3.5" />
                            </button>
                          )}
                          {isItemHovered('team', team.id) && (
                            <BookmarkButton
                              isFavorited={isFavorited('team', team.id)}
                              onToggle={() => toggleFavorite('team', team.id)}
                              className="p-0.5"
                            />
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  {allTeams.length > 3 && (
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
          {allPeople.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                People
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {/* Search input */}
                <div className="px-2 pb-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={peopleSearchQuery}
                      onChange={(e) => setPeopleSearchQuery(e.target.value)}
                      placeholder="Search people..."
                      className="h-8 pl-7 pr-2 text-xs"
                    />
                  </div>
                </div>
                <SidebarMenu>
                  {people.length === 0 ? (
                    <SidebarMenuItem>
                      <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                        {peopleSearchQuery.trim() || selectedTeam
                          ? "No people found"
                          : "No people available"}
                      </div>
                    </SidebarMenuItem>
                  ) : (
                    <>
                  {visiblePeople.map((person) => (
                    <SidebarMenuItem key={person.id}>
                      <SidebarMenuButton
                        className="relative cursor-pointer"
                        onMouseEnter={() => handleMouseEnter('person', person.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Image
                          src={person.avatar}
                          alt={person.name}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                          unoptimized
                        />
                        <span className="text-sm font-medium flex-1">{person.name}</span>
                        {isItemHovered('person', person.id) && (
                          <BookmarkButton
                            isFavorited={isFavorited('person', person.id)}
                            onToggle={() => toggleFavorite('person', person.id)}
                          />
                        )}
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
                    </>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Repositories */}
          {allRepositories.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className="px-2 text-sm font-semibold text-muted-foreground">
                Repositories
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {repositories.length === 0 ? (
                    <SidebarMenuItem>
                      <div className="px-2 py-4 text-center text-xs text-muted-foreground">
                        {selectedTeam ? "No repositories for this team" : "No repositories available"}
                      </div>
                    </SidebarMenuItem>
                  ) : (
                    <>
                      {visibleRepos.map((repo) => (
                        <SidebarMenuItem key={repo.id}>
                          <SidebarMenuButton
                            className="relative cursor-pointer"
                            onMouseEnter={() => handleMouseEnter('repo', repo.id)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <Book className="size-3" />
                            <span className="font-mono text-sm font-medium flex-1">{repo.name}</span>
                            {isItemHovered('repo', repo.id) && (
                              <BookmarkButton
                                isFavorited={isFavorited('repo', repo.id)}
                                onToggle={() => toggleFavorite('repo', repo.id)}
                              />
                            )}
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
                    </>
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
