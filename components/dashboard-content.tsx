'use client';

import { cn } from '@/lib/utils';

type StatCard = {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  desc: string;
  sub: string;
};

type TableRow = {
  name: string;
  type: string;
  status: 'Done' | 'In Process' | 'At Risk' | 'Pending';
  score: number;
  owner: string;
};

type PageData = {
  stats: StatCard[];
  chartTitle: string;
  chartSub: string;
  tableRows: TableRow[];
  tableColumns: { header: string; type: string; status: string; score: string; owner: string };
};

const pageDataMap: Record<string, PageData> = {
  Overview: {
    stats: [
      { title: 'Performance Score', value: '72', change: '+12.5%', trend: 'up', desc: 'Trending up this month', sub: 'Across all repositories' },
      { title: 'Critical Outliers', value: '3', change: '-20%', trend: 'down', desc: 'Down 20% this period', sub: 'Needs attention' },
      { title: 'Active Contributors', value: '45,678', change: '+12.5%', trend: 'up', desc: 'Strong user retention', sub: 'Engagement exceeds targets' },
      { title: 'Growth Rate', value: '4.5%', change: '+4.5%', trend: 'up', desc: 'Steady performance increase', sub: 'Meets growth projections' },
    ],
    chartTitle: 'Performance',
    chartSub: 'Total for the last 3 months',
    tableRows: [
      { name: 'Cover page', type: 'Cover page', status: 'In Process', score: 18, owner: 'Eddie Lake' },
      { name: 'Table of contents', type: 'Table of contents', status: 'Done', score: 29, owner: 'Eddie Lake' },
      { name: 'Executive summary', type: 'Narrative', status: 'Done', score: 10, owner: 'Eddie Lake' },
      { name: 'Technical approach', type: 'Narrative', status: 'Done', score: 27, owner: 'Jamik T.' },
      { name: 'Design', type: 'Narrative', status: 'In Process', score: 2, owner: 'Jamik T.' },
    ],
    tableColumns: { header: 'Header', type: 'Section Type', status: 'Status', score: 'Target', owner: 'Reviewer' },
  },
  Performance: {
    stats: [
      { title: 'Avg Commit Size', value: '142', change: '+8.3%', trend: 'up', desc: 'Lines per commit', sub: 'Healthy commit patterns' },
      { title: 'PR Merge Time', value: '4.2h', change: '-15%', trend: 'up', desc: 'Faster reviews', sub: 'Down from 5.1h last month' },
      { title: 'Deploy Frequency', value: '12/wk', change: '+25%', trend: 'up', desc: 'More frequent deploys', sub: 'CI/CD improvements paying off' },
      { title: 'Failure Rate', value: '2.1%', change: '-0.8%', trend: 'up', desc: 'Lower failure rate', sub: 'Below 3% target' },
    ],
    chartTitle: 'Deployment Frequency',
    chartSub: 'Deploys per week over time',
    tableRows: [
      { name: 'web-app', type: 'Frontend', status: 'Done', score: 89, owner: 'Jane Smith' },
      { name: 'api-server', type: 'Backend', status: 'Done', score: 76, owner: 'Mike Wilson' },
      { name: 'mobile-app', type: 'Mobile', status: 'In Process', score: 64, owner: 'Alex Chen' },
      { name: 'shared-libs', type: 'Library', status: 'Done', score: 92, owner: 'Sarah J.' },
      { name: 'infra-tools', type: 'DevOps', status: 'At Risk', score: 45, owner: 'Emily B.' },
    ],
    tableColumns: { header: 'Repository', type: 'Type', status: 'Health', score: 'Score', owner: 'Owner' },
  },
  SPOF: {
    stats: [
      { title: 'SPOF Repos', value: '7', change: '+2', trend: 'down', desc: '70% repos at risk', sub: 'Single contributor dependency' },
      { title: 'Bus Factor', value: '1.3', change: '-0.2', trend: 'down', desc: 'Below safe threshold', sub: 'Target: 2.0 minimum' },
      { title: 'Knowledge Silos', value: '12', change: '+3', trend: 'down', desc: 'Growing concern', sub: 'Cross-training needed' },
      { title: 'Coverage Score', value: '38%', change: '-5%', trend: 'down', desc: 'Low code coverage', sub: 'Multiple owners needed' },
    ],
    chartTitle: 'Bus Factor Trend',
    chartSub: 'Average bus factor across repositories',
    tableRows: [
      { name: 'auth-service', type: 'Critical', status: 'At Risk', score: 1, owner: 'Daniel Kim' },
      { name: 'payment-core', type: 'Critical', status: 'At Risk', score: 1, owner: 'Sofia Garcia' },
      { name: 'data-pipeline', type: 'High', status: 'At Risk', score: 1, owner: 'Noah Lee' },
      { name: 'api-gateway', type: 'High', status: 'In Process', score: 2, owner: 'Priya Patel' },
      { name: 'mobile-sdk', type: 'Medium', status: 'Pending', score: 2, owner: 'Alex Chen' },
    ],
    tableColumns: { header: 'Repository', type: 'Severity', status: 'Status', score: 'Bus Factor', owner: 'Primary Owner' },
  },
  Outliers: {
    stats: [
      { title: 'Top Performers', value: '8', change: '+3', trend: 'up', desc: 'Above P90 threshold', sub: 'Consistently high output' },
      { title: 'Needs Support', value: '5', change: '+1', trend: 'down', desc: 'Below P20 threshold', sub: 'Review recommended' },
      { title: 'Trending Up', value: '12', change: '+4', trend: 'up', desc: 'Improving this quarter', sub: 'Growth trajectory positive' },
      { title: 'Trending Down', value: '3', change: '-2', trend: 'up', desc: 'Fewer declining', sub: 'Interventions working' },
    ],
    chartTitle: 'Contributor Distribution',
    chartSub: 'Performance percentile distribution',
    tableRows: [
      { name: 'Andrew Lock', type: 'P95', status: 'Done', score: 95, owner: 'Frontend' },
      { name: 'Jane Smith', type: 'P92', status: 'Done', score: 92, owner: 'Frontend' },
      { name: 'Mike Wilson', type: 'P88', status: 'Done', score: 88, owner: 'Backend' },
      { name: 'New Hire #1', type: 'P15', status: 'In Process', score: 15, owner: 'Backend' },
      { name: 'Contractor #3', type: 'P12', status: 'At Risk', score: 12, owner: 'DevOps' },
    ],
    tableColumns: { header: 'Contributor', type: 'Percentile', status: 'Trend', score: 'Score', owner: 'Team' },
  },
  SkillsGraph: {
    stats: [
      { title: 'Languages', value: '14', change: '+2', trend: 'up', desc: 'Active languages', sub: 'TypeScript leads at 42%' },
      { title: 'Frameworks', value: '8', change: '+1', trend: 'up', desc: 'In active use', sub: 'React, Next.js, Express top 3' },
      { title: 'Skill Coverage', value: '73%', change: '+5%', trend: 'up', desc: 'Good coverage', sub: 'Up from 68% last quarter' },
      { title: 'Skill Gaps', value: '6', change: '-2', trend: 'up', desc: 'Decreasing gaps', sub: 'Hiring filling gaps' },
    ],
    chartTitle: 'Language Distribution',
    chartSub: 'Primary languages across repositories',
    tableRows: [
      { name: 'TypeScript', type: 'Language', status: 'Done', score: 42, owner: '12 repos' },
      { name: 'Python', type: 'Language', status: 'Done', score: 28, owner: '8 repos' },
      { name: 'Go', type: 'Language', status: 'In Process', score: 15, owner: '4 repos' },
      { name: 'Rust', type: 'Language', status: 'Pending', score: 8, owner: '2 repos' },
      { name: 'Java', type: 'Language', status: 'Done', score: 7, owner: '3 repos' },
    ],
    tableColumns: { header: 'Technology', type: 'Category', status: 'Adoption', score: 'Usage %', owner: 'Repos' },
  },
  'AI Consultant': {
    stats: [
      { title: 'Queries This Week', value: '47', change: '+18%', trend: 'up', desc: 'Active usage', sub: 'Team adoption growing' },
      { title: 'Insights Generated', value: '23', change: '+8', trend: 'up', desc: 'Actionable insights', sub: '15 implemented so far' },
      { title: 'Risk Alerts', value: '5', change: '-3', trend: 'up', desc: 'Fewer active alerts', sub: 'Down from 8 last week' },
      { title: 'Recommendations', value: '12', change: '+4', trend: 'up', desc: 'Growth suggestions', sub: '8 pending review' },
    ],
    chartTitle: 'AI Query Volume',
    chartSub: 'Questions asked to AI consultant',
    tableRows: [
      { name: 'Reduce SPOF in auth-service', type: 'Risk', status: 'In Process', score: 95, owner: 'Auto-generated' },
      { name: 'Hire Go developer', type: 'Growth', status: 'Pending', score: 88, owner: 'Auto-generated' },
      { name: 'Cross-train on payment-core', type: 'Risk', status: 'In Process', score: 82, owner: 'Auto-generated' },
      { name: 'Improve PR review time', type: 'Performance', status: 'Done', score: 76, owner: 'Auto-generated' },
      { name: 'Add monitoring to data-pipeline', type: 'Risk', status: 'At Risk', score: 91, owner: 'Auto-generated' },
    ],
    tableColumns: { header: 'Recommendation', type: 'Category', status: 'Status', score: 'Priority', owner: 'Source' },
  },
  'Code Quality': {
    stats: [
      { title: 'Code Coverage', value: '78%', change: '+3%', trend: 'up', desc: 'Above target', sub: 'Target: 75% minimum' },
      { title: 'Tech Debt', value: '142h', change: '-12h', trend: 'up', desc: 'Decreasing steadily', sub: 'Paydown sprint working' },
      { title: 'Lint Errors', value: '23', change: '-8', trend: 'up', desc: 'Fewer violations', sub: 'Auto-fix catching more' },
      { title: 'Complexity Score', value: 'B+', change: '+1', trend: 'up', desc: 'Improved this quarter', sub: 'From B last quarter' },
    ],
    chartTitle: 'Code Coverage Trend',
    chartSub: 'Test coverage across repositories',
    tableRows: [
      { name: 'web-app', type: 'Frontend', status: 'Done', score: 85, owner: 'Jane Smith' },
      { name: 'api-server', type: 'Backend', status: 'Done', score: 82, owner: 'Mike Wilson' },
      { name: 'shared-libs', type: 'Library', status: 'Done', score: 94, owner: 'Sarah J.' },
      { name: 'mobile-app', type: 'Mobile', status: 'In Process', score: 68, owner: 'Alex Chen' },
      { name: 'infra-tools', type: 'DevOps', status: 'At Risk', score: 42, owner: 'Emily B.' },
    ],
    tableColumns: { header: 'Repository', type: 'Type', status: 'Health', score: 'Coverage %', owner: 'Owner' },
  },
  Contributors: {
    stats: [
      { title: 'Active Contributors', value: '24', change: '+3', trend: 'up', desc: 'This month', sub: 'Up from 21 last month' },
      { title: 'New Contributors', value: '4', change: '+2', trend: 'up', desc: 'First-time committers', sub: 'Onboarding successful' },
      { title: 'Avg Commits/Week', value: '8.3', change: '+1.2', trend: 'up', desc: 'Per contributor', sub: 'Healthy activity level' },
      { title: 'Review Participation', value: '87%', change: '+5%', trend: 'up', desc: 'High engagement', sub: 'Above 80% target' },
    ],
    chartTitle: 'Contribution Activity',
    chartSub: 'Commits and reviews per week',
    tableRows: [
      { name: 'Andrew Lock', type: '145 commits', status: 'Done', score: 95, owner: 'Frontend' },
      { name: 'Sylvain Afchain', type: '132 commits', status: 'Done', score: 91, owner: 'Backend' },
      { name: 'Jane Smith', type: '98 commits', status: 'Done', score: 88, owner: 'Frontend' },
      { name: 'Alex Chen', type: '76 commits', status: 'In Process', score: 72, owner: 'Mobile' },
      { name: 'Emily Brown', type: '54 commits', status: 'In Process', score: 65, owner: 'DevOps' },
    ],
    tableColumns: { header: 'Contributor', type: 'Activity', status: 'Trend', score: 'Score', owner: 'Team' },
  },
  Settings: {
    stats: [
      { title: 'Integrations', value: '6', change: '+1', trend: 'up', desc: 'Active connections', sub: 'GitHub, Slack, Jira, etc.' },
      { title: 'Team Members', value: '24', change: '+3', trend: 'up', desc: 'With access', sub: '4 admins, 20 members' },
      { title: 'API Keys', value: '3', change: '0', trend: 'up', desc: 'Active keys', sub: 'Last rotated 2 weeks ago' },
      { title: 'Webhooks', value: '8', change: '+2', trend: 'up', desc: 'Configured', sub: 'All healthy' },
    ],
    chartTitle: 'API Usage',
    chartSub: 'API calls over the last 30 days',
    tableRows: [
      { name: 'GitHub', type: 'SCM', status: 'Done', score: 100, owner: 'Admin' },
      { name: 'Slack', type: 'Messaging', status: 'Done', score: 100, owner: 'Admin' },
      { name: 'Jira', type: 'Project Mgmt', status: 'Done', score: 100, owner: 'Admin' },
      { name: 'Datadog', type: 'Monitoring', status: 'In Process', score: 80, owner: 'Admin' },
      { name: 'PagerDuty', type: 'Alerting', status: 'Pending', score: 0, owner: 'Admin' },
    ],
    tableColumns: { header: 'Integration', type: 'Type', status: 'Status', score: 'Health %', owner: 'Managed By' },
  },
};

