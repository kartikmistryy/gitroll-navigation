'use client';

import * as React from 'react';
import { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Search,
  ArrowRight,
  FileText,
  BarChart3,
  ShieldAlert,
  GitBranch,
  Clock,
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
  SidebarInset,
  useSidebar,
} from '@/components/animate-ui/components/radix/sidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function HoverExpandSidebar({ children }: { children: React.ReactNode }) {
  const { setOpen } = useSidebar();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setOpen(false), 300);
      }}
      className="contents"
    >
      {children}
    </div>
  );
}

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
    { id: 'browser-sdk', name: 'browser-sdk', orgId: 'gitroll' },
    { id: 'datadog-agent', name: 'datadog-agent', orgId: 'gitroll' },
    { id: 'web-app', name: 'web-app', orgId: 'gitroll' },
    { id: 'api-server', name: 'api-server', orgId: 'gitroll' },
    { id: 'mobile-app', name: 'mobile-app', orgId: 'gitroll' },
    { id: 'shared-libs', name: 'shared-libs', orgId: 'gitroll' },
    { id: 'infra-tools', name: 'infra-tools', orgId: 'gitroll' },
    { id: 'docs-site', name: 'docs-site', orgId: 'gitroll' },
    { id: 'cli-tools', name: 'cli-tools', orgId: 'gitroll' },
    { id: 'design-system', name: 'design-system', orgId: 'gitroll' },
    { id: 'analytics-lib', name: 'analytics-lib', orgId: 'gitroll' },
    { id: 'auth-service', name: 'auth-service', orgId: 'gitroll' },
  ],
  acme: [
    { id: 'crm-app', name: 'crm-app', orgId: 'acme' },
    { id: 'marketing-site', name: 'marketing-site', orgId: 'acme' },
    { id: 'support-portal', name: 'support-portal', orgId: 'acme' },
  ],
  techcorp: [
    { id: 'platform-core', name: 'platform-core', orgId: 'techcorp' },
    { id: 'analytics-engine', name: 'analytics-engine', orgId: 'techcorp' },
  ],
};

