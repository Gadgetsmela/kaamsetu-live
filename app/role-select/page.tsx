import Link from "next/link";

export default function RoleSelectPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Choose your role</h2>
      <div className="grid gap-3">
        <Link href="/signup?role=OWNER" className="rounded-xl border bg-white p-4">Owner / Employer</Link>
        <Link href="/signup?role=WORKER" className="rounded-xl border bg-white p-4">Worker / Job Seeker</Link>
        <Link href="/signup?role=ADMIN" className="rounded-xl border bg-white p-4">Admin</Link>
      </div>
    </div>
  );
}
