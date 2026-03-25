'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  GitBranch,
  LayoutDashboard,
  ShieldAlert,
  Users,
  User,
  Settings,
  Home as HomeIcon,
  MapPin,
  Sparkles,
  UserCircle,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/animate-ui/components/radix/sidebar';

type DashboardKind = 'org' | 'repo' | 'user';

type Entity = { id: string; name: string; orgId?: string };

// Structure entities by organization
const entitiesByOrg: Record<string, Record<DashboardKind, Entity[]>> = {
  gitroll: {
    org: [
      { id: 'gitroll', name: 'GitRoll' },
      { id: 'acme', name: 'Acme Inc' },
    ],
    repo: [
      { id: 'web-app', name: 'web-app', orgId: 'gitroll' },
      { id: 'api-server', name: 'api-server', orgId: 'gitroll' },
    ],
    user: [
      { id: 'john-doe', name: 'John Doe', orgId: 'gitroll' },
      { id: 'jane-smith', name: 'Jane Smith', orgId: 'gitroll' },
      { id: 'alex-chen', name: 'Alex Chen', orgId: 'gitroll' },
      { id: 'priya-patel', name: 'Priya Patel', orgId: 'gitroll' },
      { id: 'mike-wilson', name: 'Mike Wilson', orgId: 'gitroll' },
      { id: 'sarah-johnson', name: 'Sarah Johnson', orgId: 'gitroll' },
      { id: 'emily-brown', name: 'Emily Brown', orgId: 'gitroll' },
      { id: 'daniel-kim', name: 'Daniel Kim', orgId: 'gitroll' },
      { id: 'sofia-garcia', name: 'Sofia Garcia', orgId: 'gitroll' },
      { id: 'noah-lee', name: 'Noah Lee', orgId: 'gitroll' },
    ],
  },
  acme: {
    org: [
      { id: 'gitroll', name: 'GitRoll' },
      { id: 'acme', name: 'Acme Inc' },
    ],
    repo: [
      { id: 'crm-app', name: 'crm-app', orgId: 'acme' },
      { id: 'marketing-site', name: 'marketing-site', orgId: 'acme' },
      { id: 'support-portal', name: 'support-portal', orgId: 'acme' },
    ],
    user: [
      { id: 'sarah-johnson', name: 'Sarah Johnson', orgId: 'acme' },
      { id: 'emily-brown', name: 'Emily Brown', orgId: 'acme' },
      { id: 'daniel-kim', name: 'Daniel Kim', orgId: 'acme' },
      { id: 'sofia-garcia', name: 'Sofia Garcia', orgId: 'acme' },
      { id: 'james-wilson', name: 'James Wilson', orgId: 'acme' },
      { id: 'lisa-anderson', name: 'Lisa Anderson', orgId: 'acme' },
    ],
  },
};

// Helper to get entities for current org
function getEntitiesForOrg(orgId: string): Record<DashboardKind, Entity[]> {
  return entitiesByOrg[orgId] || entitiesByOrg.gitroll;
}

const dashboardMeta: Record<
  DashboardKind,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  org: { label: 'Org', icon: Building2 },
  repo: { label: 'Repo', icon: GitBranch },
  user: { label: 'Users', icon: User },
};

// Main navigation items
const mainNavItems = [
  { title: 'Home', url: '#', icon: HomeIcon },
  { title: 'Skill Maps', url: '#', icon: MapPin },
  { title: 'Ask AI', url: '#', icon: Sparkles },
];

type PageLink = {
  label: string;
  href: (entityId: string) => string;
  icon?: React.ComponentType<{ className?: string }>;
};

type PageSection = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultOpen?: boolean;
  pages: PageLink[];
};

