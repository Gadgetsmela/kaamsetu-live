import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white p-5 shadow-sm">
        <p className="text-xs uppercase text-slate-500">Splash</p>
        <h1 className="mt-1 text-2xl font-semibold">KaamSetu / कामसेतु</h1>
        <p className="mt-2 text-sm text-slate-600">Hire local workers and find work near you quickly.</p>
      </section>
      <div className="grid grid-cols-1 gap-3">
        <Link href="/role-select" className="rounded-xl bg-brand-500 p-3 text-center font-medium text-white">Continue</Link>
      </div>
    </div>
  );
}