const peopleByOrg: Record<string, Array<{ id: string; name: string; avatar: string; orgId: string }>> = {
  gitroll: [
    { id: 'andrew-lock', name: 'Andrew Lock', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', orgId: 'gitroll' },
    { id: 'sylvain-afchain', name: 'Sylvain Afchain', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', orgId: 'gitroll' },
    { id: 'jane-smith', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', orgId: 'gitroll' },
    { id: 'sarah-johnson', name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', orgId: 'gitroll' },
    { id: 'alex-chen', name: 'Alex Chen', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', orgId: 'gitroll' },
    { id: 'emily-brown', name: 'Emily Brown', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', orgId: 'gitroll' },
    { id: 'priya-patel', name: 'Priya Patel', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya-patel', orgId: 'gitroll' },
  ],
  acme: [
    { id: 'sarah-johnson', name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', orgId: 'acme' },
    { id: 'emily-brown', name: 'Emily Brown', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', orgId: 'acme' },
    { id: 'daniel-kim', name: 'Daniel Kim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daniel-kim', orgId: 'acme' },
  ],
  techcorp: [
    { id: 'robert-taylor', name: 'Robert Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert-taylor', orgId: 'techcorp' },
    { id: 'maria-rodriguez', name: 'Maria Rodriguez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria-rodriguez', orgId: 'techcorp' },
  ],
};

// All searchable pages
type SearchItem = {
  label: string;
  category: 'page' | 'repo' | 'person' | 'action';
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  keywords: string[];
};

const searchablePages: SearchItem[] = [
  { label: 'Overview', category: 'page', icon: LayoutDashboard, description: 'Organization overview dashboard', keywords: ['overview', 'home', 'dashboard', 'summary'] },
  { label: 'Performance', category: 'page', icon: BarChart3, description: 'Performance metrics and trends', keywords: ['performance', 'metrics', 'score', 'trends'] },
  { label: 'SPOF Analysis', category: 'page', icon: ShieldAlert, description: 'Single point of failure risks', keywords: ['spof', 'risk', 'single point', 'failure', 'bus factor'] },
  { label: 'Outliers', category: 'page', icon: Users, description: 'Critical outlier contributors', keywords: ['outliers', 'critical', 'top', 'bottom', 'performers'] },
  { label: 'SkillsGraph', category: 'page', icon: GitBranch, description: 'Skills distribution graph', keywords: ['skills', 'graph', 'distribution', 'tech', 'languages'] },
  { label: 'AI Consultant', category: 'page', icon: Sparkles, description: 'Ask AI about your org', keywords: ['ai', 'consultant', 'ask', 'chat', 'insights'] },
  { label: 'Code Quality', category: 'page', icon: FileText, description: 'Code quality analysis', keywords: ['code', 'quality', 'lint', 'coverage', 'debt'] },
  { label: 'Contributors', category: 'page', icon: Users, description: 'Contributor activity', keywords: ['contributors', 'people', 'activity', 'commits'] },
  { label: 'Settings', category: 'page', icon: Settings, description: 'Organization settings', keywords: ['settings', 'config', 'preferences', 'integrations'] },
  { label: 'Growth Suggestions', category: 'action', icon: ArrowRight, description: 'Actionable growth recommendations', keywords: ['growth', 'suggestions', 'recommendations', 'improve'] },
  { label: 'Risk Alerts', category: 'action', icon: ShieldAlert, description: 'Active risk alerts', keywords: ['risk', 'alerts', 'warning', 'danger'] },
  { label: 'Benchmarks', category: 'page', icon: BarChart3, description: 'Performance benchmarks', keywords: ['benchmark', 'compare', 'percentile', 'ranking'] },
];

function CommandSearch({ orgId }: { orgId: string }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const repos = useMemo(() => repositoriesByOrg[orgId] || [], [orgId]);
  const people = useMemo(() => peopleByOrg[orgId] || [], [orgId]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const pageResults = searchablePages
      .filter((p) => p.label.toLowerCase().includes(q) || p.keywords.some((k) => k.includes(q)))
      .map((p) => ({ ...p, type: 'page' as const }));

    const repoResults = repos
      .filter((r) => r.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((r) => ({
        label: r.name,
        category: 'repo' as const,
        icon: Book,
        description: 'Repository',
        keywords: [],
        type: 'repo' as const,
      }));

    const personResults = people
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((p) => ({
        label: p.name,
        category: 'person' as const,
        icon: UserCircle,
        description: 'Person',
        keywords: [],
        type: 'person' as const,
      }));

    return [...pageResults, ...repoResults, ...personResults].slice(0, 8);
  }, [query, repos, people]);

  const recentSearches = ['Performance', 'SPOF', 'browser-sdk', 'Andrew Lock'];

  const showDropdown = isFocused && (query.trim().length > 0 || true);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const items = results.length > 0 ? results : recentSearches.map((r) => ({ label: r }));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter') {
      setIsFocused(false);
      setQuery('');
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className={cn(
        'flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 transition-all dark:bg-zinc-900',
        isFocused ? 'ring-2 ring-[#171717]/20 border-[#171717]/30 shadow-lg' : 'shadow-sm',
      )}>
        <Search className="size-4 text-muted-foreground shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, repos, people, or type a command..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground dark:bg-zinc-800">
          ⌘K
        </kbd>
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border bg-white shadow-xl z-50 overflow-hidden dark:bg-zinc-900">
          {results.length > 0 ? (
            <div className="py-1">
              {results.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={`${item.category}-${item.label}`}
                    className={cn(
                      'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer',
                      selectedIndex === i ? 'bg-zinc-50 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800',
                    )}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onClick={() => { setIsFocused(false); setQuery(''); }}
                  >
                    <div className={cn(
                      'flex size-8 items-center justify-center rounded-lg shrink-0',
                      item.category === 'page' ? 'bg-zinc-100 dark:bg-zinc-800' :
                      item.category === 'repo' ? 'bg-blue-50 dark:bg-blue-950' :
                      item.category === 'person' ? 'bg-emerald-50 dark:bg-emerald-950' :
                      'bg-amber-50 dark:bg-amber-950',
                    )}>
                      <Icon className={cn(
                        'size-4',
                        item.category === 'page' ? 'text-zinc-600' :
                        item.category === 'repo' ? 'text-blue-600' :
                        item.category === 'person' ? 'text-emerald-600' :
                        'text-amber-600',
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                      )}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">
                      {item.category}
                    </span>
                    {selectedIndex === i && <ArrowRight className="size-3.5 text-muted-foreground shrink-0" />}
                  </button>
                );
              })}
            </div>
          ) : query.trim() === '' ? (
            <div className="py-2">
              <div className="px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Recent
              </div>
              {recentSearches.map((item, i) => (
                <button
                  key={item}
                  className={cn(
                    'flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors cursor-pointer',
                    selectedIndex === i ? 'bg-zinc-50 dark:bg-zinc-800' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800',
                  )}
                  onMouseEnter={() => setSelectedIndex(i)}
                  onClick={() => { setQuery(item); }}
                >
                  <Clock className="size-3.5 text-muted-foreground" />
                  <span>{item}</span>
                </button>
              ))}
              <div className="border-t mt-1 pt-1">
                <div className="px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Quick actions
                </div>
                {[
                  { label: 'Go to Performance', icon: BarChart3 },
                  { label: 'View SPOF Risks', icon: ShieldAlert },
                  { label: 'Ask AI Consultant', icon: Sparkles },
                ].map((action) => (
                  <button
                    key={action.label}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    onClick={() => { setIsFocused(false); }}
                  >
                    <action.icon className="size-3.5 text-muted-foreground" />
                    <span>{action.label}</span>
                    <ArrowRight className="size-3 text-muted-foreground ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function VariantThree() {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]!);
  const [activeNav, setActiveNav] = useState('Home');

  const allRepositories = useMemo(() => repositoriesByOrg[selectedOrg.id] || [], [selectedOrg.id]);
  const allPeople = useMemo(() => peopleByOrg[selectedOrg.id] || [], [selectedOrg.id]);

  const visibleRepos = allRepositories.slice(0, 2);
  const visiblePeople = allPeople.slice(0, 2);

  return (
    <SidebarProvider defaultOpen={false}>
      <HoverExpandSidebar>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer!">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#171717] text-white text-xs font-bold">
                      {selectedOrg.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{selectedOrg.name}</span>
                      <span className="truncate text-xs text-muted-foreground">Organization</span>
                    </div>
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
                  <DropdownMenuLabel className="text-xs text-muted-foreground">Organizations</DropdownMenuLabel>
                  {organizations.map((org) => (
                    <DropdownMenuItem
                      key={org.id}
                      onClick={() => setSelectedOrg(org)}
                      className={cn('gap-2 p-2 cursor-pointer', selectedOrg.id === org.id && 'bg-accent')}
                    >
                      <div className="flex size-6 items-center justify-center rounded-sm bg-[#171717] text-white text-[10px] font-bold">
                        {org.name.substring(0, 2).toUpperCase()}
                      </div>
                      {org.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={activeNav === item.title}
                      onClick={() => setActiveNav(item.title)}
                      className={cn(
                        'cursor-pointer!',
                        activeNav === item.title && 'bg-[#171717]! text-white! hover:bg-[#171717]/90! hover:text-white!',
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Repositories</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Repositories" className="cursor-pointer! hidden! group-data-[collapsible=icon]:flex!">
                    <Book />
                    <span>Repositories</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {visibleRepos.map((repo) => (
                  <SidebarMenuItem key={repo.id} className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenuButton className="cursor-pointer!">
                      <Book />
                      <span>{repo.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                  <SidebarMenuButton className="text-muted-foreground cursor-pointer!">
                    <span>View all ({allRepositories.length})</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>People</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="People" className="cursor-pointer! hidden! group-data-[collapsible=icon]:flex!">
                    <Users />
                    <span>People</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {visiblePeople.map((person) => (
                  <SidebarMenuItem key={person.id} className="group-data-[collapsible=icon]:hidden">
                    <SidebarMenuButton className="cursor-pointer!">
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        width={20}
                        height={20}
                        className="rounded-full object-cover size-5"
                        unoptimized
                      />
                      <span>{person.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                  <SidebarMenuButton className="text-muted-foreground cursor-pointer!">
                    <span>View all ({allPeople.length})</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer!">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                      alt="John Doe"
                      width={32}
                      height={32}
                      className="rounded-full object-cover size-8"
                      unoptimized
                    />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">John Doe</span>
                      <span className="truncate text-xs text-muted-foreground">Admin</span>
                    </div>
                    <ChevronRight className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 rounded-lg" align="end" side="right" sideOffset={4}>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer"><UserCircle className="size-4" /><span>Profile</span></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer"><Settings className="size-4" /><span>Settings</span></DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer"><HelpCircle className="size-4" /><span>Help & Support</span></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer"><LogOut className="size-4" /><span>Log out</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      </HoverExpandSidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <CommandSearch orgId={selectedOrg.id} />
        </header>

        <main className="relative flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
          {/* Dashboard background */}
          <div className="flex-1 p-6 space-y-6 overflow-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Performance Score', value: '72', change: '+12.5%', trend: 'up', desc: 'Trending up this month', sub: 'Across all repositories' },
                { title: 'Critical Outliers', value: '3', change: '-20%', trend: 'down', desc: 'Down 20% this period', sub: 'Needs attention' },
                { title: 'Active Contributors', value: '45,678', change: '+12.5%', trend: 'up', desc: 'Strong user retention', sub: 'Engagement exceeds targets' },
                { title: 'Growth Rate', value: '4.5%', change: '+4.5%', trend: 'up', desc: 'Steady performance increase', sub: 'Meets growth projections' },
              ].map((stat) => (
                <div key={stat.title} className="rounded-xl border bg-white p-5 space-y-3 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.title}</span>
                    <span className={cn('text-xs font-medium px-1.5 py-0.5 rounded', stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50')}>{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div>
                    <p className="text-sm font-medium">{stat.desc}</p>
                    <p className="text-xs text-muted-foreground">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Performance</h3>
                  <p className="text-sm text-muted-foreground">Total for the last 3 months</p>
                </div>
                <div className="flex gap-1 rounded-lg border p-0.5">
                  {['3 months', '30 days', '7 days'].map((period) => (
                    <span key={period} className={cn('px-3 py-1 text-xs font-medium rounded-md', period === '3 months' ? 'bg-zinc-100 text-foreground dark:bg-zinc-800' : 'text-muted-foreground')}>{period}</span>
                  ))}
                </div>
              </div>
              <div className="h-48 relative">
                <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#171717" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,150 C100,120 150,80 250,60 C350,40 400,90 500,50 C600,10 700,70 800,30" fill="none" stroke="#171717" strokeWidth="2" />
                  <path d="M0,150 C100,120 150,80 250,60 C350,40 400,90 500,50 C600,10 700,70 800,30 L800,200 L0,200 Z" fill="url(#cg3)" />
                  <path d="M0,170 C100,155 200,140 300,130 C400,120 500,145 600,125 C700,105 750,110 800,90" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
            <div className="rounded-xl border bg-white dark:bg-zinc-900">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="py-3 px-4 font-medium">Header</th>
                    <th className="py-3 px-4 font-medium">Section Type</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium text-right">Target</th>
                    <th className="py-3 px-4 font-medium">Reviewer</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { header: 'Cover page', type: 'Cover page', status: 'In Process', target: 18, reviewer: 'Eddie Lake' },
                    { header: 'Table of contents', type: 'Table of contents', status: 'Done', target: 29, reviewer: 'Eddie Lake' },
                    { header: 'Executive summary', type: 'Narrative', status: 'Done', target: 10, reviewer: 'Eddie Lake' },
                    { header: 'Technical approach', type: 'Narrative', status: 'Done', target: 27, reviewer: 'Jamik T.' },
                    { header: 'Design', type: 'Narrative', status: 'In Process', target: 2, reviewer: 'Jamik T.' },
                  ].map((row) => (
                    <tr key={row.header} className="border-b last:border-0 text-sm">
                      <td className="py-3 px-4 font-medium">{row.header}</td>
                      <td className="py-3 px-4"><span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">{row.type}</span></td>
                      <td className="py-3 px-4">
                        <span className={cn('inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs', row.status === 'Done' ? 'text-emerald-700' : 'text-muted-foreground')}>
                          {row.status === 'Done' && <span className="size-1.5 rounded-full bg-emerald-500" />}
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">{row.target}</td>
                      <td className="py-3 px-4 text-muted-foreground">{row.reviewer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30 backdrop-blur-[1px] dark:bg-zinc-950/30">
            <div className="max-w-md text-center space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-muted-foreground dark:bg-zinc-800">
                Sidebar Navigation Variants
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Variant Three</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Collapsible sidebar with a powerful command search — find pages, repos, people, and actions instantly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/">Variant One</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/variant-two">Variant Two</Link>
                </Button>
                <Button asChild size="sm" className="bg-[#171717] text-white hover:bg-[#171717]/90">
                  <Link href="/variant-three">Variant Three</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