const pagesByDashboard: Record<DashboardKind, PageSection[]> = {
  org: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      pages: [{ label: 'Overview', href: (id) => `/org/${id}/overview` }],
    },
    {
      label: 'Performance',
      icon: BarChart3,
      pages: [
        { label: 'Performance', href: (id) => `/org/${id}/performance` },
        { label: 'SPOF', href: (id) => `/org/${id}/spof` },
        { label: 'Outliers', href: (id) => `/org/${id}/outliers` },
        { label: 'Benchmarks', href: (id) => `/org/${id}/benchmarks` },
      ],
    },
    {
      label: 'Workforce',
      icon: Users,
      pages: [
        { label: 'People', href: (id) => `/org/${id}/people` },
        { label: 'Repositories', href: (id) => `/org/${id}/repositories` },
        { label: 'Skill Gaps', href: (id) => `/org/${id}/skill-gaps` },
      ],
    },
    {
      label: 'SkillsGraph',
      icon: GitBranch,
      pages: [{ label: 'SkillsGraph', href: (id) => `/org/${id}/skillsgraph` }],
    },
    {
      label: 'AI Consultant',
      icon: ShieldAlert,
      pages: [
        { label: 'Ask AI', href: (id) => `/org/${id}/ai-consultant` },
        { label: 'Growth Suggestions', href: (id) => `/org/${id}/growth` },
        { label: 'Risk Alerts', href: (id) => `/org/${id}/risk-alerts` },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      pages: [
        { label: 'General', href: (id) => `/org/${id}/settings` },
        { label: 'Integrations', href: (id) => `/org/${id}/integrations` },
        { label: 'Notifications', href: (id) => `/org/${id}/notifications` },
      ],
    },
  ],
  repo: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      pages: [{ label: 'Overview', href: (id) => `/repo/${id}/overview` }],
    },
    {
      label: 'Performance',
      icon: BarChart3,
      pages: [
        { label: 'Performance', href: (id) => `/repo/${id}/performance` },
        { label: 'Code Quality', href: (id) => `/repo/${id}/code-quality` },
        { label: 'Complexity', href: (id) => `/repo/${id}/complexity` },
      ],
    },
    {
      label: 'Contributors',
      icon: User,
      pages: [
        { label: 'Contributors', href: (id) => `/repo/${id}/contributors` },
        { label: 'Commit Activity', href: (id) => `/repo/${id}/commit-activity` },
        { label: 'PR Reviews', href: (id) => `/repo/${id}/pr-reviews` },
      ],
    },
    {
      label: 'Security',
      icon: ShieldAlert,
      pages: [
        { label: 'Vulnerabilities', href: (id) => `/repo/${id}/vulnerabilities` },
        { label: 'Dependencies', href: (id) => `/repo/${id}/dependencies` },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      pages: [{ label: 'Settings', href: (id) => `/repo/${id}/settings` }],
    },
  ],
  user: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      pages: [{ label: 'Overview', href: (id) => `/user/${id}/overview` }],
    },
    {
      label: 'Performance',
      icon: BarChart3,
      pages: [
        { label: 'Performance', href: (id) => `/user/${id}/performance` },
        { label: 'Skills', href: (id) => `/user/${id}/skills` },
        { label: 'Quality Score', href: (id) => `/user/${id}/quality` },
      ],
    },
    {
      label: 'Activity',
      icon: Users,
      pages: [
        { label: 'Activity', href: (id) => `/user/${id}/activity` },
        { label: 'Code Reviews', href: (id) => `/user/${id}/code-reviews` },
        { label: 'Commits', href: (id) => `/user/${id}/commits` },
      ],
    },
    {
      label: 'Growth',
      icon: GitBranch,
      pages: [
        { label: 'Recommendations', href: (id) => `/user/${id}/recommendations` },
        { label: 'Learning Path', href: (id) => `/user/${id}/learning-path` },
      ],
    },
  ],
};

