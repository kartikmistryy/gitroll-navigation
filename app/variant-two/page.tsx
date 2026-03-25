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
  Info,
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
  SidebarTrigger,
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
      label: 'Risks & Alerts',
      icon: ShieldAlert,
      pages: [
        { label: 'Risk Overview', href: (id) => `/org/${id}/risks` },
        { label: 'Code Quality', href: (id) => `/org/${id}/quality` },
        { label: 'Security', href: (id) => `/org/${id}/security` },
      ],
    },
    {
      label: 'Workforce',
      icon: Users,
      pages: [
        { label: 'Teams', href: (id) => `/org/${id}/teams` },
        { label: 'People', href: (id) => `/org/${id}/people` },
        { label: 'Skills', href: (id) => `/org/${id}/skills` },
      ],
    },
    {
      label: 'Repositories',
      icon: GitBranch,
      pages: [{ label: 'Repositories', href: (id) => `/org/${id}/repositories` }],
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      pages: [
        { label: 'Benchmarks', href: (id) => `/org/${id}/benchmarks` },
        { label: 'Reports', href: (id) => `/org/${id}/reports` },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      pages: [{ label: 'Settings', href: (id) => `/org/${id}/settings` }],
    },
  ],
  repo: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      pages: [{ label: 'Overview', href: (id) => `/repo/${id}/overview` }],
    },
    {
      label: 'Risks & Alerts',
      icon: ShieldAlert,
      pages: [
        { label: 'Risk Overview', href: (id) => `/repo/${id}/risks` },
        { label: 'Code Quality', href: (id) => `/repo/${id}/quality` },
      ],
    },
    {
      label: 'Contributors',
      icon: User,
      pages: [{ label: 'Contributors', href: (id) => `/repo/${id}/contributors` }],
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      pages: [{ label: 'Benchmarks', href: (id) => `/repo/${id}/benchmarks` }],
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
      label: 'Contributions',
      icon: GitBranch,
      pages: [
        { label: 'Activity', href: (id) => `/user/${id}/activity` },
        { label: 'Code Reviews', href: (id) => `/user/${id}/reviews` },
      ],
    },
    {
      label: 'Performance',
      icon: BarChart3,
      pages: [
        { label: 'Skills', href: (id) => `/user/${id}/skills` },
        { label: 'Benchmarks', href: (id) => `/user/${id}/benchmarks` },
        { label: 'Quality', href: (id) => `/user/${id}/quality` },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      pages: [{ label: 'Settings', href: (id) => `/user/${id}/settings` }],
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
  const [open, setOpen] = React.useState(false);
  const [activeKind, setActiveKind] = React.useState<DashboardKind>(dashboard);
  const [highlightOrg, setHighlightOrg] = React.useState(false);

  const meta = dashboardMeta[dashboard];
  const Icon = meta.icon;
  const entities = getEntitiesForOrg(currentOrgId);

  React.useEffect(() => {
    // Keep the two-panel selector aligned with the currently-selected dashboard.
    setActiveKind(dashboard);
  }, [dashboard, open]);

  // Highlight when org changes
  React.useEffect(() => {
    if (dashboard === 'org') {
      setHighlightOrg(true);
      const timer = setTimeout(() => setHighlightOrg(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentOrgId, dashboard]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-between gap-2 h-12 px-2 transition-all',
            highlightOrg && 'ring-2 ring-primary ring-offset-2',
          )}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2 min-w-0">
            <Icon className="size-4 shrink-0" />
            <span className="truncate text-left">
              <span className="text-sidebar-foreground/70 text-xs font-medium">
                {meta.label}
              </span>
              <span className="block text-sm font-medium">{entity.name}</span>
            </span>
          </span>
          <ChevronDown
            className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-fit p-0 max-h-[280px] overflow-hidden"
        side="bottom"
        sideOffset={4}
      >
        <div
          role="menu"
          aria-label="Switch dashboard"
          className="bg-popover text-popover-foreground"
        >
          <div className="grid w-fit grid-cols-[120px_1fr] gap-5 divide-x divide-sidebar-border">
            {/* Left: parent triggers */}
            <div className="p-2 w-full min-w-[150px] max-h-[280px] overflow-y-auto">
              <div className="text-sidebar-foreground/70 px-2 pb-1 text-xs font-medium">
                Dashboards
              </div>
              <div className="space-y-1">
                {(Object.keys(dashboardMeta) as DashboardKind[]).map((kind) => {
                  const m = dashboardMeta[kind];
                  const KIcon = m.icon;
                  const selected = kind === activeKind;
                  const count = entities[kind].length;
                  return (
                    <button
                      key={kind}
                      type="button"
                      className={cn(
                        'hover:bg-sidebar-accent flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
                        selected && 'bg-sidebar-accent',
                      )}
                      onClick={() => setActiveKind(kind)}
                    >
                      <KIcon className="size-4" />
                      <span className="font-medium flex-1">{m.label}</span>
                      {kind !== 'org' && (
                        <span className="text-xs text-muted-foreground">({count})</span>
                      )}
                    </button>
                  );
                })}
              </div>
              {/* Show org context */}
              {activeKind !== 'org' && (
                <div className="mt-2 pt-2 border-t border-sidebar-border px-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Info className="size-3" />
                    <span>
                      Showing {activeKind}s for{' '}
                      {entities.org.find((o) => o.id === currentOrgId)?.name || currentOrgId}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right: children for selected parent */}
            <div className="p-2 w-full min-w-[200px] max-h-[280px] overflow-y-auto">
              <div className="flex w-full items-center justify-between px-2 pb-1">
                <div className="text-sidebar-foreground/70 text-xs font-medium">
                  {dashboardMeta[activeKind].label}
                </div>
                {/* {activeKind === dashboard && (
                  <div className="text-xs text-muted-foreground">Current</div>
                )} */}
              </div>
              <div className="space-y-1 px-1">
                {entities[activeKind].map((e) => {
                  const isCurrent = activeKind === dashboard && e.id === entity.id;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      className={cn(
                        'hover:bg-sidebar-accent flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
                        isCurrent && 'bg-sidebar-accent',
                      )}
                      onClick={() => {
                        onSelect(activeKind, e.id);
                        setOpen(false);
                      }}
                    >
                      <span className="truncate">{e.name}</span>
                      {isCurrent && <Check className="ml-auto size-4" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
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
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              GR
            </div>
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              GitRoll
            </span>
          </div>
          <div className="px-1 pb-2">
            <DashboardSwitcher
              dashboard={dashboard}
              entity={entity}
              onSelect={(nextDash, nextEntityId) => {
                setSelection(nextDash, nextEntityId, 'Overview');
              }}
              currentOrgId={currentOrgId}
            />
          </div>
          {/* Show notification when org changes */}
          {orgChanged && (
            <div className="px-2 pb-2">
              <div className="flex items-center gap-2 rounded-md bg-primary/10 px-2 py-1.5 text-xs text-primary animate-in fade-in slide-in-from-top-2">
                <Info className="size-3" />
                <span>
                  Switched to {entity.name}. People and repos updated.
                </span>
              </div>
            </div>
          )}
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
          <SidebarGroup>
            <SidebarMenu>
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
                      <CollapsibleContent>
                        <SidebarMenu className="ml-4 border-l pl-3 h-fit">
                          {section.pages.map((page) => (
                            <SidebarMenuItem key={page.label}>
                              <SidebarMenuButton
                                asChild
                                isActive={activePage === page.label}
                                onClick={() => setSelection(dashboard, entity.id, page.label)}
                              >
                                <Link
                                  href={selectionHref(dashboard, entity.id, page.label)}
                                  className="py-1.5"
                                >
                                  <span>{page.label}</span>
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
          <SidebarTrigger />
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

        <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
          <h3 className="text-lg font-semibold">Dashboard content goes here</h3>
          <p className="mt-2 max-w-xl text-center text-sm text-muted-foreground">
            The sidebar shows different page links depending on which dashboard you’re on, and you
            can switch dashboards/entities via the “popover” switcher at the top.
          </p>
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