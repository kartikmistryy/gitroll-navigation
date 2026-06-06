import { Calendar, MapPin } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { upcomingHackathons, pastHackathons } from "@/lib/data";
import type { Hackathon, PastHackathon } from "@/lib/data";

function placementTone(placement: string): BadgeTone {
  if (placement === "1st Place") return "green";
  if (placement === "Finalist") return "blue";
  return "gray";
}

export default function HackathonPage() {
  const [featured, ...others] = upcomingHackathons;
  return (
    <div>
      <PageHeader title="Hackathon" subtitle="Compete, build, ship." />

      {/* Featured hero — subtle blue→white wash, the only gradient on this page */}
      <Card className="p-6 bg-gradient-to-br from-accent-soft to-card">
        <Badge tone="blue">Featured</Badge>
        <p className="mt-3 text-2xl font-bold tracking-tight">{featured.name}</p>
        <p className="mt-1 text-sm text-label-secondary">{featured.theme}</p>

        {/* Meta row */}
        <div className="mt-4 flex items-center gap-5 text-xs text-label-secondary">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} aria-hidden="true" />
            {featured.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} aria-hidden="true" />
            {featured.format}
          </span>
        </div>

        {/* Countdown chips — static mock; real countdown would need a client component */}
        <div className="mt-5 flex items-center gap-2">
          <span className="rounded-full bg-accent-soft text-accent px-3 py-1 text-xs font-semibold">
            19 days
          </span>
          <span className="text-xs text-label-tertiary">to kickoff</span>
        </div>

        <div className="mt-5">
          <Button>Register</Button>
        </div>
      </Card>

      {/* Upcoming section */}
      <div className="mt-8">
        <p className="text-sm font-semibold text-label-secondary mb-3">Upcoming</p>
        <Card>
          <ul className="divide-y divide-separator">
            {others.map((h: Hackathon) => (
              <li key={h.id} className="px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{h.name}</p>
                  <p className="text-xs text-label-secondary mt-0.5">{h.theme}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-label-tertiary whitespace-nowrap">
                    {h.date} · {h.format}
                  </span>
                  {h.registered && <Badge tone="green">Registered</Badge>}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Past results section */}
      <div className="mt-8">
        <p className="text-sm font-semibold text-label-secondary mb-3">Past results</p>
        <Card>
          <ul className="divide-y divide-separator">
            {pastHackathons.map((p: PastHackathon) => (
              <li key={p.name} className="px-5 py-4 flex items-center gap-4">
                <Badge tone={placementTone(p.placement)}>{p.placement}</Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-label-secondary mt-0.5">{p.project}</p>
                </div>
                <span className="text-xs text-label-tertiary whitespace-nowrap">
                  {p.date}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