function DashboardSwitcher({
  dashboard,
  entity,
  onSelect,
  currentOrgId,
}: {
  dashboard: DashboardKind;
  entity: Entity;
  onSelect: (nextDashboard: DashboardKind, nextEntityId: string) => void;
  currentOrgId: string;
}) {
  const [entityDropdownOpen, setEntityDropdownOpen] = React.useState(false);
  const entities = getEntitiesForOrg(currentOrgId);

  const kinds: DashboardKind[] = ['org', 'repo', 'user'];
  const Icon = dashboardMeta[dashboard].icon;

  return (
    <div className="space-y-1.5">
      {/* View type tabs */}
      <div className="flex gap-0.5 rounded-full bg-sidebar-accent p-1">
        {kinds.map((kind) => {
          const m = dashboardMeta[kind];
          const isActive = kind === dashboard;
          return (
            <button
              key={kind}
              type="button"
              onClick={() => {
                const firstEntity = entities[kind][0];
                if (firstEntity) onSelect(kind, firstEntity.id);
              }}
              className={cn(
                'flex flex-1 items-center justify-center gap-1 rounded-full py-1.5 text-[11px] font-medium cursor-pointer transition-all',
                isActive
                  ? 'bg-background text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Entity selector */}
      <Popover open={entityDropdownOpen} onOpenChange={setEntityDropdownOpen}>
        <PopoverTrigger asChild>
          <button
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent transition-colors cursor-pointer"
          >
            <Icon className="size-4 text-muted-foreground shrink-0" />
            <span className="truncate font-medium flex-1 text-left">{entity.name}</span>
            <ChevronDown
              className={cn(
                'size-3.5 shrink-0 text-muted-foreground transition-transform',
                entityDropdownOpen && 'rotate-180',
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-1"
          side="bottom"
          sideOffset={4}
        >
          <div className="max-h-[240px] overflow-y-auto space-y-0.5">
            {entities[dashboard].map((e) => {
              const isCurrent = e.id === entity.id;
              return (
                <button
                  key={e.id}
                  type="button"
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors',
                    isCurrent
                      ? 'bg-sidebar-accent text-foreground font-medium'
                      : 'hover:bg-sidebar-accent/60 text-foreground',
                  )}
                  onClick={() => {
                    onSelect(dashboard, e.id);
                    setEntityDropdownOpen(false);
                  }}
                >
                  <span className="truncate flex-1">{e.name}</span>
                  {isCurrent && <Check className="size-3.5 shrink-0 text-muted-foreground" />}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function VariantTwoContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [dashboard, setDashboard] = React.useState<DashboardKind>('org');
  const [entityId, setEntityId] = React.useState<string>('gitroll');
  const [activePage, setActivePage] = React.useState<string>('Overview');
  const [openSections, setOpenSections] = React.useState<Set<string>>(new Set(['Overview']));
  const [orgChanged, setOrgChanged] = React.useState(false);

  // Get current org ID
  const currentOrgId = React.useMemo(() => {
    if (dashboard === 'org') {
      return entityId;
    }
    // For non-org dashboards, find the org from the entity
    const allOrgs = Object.keys(entitiesByOrg);
    for (const orgId of allOrgs) {
      const orgEntities = entitiesByOrg[orgId];
      if (orgEntities[dashboard].some((e) => e.id === entityId)) {
        return orgId;
      }
    }
    return 'gitroll';
  }, [dashboard, entityId]);

  const entities = React.useMemo(() => getEntitiesForOrg(currentOrgId), [currentOrgId]);

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

  const selectionHref = React.useCallback(
    (nextDash: DashboardKind, nextEntityId: string, nextPage: string) => {
      const qs = createQueryString({
        dashboard: nextDash,
        entityId: nextEntityId,
        page: nextPage,
      });
      return `${pathname}?${qs}`;
    },
    [createQueryString, pathname],
  );

  const setSelection = React.useCallback(
    (nextDash: DashboardKind, nextEntityId: string, nextPage: string) => {
      const prevOrgId = currentOrgId;
      setDashboard(nextDash);
      setEntityId(nextEntityId);
      setActivePage(nextPage);

      // Detect org change
      const nextOrgId = nextDash === 'org' ? nextEntityId : currentOrgId;
      if (nextOrgId !== prevOrgId && nextDash === 'org') {
        setOrgChanged(true);
        setTimeout(() => setOrgChanged(false), 3000);
      }

      router.replace(selectionHref(nextDash, nextEntityId, nextPage), { scroll: false });
    },
    [router, selectionHref, currentOrgId],
  );

  React.useEffect(() => {
    const rawDash = searchParams.get('dashboard');
    const nextDash: DashboardKind =
      rawDash === 'org' || rawDash === 'repo' || rawDash === 'user'
        ? rawDash
        : dashboard;

    const nextOrgId =
      nextDash === 'org'
        ? searchParams.get('entityId') || 'gitroll'
        : currentOrgId;
    const entitiesForDash = getEntitiesForOrg(nextOrgId);

    const rawEntityId = searchParams.get('entityId');
    const nextEntityId =
      rawEntityId && entitiesForDash[nextDash].some((e) => e.id === rawEntityId)
        ? rawEntityId
        : entitiesForDash[nextDash][0]!.id;

    const rawPage = searchParams.get('page');
    const allowed = pagesByDashboard[nextDash];
    const allPages = allowed.flatMap((section) => section.pages.map((p) => p.label));
    const nextPage = rawPage && allPages.includes(rawPage) ? rawPage : 'Overview';

    // Detect org change from URL
    if (nextDash === 'org' && nextEntityId !== currentOrgId) {
      setOrgChanged(true);
      setTimeout(() => setOrgChanged(false), 3000);
    }

    if (nextDash !== dashboard) setDashboard(nextDash);
    if (nextEntityId !== entityId) setEntityId(nextEntityId);
    if (nextPage !== activePage) setActivePage(nextPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const entity = React.useMemo(() => {
    return entities[dashboard].find((e) => e.id === entityId) ?? entities[dashboard][0]!;
  }, [dashboard, entityId, entities]);

  const pages = pagesByDashboard[dashboard];

  // Auto-open section containing active page
  React.useEffect(() => {
    const activeSection = pages.find((section) =>
      section.pages.some((p) => p.label === activePage),
    );
    if (activeSection && !openSections.has(activeSection.label)) {
      setOpenSections((prev) => new Set(prev).add(activeSection.label));
    }
  }, [activePage, pages, openSections]);

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="border-b border-sidebar-border p-3 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-white text-sm font-bold">
              GR
            </div>
            <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">
              GitRoll
            </span>
          </div>
          <DashboardSwitcher
            dashboard={dashboard}
            entity={entity}
            onSelect={(nextDash, nextEntityId) => {
              setSelection(nextDash, nextEntityId, 'Overview');
            }}
            currentOrgId={currentOrgId}
          />
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                {mainNavItems.map((item) => (
                  <SidebarMenuItem className="h-10 font-medium" key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="h-10 font-medium">
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="px-2 py-2">
            <Separator />
          </div>

          {/* Page Sections */}
          <SidebarGroup className="overflow-hidden">
            <SidebarMenu className="overflow-hidden">
              {pages.map((section) => {
                const SectionIcon = section.icon;
                const isOpen = openSections.has(section.label);
                const hasActiveChild = section.pages.some((p) => p.label === activePage);

                // Single page sections render flat
                if (section.pages.length === 1) {
                  const page = section.pages[0]!;
                  return (
                    <SidebarMenuItem key={section.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={activePage === page.label}
                        onClick={() => setSelection(dashboard, entity.id, page.label)}
                      >
                        <Link
                          href={selectionHref(dashboard, entity.id, page.label)}
                          className="flex items-center gap-2 h-10"
                        >
                          <SectionIcon className="size-4" />
                          <span>{section.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // Multi-page sections render as collapsible
                return (
                  <Collapsible
                    key={section.label}
                    open={isOpen}
                    onOpenChange={(open) => {
                      setOpenSections((prev) => {
                        const next = new Set(prev);
                        if (open) next.add(section.label);
                        else next.delete(section.label);
                        return next;
                      });
                    }}
                    className="h-fit"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger className="h-10!" asChild>
                        <SidebarMenuButton className={cn(hasActiveChild && 'font-medium')}>
                          <SectionIcon className="size-4" />
                          <span>{section.label}</span>
                          <ChevronRight
                            className={cn(
                              'ml-auto size-4 transition-transform',
                              isOpen && 'rotate-90',
                            )}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden">
                        <SidebarMenu className="ml-4 border-l pl-3 h-fit w-[calc(100%-1rem)]">
                          {section.pages.map((page) => (
                            <SidebarMenuItem key={page.label} className="overflow-hidden">
                              <SidebarMenuButton
                                asChild
                                isActive={activePage === page.label}
                                onClick={() => setSelection(dashboard, entity.id, page.label)}
                                className="overflow-hidden"
                              >
                                <Link
                                  href={selectionHref(dashboard, entity.id, page.label)}
                                  className="py-1.5 overflow-hidden"
                                >
                                  <span className="truncate">{page.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
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
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/variant-two" className="font-semibold text-foreground">
                    Variant Two
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={selectionHref(
                      dashboard,
                      entities[dashboard][0]!.id,
                      pages[0]!.pages[0]!.label,
                    )}
                  >
                    {dashboardMeta[dashboard].label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={selectionHref(dashboard, entity.id, pages[0]!.pages[0]!.label)}
                  >
                    {entity.name}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{activePage}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="relative flex flex-1 flex-col bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
          {/* Dashboard content behind overlay */}
          <div className="flex-1 p-6 space-y-6 overflow-auto">
            {/* Stat cards row */}
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
                    <span className={cn(
                      'text-xs font-medium px-1.5 py-0.5 rounded',
                      stat.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50',
                    )}>{stat.change}</span>
                  </div>
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <div>
                    <p className="text-sm font-medium">{stat.desc}</p>
                    <p className="text-xs text-muted-foreground">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Performance</h3>
                  <p className="text-sm text-muted-foreground">Total for the last 3 months</p>
                </div>
                <div className="flex gap-1 rounded-lg border p-0.5">
                  {['3 months', '30 days', '7 days'].map((period) => (
                    <button key={period} className={cn(
                      'px-3 py-1 text-xs font-medium rounded-md transition-colors',
                      period === '3 months' ? 'bg-zinc-100 text-foreground dark:bg-zinc-800' : 'text-muted-foreground hover:text-foreground',
                    )}>{period}</button>
                  ))}
                </div>
              </div>
              {/* Fake chart */}
              <div className="h-48 relative">
                <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#171717" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,150 C100,120 150,80 250,60 C350,40 400,90 500,50 C600,10 700,70 800,30" fill="none" stroke="#171717" strokeWidth="2" />
                  <path d="M0,150 C100,120 150,80 250,60 C350,40 400,90 500,50 C600,10 700,70 800,30 L800,200 L0,200 Z" fill="url(#chartGrad)" />
                  <path d="M0,170 C100,155 200,140 300,130 C400,120 500,145 600,125 C700,105 750,110 800,90" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border bg-white dark:bg-zinc-900">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex gap-4">
                  {['Outline', 'Past Performance', 'Key Personnel', 'Focus Documents'].map((tab, i) => (
                    <span key={tab} className={cn('text-sm', i === 0 ? 'font-semibold text-foreground' : 'text-muted-foreground')}>{tab}</span>
                  ))}
                </div>
              </div>
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
                    { header: 'Capabilities', type: 'Narrative', status: 'In Process', target: 20, reviewer: 'Jamik T.' },
                  ].map((row) => (
                    <tr key={row.header} className="border-b last:border-0 text-sm">
                      <td className="py-3 px-4 font-medium">{row.header}</td>
                      <td className="py-3 px-4"><span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">{row.type}</span></td>
                      <td className="py-3 px-4">
                        <span className={cn(
                          'inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs',
                          row.status === 'Done' ? 'text-emerald-700' : 'text-muted-foreground',
                        )}>
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
              <h2 className="text-2xl font-bold tracking-tight">Variant Two</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Collapsible sidebar with segmented view switcher, nested page sections, and entity-scoped navigation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/">Variant One</Link>
                </Button>
                <Button asChild size="sm" className="bg-[#171717] text-white hover:bg-[#171717]/90">
                  <Link href="/variant-two">Variant Two</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
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

export default function VariantTwo() {
  return (
    <React.Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <VariantTwoContent />
    </React.Suspense>
  );
}