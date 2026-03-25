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
} from 'lucide-react';
import {
  FloatingPortal,
  autoUpdate,
  flip,
  offset as floatingOffset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';

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
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/animate-ui/components/radix/sidebar';

type DashboardKind = 'org' | 'repo' | 'user';
type Entity = { id: string; name: string };

const dashboards: Array<{
  kind: DashboardKind;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { kind: 'org', label: 'Org', icon: Building2 },
  { kind: 'repo', label: 'Repo', icon: GitBranch },
  { kind: 'user', label: 'Users', icon: User },
];

const entities: Record<DashboardKind, Entity[]> = {
  org: [
    { id: 'gitroll', name: 'GitRoll' },
    { id: 'acme', name: 'Acme Inc' },
  ],
  repo: [
    { id: 'web-app', name: 'web-app' },
    { id: 'api-server', name: 'api-server' },
    { id: 'shared-libs', name: 'shared-libs' },
  ],
  user: [
    { id: 'john-doe', name: 'John Doe' },
    { id: 'jane-smith', name: 'Jane Smith' },
    { id: 'alex-chen', name: 'Alex Chen' },
    { id: 'priya-patel', name: 'Priya Patel' },
    { id: 'mike-wilson', name: 'Mike Wilson' },
    { id: 'sarah-johnson', name: 'Sarah Johnson' },
    { id: 'emily-brown', name: 'Emily Brown' },
    { id: 'daniel-kim', name: 'Daniel Kim' },
    { id: 'sofia-garcia', name: 'Sofia Garcia' },
    { id: 'noah-lee', name: 'Noah Lee' },
  ],
};

type PageDef = { label: string; slug: string };

type PageSection = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  pages: PageDef[];
};

const pagesByDashboard: Record<DashboardKind, PageSection[]> = {
  org: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      pages: [{ label: 'Overview', slug: 'overview' }],
    },
    {
      label: 'Risks & Alerts',
      icon: ShieldAlert,
      pages: [
        { label: 'Risk Overview', slug: 'risks' },
        { label: 'Code Quality', slug: 'quality' },
        { label: 'Security', slug: 'security' },
      ],
    },
    {
      label: 'Workforce',
      icon: Users,
      pages: [
        { label: 'Teams', slug: 'teams' },
        { label: 'People', slug: 'people' },
        { label: 'Skills', slug: 'skills' },
      ],
    },
    {
      label: 'Repositories',
      icon: GitBranch,
      pages: [{ label: 'Repositories', slug: 'repositories' }],
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      pages: [
        { label: 'Benchmarks', slug: 'benchmarks' },
        { label: 'Reports', slug: 'reports' },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      pages: [{ label: 'Settings', slug: 'settings' }],
    },
  ],
  repo: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      pages: [{ label: 'Overview', slug: 'overview' }],
    },
    {
      label: 'Risks & Alerts',
      icon: ShieldAlert,
      pages: [
        { label: 'Risk Overview', slug: 'risks' },
        { label: 'Code Quality', slug: 'quality' },
      ],
    },
    {
      label: 'Contributors',
      icon: User,
      pages: [{ label: 'Contributors', slug: 'contributors' }],
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      pages: [{ label: 'Benchmarks', slug: 'benchmarks' }],
    },
    {
      label: 'Settings',
      icon: Settings,
      pages: [{ label: 'Settings', slug: 'settings' }],
    },
  ],
  user: [
    {
      label: 'Overview',
      icon: LayoutDashboard,
      pages: [{ label: 'Overview', slug: 'overview' }],
    },
    {
      label: 'Contributions',
      icon: GitBranch,
      pages: [
        { label: 'Activity', slug: 'activity' },
        { label: 'Code Reviews', slug: 'reviews' },
      ],
    },
    {
      label: 'Performance',
      icon: BarChart3,
      pages: [
        { label: 'Skills', slug: 'skills' },
        { label: 'Benchmarks', slug: 'benchmarks' },
        { label: 'Quality', slug: 'quality' },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      pages: [{ label: 'Settings', slug: 'settings' }],
    },
  ],
};

const dashboardMeta: Record<
  DashboardKind,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  org: { label: 'Org', icon: Building2 },
  repo: { label: 'Repo', icon: GitBranch },
  user: { label: 'Users', icon: User },
};

