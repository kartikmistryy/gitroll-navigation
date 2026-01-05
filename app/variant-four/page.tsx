'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Bookmark,
  Building2,
  GitBranch,
  Search,
  Users,
  User,
  History,
  ArrowUpDown,
  Clock,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
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

type DashboardKind = 'org' | 'team' | 'repo' | 'user';

type NavHit = {
  kind: DashboardKind;
  entityId: string;
  entityName: string;
  page: string;
  href: string;
};

const iconByKind: Record<DashboardKind, React.ComponentType<{ className?: string }>> = {
  org: Building2,
  team: Users,
  repo: GitBranch,
  user: User,
};

const seedHits: NavHit[] = [
  { kind: 'org', entityId: 'gitroll', entityName: 'GitRoll', page: 'Overview', href: '/org/gitroll/overview' },
  { kind: 'org', entityId: 'gitroll', entityName: 'GitRoll', page: 'Risks', href: '/org/gitroll/risks' },
  { kind: 'org', entityId: 'acme', entityName: 'Acme Inc', page: 'Quality', href: '/org/acme/quality' },
  { kind: 'team', entityId: 'frontend', entityName: 'Frontend Team', page: 'Benchmarks', href: '/team/frontend/benchmarks' },
  { kind: 'team', entityId: 'platform', entityName: 'Platform Team', page: 'People', href: '/team/platform/people' },
  { kind: 'team', entityId: 'design', entityName: 'Design Systems', page: 'Overview', href: '/team/design/overview' },
  { kind: 'team', entityId: 'data', entityName: 'Data & Analytics', page: 'Quality', href: '/team/data/quality' },
  { kind: 'team', entityId: 'security', entityName: 'Security', page: 'Risks', href: '/team/security/risks' },
  { kind: 'team', entityId: 'qa', entityName: 'QA & Release', page: 'Benchmarks', href: '/team/qa/benchmarks' },
  { kind: 'repo', entityId: 'web-app', entityName: 'web-app', page: 'Overview', href: '/repo/web-app/overview' },
  { kind: 'repo', entityId: 'api-server', entityName: 'api-server', page: 'Risks', href: '/repo/api-server/risks' },
  { kind: 'user', entityId: 'john-doe', entityName: 'John Doe', page: 'Skills', href: '/user/john-doe/skills' },
  { kind: 'user', entityId: 'jane-smith', entityName: 'Jane Smith', page: 'Quality', href: '/user/jane-smith/quality' },
  { kind: 'user', entityId: 'alex-chen', entityName: 'Alex Chen', page: 'Overview', href: '/user/alex-chen/overview' },
  { kind: 'user', entityId: 'priya-patel', entityName: 'Priya Patel', page: 'Benchmarks', href: '/user/priya-patel/benchmarks' },
  { kind: 'user', entityId: 'mike-wilson', entityName: 'Mike Wilson', page: 'Risks', href: '/user/mike-wilson/risks' },
  { kind: 'user', entityId: 'sarah-johnson', entityName: 'Sarah Johnson', page: 'Quality', href: '/user/sarah-johnson/quality' },
  { kind: 'user', entityId: 'emily-brown', entityName: 'Emily Brown', page: 'Skills', href: '/user/emily-brown/skills' },
  { kind: 'user', entityId: 'daniel-kim', entityName: 'Daniel Kim', page: 'Overview', href: '/user/daniel-kim/overview' },
  { kind: 'user', entityId: 'sofia-garcia', entityName: 'Sofia Garcia', page: 'Benchmarks', href: '/user/sofia-garcia/benchmarks' },
  { kind: 'user', entityId: 'noah-lee', entityName: 'Noah Lee', page: 'Risks', href: '/user/noah-lee/risks' },
];

function labelForKind(kind: DashboardKind) {
  if (kind === 'org') return 'Org';
  if (kind === 'team') return 'Team';
  if (kind === 'repo') return 'Repo';
  return 'People';
}

type FilterOption = {
  id: DashboardKind | 'all';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
};