// SVG paths that vary per page for visual difference
const chartPaths: Record<string, { main: string; secondary: string }> = {
  Overview: {
    main: 'M0,150 C100,120 150,80 250,60 C350,40 400,90 500,50 C600,10 700,70 800,30',
    secondary: 'M0,170 C100,155 200,140 300,130 C400,120 500,145 600,125 C700,105 750,110 800,90',
  },
  Performance: {
    main: 'M0,160 C100,140 200,100 300,80 C400,60 500,40 600,50 C700,30 750,20 800,10',
    secondary: 'M0,180 C100,170 200,160 300,140 C400,130 500,120 600,130 C700,110 750,100 800,80',
  },
  SPOF: {
    main: 'M0,80 C100,90 200,100 300,120 C400,130 500,140 600,130 C700,150 750,160 800,170',
    secondary: 'M0,60 C100,70 200,80 300,90 C400,100 500,110 600,100 C700,120 750,130 800,140',
  },
  Outliers: {
    main: 'M0,100 C100,60 200,120 300,40 C400,100 500,30 600,80 C700,50 750,90 800,40',
    secondary: 'M0,130 C100,110 200,140 300,100 C400,130 500,90 600,120 C700,100 750,120 800,90',
  },
  SkillsGraph: {
    main: 'M0,120 C100,100 200,110 300,80 C400,70 500,60 600,50 C700,45 750,40 800,35',
    secondary: 'M0,150 C100,140 200,145 300,130 C400,120 500,110 600,105 C700,100 750,95 800,90',
  },
  default: {
    main: 'M0,140 C100,130 200,90 300,100 C400,70 500,80 600,40 C700,60 750,50 800,20',
    secondary: 'M0,160 C100,155 200,140 300,150 C400,130 500,135 600,110 C700,120 750,115 800,90',
  },
};

