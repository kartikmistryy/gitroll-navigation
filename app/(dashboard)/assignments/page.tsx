import { PageHeader } from "@/components/ui/page-header";
import { AssignmentsList } from "@/components/assignments-list";
import { assignments } from "@/lib/data";

export default function AssignmentsPage() {
  const inProgress = assignments.filter(
    (a) => a.status === "in-progress"
  ).length;

  return (
    <div>
      <PageHeader
        title="Assignments"
        subtitle={`${assignments.length} total · ${inProgress} in progress`}
      />
      <AssignmentsList assignments={assignments} />
    </div>
  );
}