function NavRow({
  hit,
  active,
  pinned,
  onOpen,
  onTogglePin,
  compact = false,
}: {
  hit: NavHit;
  active: boolean;
  pinned: boolean;
  onOpen: (hit: NavHit) => void;
  onTogglePin: (hit: NavHit) => void;
  compact?: boolean;
}) {
  const KindIcon = iconByKind[hit.kind];

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={active}
        className={cn(
          'group/nav-row relative pr-8',
          compact && 'h-9 py-1.5',
        )}
        onClick={() => onOpen(hit)}
      >
        <KindIcon className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate font-medium text-sm">{hit.entityName}</span>
        <span className="shrink-0 rounded-md bg-sidebar-accent px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {hit.page}
        </span>
        <button
          type="button"
          aria-label={pinned ? 'Unpin' : 'Pin'}
          className={cn(
            'absolute right-2 top-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded transition-all',
            'opacity-0 group-hover/nav-row:opacity-100 focus:opacity-100',
            'hover:bg-sidebar-accent',
            pinned && 'opacity-100',
          )}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onTogglePin(hit);
          }}
        >
          <Bookmark
            className={cn(
              'size-3 transition-colors',
              pinned ? 'fill-primary text-primary' : 'text-muted-foreground',
            )}
          />
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function VariantFour() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = React.useState('');
  const [pinned, setPinned] = React.useState<NavHit[]>(() => [
    seedHits[0]!,
    seedHits[3]!,
  ]);
  const [recent, setRecent] = React.useState<NavHit[]>(() => [
    seedHits[1]!,
    seedHits[6]!,
  ]);
  const [active, setActive] = React.useState<NavHit>(seedHits[0]!);
  const [activeFilter, setActiveFilter] = React.useState<DashboardKind | 'all'>('all');
  const [sortBy, setSortBy] = React.useState<'name' | 'recent'>('name');
  const searchInputRef = React.useRef<HTMLInputElement>(null);

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
    (next: NavHit) => {
      const qs = createQueryString({
        dashboard: next.kind,
        entityId: next.entityId,
        page: next.page,
      });
      return `${pathname}?${qs}`;
    },
    [createQueryString, pathname],
  );

  React.useEffect(() => {
    const rawDash = searchParams.get('dashboard');
    const dash: DashboardKind | null =
      rawDash === 'org' || rawDash === 'team' || rawDash === 'repo' || rawDash === 'user'
        ? rawDash
        : null;
    if (!dash) return;

    const rawEntityId = searchParams.get('entityId');
    const rawPage = searchParams.get('page');

    const best =
      seedHits.find(
        (h) =>
          h.kind === dash &&
          (!rawEntityId || h.entityId === rawEntityId) &&
          (!rawPage || h.page === rawPage),
      ) ?? seedHits.find((h) => h.kind === dash);

    if (best && best !== active) setActive(best);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const hits = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const pinnedHrefs = new Set(pinned.map((p) => p.href));
    const recentHrefs = new Set(recent.map((r) => r.href));
    
    let filtered = seedHits.filter(
      (h) => !pinnedHrefs.has(h.href) && !recentHrefs.has(h.href),
    );

    // Apply text search
    if (q) {
      filtered = filtered.filter((h) => {
        const hay = `${labelForKind(h.kind)} ${h.entityName} ${h.entityId} ${h.page}`.toLowerCase();
        return hay.includes(q);
      });
    }

    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter((h) => h.kind === activeFilter);
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') {
        return a.entityName.localeCompare(b.entityName);
      }
      // 'recent' - simple reverse order for demo
      return 0;
    });

    return sorted;
  }, [query, activeFilter, sortBy, pinned, recent]);

  const filterOptions: FilterOption[] = React.useMemo(() => {
    return [
      { id: 'all', label: 'All', icon: Search, count: seedHits.length },
      { id: 'org', label: 'Orgs', icon: Building2, count: seedHits.filter((h) => h.kind === 'org').length },
      { id: 'team', label: 'Teams', icon: Users, count: seedHits.filter((h) => h.kind === 'team').length },
      { id: 'repo', label: 'Repos', icon: GitBranch, count: seedHits.filter((h) => h.kind === 'repo').length },
      { id: 'user', label: 'People', icon: User, count: seedHits.filter((h) => h.kind === 'user').length },
    ];
  }, []);

  const open = (h: NavHit) => {
    setActive(h);
    router.replace(selectionHref(h), { scroll: false });
    setRecent((prev) => {
      const next = [h, ...prev.filter((x) => x.href !== h.href)].slice(0, 5);
      return next;
    });
  };

  const togglePin = (h: NavHit) => {
    setPinned((prev) => {
      const exists = prev.some((x) => x.href === h.href);
      if (exists) return prev.filter((x) => x.href !== h.href);
      return [h, ...prev].slice(0, 8);
    });
  };

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

          {/* Search */}
          <div className="px-2 pb-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything..."
                className="h-9 pl-8 pr-8 text-sm"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden rounded bg-sidebar-accent px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:inline-block">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex gap-1.5 overflow-x-auto px-2 pb-2 scrollbar-hide">
            {filterOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors',
                    activeFilter === option.id
                      ? 'bg-sidebar-accent text-foreground'
                      : 'bg-sidebar-accent/50 text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
                  )}
                >
                  <Icon className="size-3" />
                  <span>{option.label}</span>
                  <span className="text-[10px] opacity-70">({option.count})</span>
                </button>
              );
            })}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 px-2 pb-2">
            <button
              onClick={() => setSortBy('name')}
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
                sortBy === 'name'
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <ArrowUpDown className="size-3" />
              <span>Name</span>
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={cn(
                'flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors',
                sortBy === 'recent'
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Clock className="size-3" />
              <span>Recent</span>
            </button>
          </div>
        </SidebarHeader>

        <SidebarContent className="overflow-y-auto">
          <SidebarGroup>
            {/* Pinned */}
            {pinned.length > 0 && (
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <Bookmark className="size-3.5 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Pinned
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    {pinned.length}
                  </span>
                </div>
                <SidebarMenu className="space-y-0.5">
                  {pinned.map((h) => (
                    <NavRow
                      key={h.href}
                      hit={h}
                      active={active.href === h.href}
                      pinned
                      onOpen={open}
                      onTogglePin={togglePin}
                      compact
                    />
                  ))}
                </SidebarMenu>
              </div>
            )}

            {/* Recent */}
            {recent.length > 0 && (
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2 px-2">
                  <History className="size-3.5 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground">
                    Recent
                  </span>
                  <span className="text-[10px] text-muted-foreground/70">
                    {recent.length}
                  </span>
                </div>
                <SidebarMenu className="space-y-0.5">
                  {recent.map((h) => (
                    <NavRow
                      key={h.href}
                      hit={h}
                      active={active.href === h.href}
                      pinned={pinned.some((x) => x.href === h.href)}
                      onOpen={open}
                      onTogglePin={togglePin}
                      compact
                    />
                  ))}
                </SidebarMenu>
              </div>
            )}

            {/* All Results - Grouped by Type */}
            {hits.length === 0 && query === '' && pinned.length === 0 && recent.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center px-4 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted/50">
                  <Search className="size-5 text-muted-foreground" />
                </div>
                <p className="mt-4 font-medium text-sm">Start searching</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Use the search bar to find items
                </p>
              </div>
            ) : hits.length === 0 ? (
              <div className="mt-8 flex flex-col items-center justify-center px-4 py-12 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-muted/50">
                  <Search className="size-5 text-muted-foreground" />
                </div>
                <p className="mt-4 font-medium text-sm">No results found</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {(['org', 'team', 'repo', 'user'] as DashboardKind[]).map((kind) => {
                  const kindHits = hits.filter((h) => h.kind === kind);
                  if (kindHits.length === 0) return null;

                  const KindIcon = iconByKind[kind];
                  return (
                    <div key={kind}>
                      <div className="mb-1.5 flex items-center gap-2 px-2">
                        <KindIcon className="size-3.5 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground">
                          {labelForKind(kind)}
                        </span>
                        <span className="text-[10px] text-muted-foreground/70">
                          {kindHits.length}
                        </span>
                      </div>
                      <SidebarMenu className="space-y-0.5">
                        {kindHits.map((h) => (
                          <NavRow
                            key={h.href}
                            hit={h}
                            active={active.href === h.href}
                            pinned={pinned.some((x) => x.href === h.href)}
                            onOpen={open}
                            onTogglePin={togglePin}
                            compact
                          />
                        ))}
                      </SidebarMenu>
                    </div>
                  );
                })}
              </div>
            )}
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
                  <Link href="/variant-four" className="font-semibold text-foreground">
                    Variant Four
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={selectionHref(
                      seedHits.find((h) => h.kind === active.kind) ?? seedHits[0]!,
                    )}
                  >
                    {labelForKind(active.kind)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={selectionHref(
                      seedHits.find((h) => h.kind === active.kind && h.entityId === active.entityId) ??
                        active,
                    )}
                  >
                    {active.entityName}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{active.page}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-950">
          <div className="max-w-2xl space-y-6 text-center">
            <h3 className="text-lg font-semibold">Search-First Navigation</h3>
            <p className="text-muted-foreground leading-relaxed">
              A clean, modern navigation experience with search, filters, and quick access to
              frequently used items. Built for efficiency and clarity.
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
                <Link href="/variant-four">Variant Four</Link>
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