function getPageData(pageKey: string): PageData {
  return pageDataMap[pageKey] || pageDataMap['Overview']!;
}

function getChartPath(pageKey: string) {
  return chartPaths[pageKey] || chartPaths['default']!;
}

export function DashboardContent({ pageKey, gradientId = 'cg' }: { pageKey: string; gradientId?: string }) {
  const data = getPageData(pageKey);
  const paths = getChartPath(pageKey);

  return (
    <div className="flex-1 p-6 space-y-6 overflow-auto">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.stats.map((stat) => (
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

      {/* Chart */}
      <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{data.chartTitle}</h3>
            <p className="text-sm text-muted-foreground">{data.chartSub}</p>
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
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#171717" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#171717" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={paths.main} fill="none" stroke="#171717" strokeWidth="2" />
            <path d={`${paths.main} L800,200 L0,200 Z`} fill={`url(#${gradientId})`} />
            <path d={paths.secondary} fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white dark:bg-zinc-900">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-sm text-muted-foreground">
              <th className="py-3 px-4 font-medium">{data.tableColumns.header}</th>
              <th className="py-3 px-4 font-medium">{data.tableColumns.type}</th>
              <th className="py-3 px-4 font-medium">{data.tableColumns.status}</th>
              <th className="py-3 px-4 font-medium text-right">{data.tableColumns.score}</th>
              <th className="py-3 px-4 font-medium">{data.tableColumns.owner}</th>
            </tr>
          </thead>
          <tbody>
            {data.tableRows.map((row) => (
              <tr key={row.name} className="border-b last:border-0 text-sm">
                <td className="py-3 px-4 font-medium">{row.name}</td>
                <td className="py-3 px-4"><span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">{row.type}</span></td>
                <td className="py-3 px-4">
                  <span className={cn(
                    'inline-flex items-center gap-1 rounded border px-2 py-0.5 text-xs',
                    row.status === 'Done' ? 'text-emerald-700' :
                    row.status === 'At Risk' ? 'text-red-700' :
                    row.status === 'Pending' ? 'text-amber-700' :
                    'text-muted-foreground',
                  )}>
                    {row.status === 'Done' && <span className="size-1.5 rounded-full bg-emerald-500" />}
                    {row.status === 'At Risk' && <span className="size-1.5 rounded-full bg-red-500" />}
                    {row.status === 'Pending' && <span className="size-1.5 rounded-full bg-amber-500" />}
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">{row.score}</td>
                <td className="py-3 px-4 text-muted-foreground">{row.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