function DashboardSwitcher({
  dashboard,
  entity,
  onSelect,
}: {
  dashboard: DashboardKind;
  entity: Entity;
  onSelect: (nextDashboard: DashboardKind, nextEntityId: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const referenceElRef = React.useRef<HTMLButtonElement | null>(null);
  const floatingElRef = React.useRef<HTMLDivElement | null>(null);

  const { refs, floatingStyles, context, update } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'right-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      floatingOffset(8),
      flip({
        fallbackPlacements: ['left-start', 'bottom-start', 'top-start'],
      }),
      shift({ padding: 8 }),
    ],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'menu' });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const setReference = React.useCallback(
    (node: HTMLButtonElement | null) => {
      referenceElRef.current = node;
      refs.setReference(node);
    },
    [refs],
  );

  const setFloating = React.useCallback(
    (node: HTMLDivElement | null) => {
      floatingElRef.current = node;
      refs.setFloating(node);
    },
    [refs],
  );

  React.useLayoutEffect(() => {
    if (open) update();
  }, [open, update]);

  const meta = dashboardMeta[dashboard];
  const Icon = meta.icon;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="w-full justify-between gap-2"
        ref={setReference}
        {...getReferenceProps({ 'aria-haspopup': 'menu' })}
      >
        <span className="flex min-w-0 items-center gap-2">
          <Icon className="size-4 shrink-0" />
          <span className="min-w-0 truncate text-left">
            <span className="text-sidebar-foreground/70 text-xs font-medium">{meta.label}</span>
            <span className="block truncate text-sm font-medium">{entity.name}</span>
          </span>
        </span>
        <ChevronDown className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')} />
      </Button>

      {open && (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={floatingStyles}
            aria-label="Switch dashboard"
            className="bg-popover text-popover-foreground border-sidebar-border z-50 max-h-[280px] min-w-[220px] overflow-hidden rounded-lg border shadow-sm"
            {...getFloatingProps()}
          >
            <div className="max-h-[280px] overflow-y-auto p-2">
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="text-sidebar-foreground/70 text-xs font-medium">{meta.label}</div>
                
              </div>
              <div className="space-y-1 px-1">
                {entities[dashboard].map((e) => {
                  const isCurrent = e.id === entity.id;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      className={cn(
                        'hover:bg-sidebar-accent flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm',
                        isCurrent && 'bg-sidebar-accent',
                      )}
                      onClick={() => {
                        onSelect(dashboard, e.id);
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
        </FloatingPortal>
      )}
    </div>
  );
}

function VariantThreeContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [dashboard, setDashboard] = React.useState<DashboardKind>('org');
  const [entityId, setEntityId] = React.useState<string>(entities.org[0]!.id);
  const [activePage, setActivePage] = React.useState<string>('Overview');
  const [openSections, setOpenSections] = React.useState<Set<string>>(new Set(['Overview']));

  const currentEntity =
    entities[dashboard].find((e) => e.id === entityId) ?? entities[dashboard][0]!;

  const pages = pagesByDashboard[dashboard];

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
      setDashboard(nextDash);
      setEntityId(nextEntityId);
      setActivePage(nextPage);
      router.replace(selectionHref(nextDash, nextEntityId, nextPage), { scroll: false });
    },
    [router, selectionHref],
  );

  React.useEffect(() => {
    const rawDash = searchParams.get('dashboard');
    const nextDash: DashboardKind =
      rawDash === 'org' || rawDash === 'repo' || rawDash === 'user'
        ? rawDash
        : dashboard;

    const rawEntityId = searchParams.get('entityId');
    const nextEntityId =
      rawEntityId && entities[nextDash].some((e) => e.id === rawEntityId)
        ? rawEntityId
        : entities[nextDash][0]!.id;

    const rawPage = searchParams.get('page');
    const allowed = pagesByDashboard[nextDash];
    const allPages = allowed.flatMap((section) => section.pages.map((p) => p.label));
    const nextPage = rawPage && allPages.includes(rawPage) ? rawPage : 'Overview';

    if (nextDash !== dashboard) setDashboard(nextDash);
    if (nextEntityId !== entityId) setEntityId(nextEntityId);
    if (nextPage !== activePage) setActivePage(nextPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  React.useEffect(() => {
    // Ensure the active page is valid for the current dashboard.
    const allPages = pages.flatMap((section) => section.pages.map((p) => p.label));
    if (!allPages.includes(activePage)) {
      setActivePage('Overview');
    }
  }, [activePage, dashboard, pages]);

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
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          <SidebarGroup>
            {/* Two-pane sidebar: icon rail (left) + details panel (right) */}
            <div className="flex min-h-0 flex-1 gap-2">
              <div className="border-sidebar-border flex w-12 shrink-0 flex-col items-center gap-1 border-r py-2">
                {dashboards.map((d) => {
                  const Icon = d.icon;
                  const selected = d.kind === dashboard;
                  return (
                    <button
                      key={d.kind}
                      type="button"
                      aria-label={d.label}
                      className={cn(
                        'hover:bg-sidebar-accent flex size-9 items-center justify-center rounded-md outline-hidden transition-colors',
                        selected && 'bg-sidebar-accent',
                      )}
                      onClick={() => {
                        setSelection(d.kind, entities[d.kind][0]!.id, 'Overview');
                      }}
                    >
                      <Icon className="size-4" />
                    </button>
                  );
                })}
              </div>

              <div className="min-w-0 flex-1 py-2">
                <div className="px-2">
                  <DashboardSwitcher
                    dashboard={dashboard}
                    entity={currentEntity}
                    onSelect={(nextDash, nextEntityId) => {
                      setSelection(nextDash, nextEntityId, 'Overview');
                    }}
                  />
                </div>

                <div className="px-2 py-2">
                  <Separator />
                </div>

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
                            onClick={() => setSelection(dashboard, entityId, page.label)}
                          >
                            <Link href={selectionHref(dashboard, entityId, page.label)}>
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
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
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
                            <SidebarMenu className="ml-4 border-l pl-3">
                              {section.pages.map((page) => (
                                <SidebarMenuItem key={page.label}>
                                  <SidebarMenuButton
                                    asChild
                                    isActive={activePage === page.label}
                                    onClick={() => setSelection(dashboard, entityId, page.label)}
                                  >
                                    <Link
                                      href={selectionHref(dashboard, entityId, page.label)}
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
              </div>
            </div>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-sidebar-foreground/70 text-xs font-medium">
                    Back to Variant One
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b px-6">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/variant-three" className="font-semibold text-foreground">
                    Variant Three
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={selectionHref(dashboard, entities[dashboard][0]!.id, pages[0]!.label)}>
                    {dashboards.find((d) => d.kind === dashboard)?.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={selectionHref(dashboard, currentEntity.id, pages[0]!.label)}>
                    {currentEntity.name}
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
          <h3 className="text-lg font-semibold">Two-pane navigation</h3>
          <p className="mt-2 max-w-xl text-center text-sm text-muted-foreground">
            Use the icon rail to switch dashboard types, then pick an entity, then pick a page—no
            nested accordions.
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

export default function VariantThree() {
  return (
    <React.Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <VariantThreeContent />
    </React.Suspense>
  );
}