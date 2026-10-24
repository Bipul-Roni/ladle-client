// Shared two-panel frame for Login and Register
export default function AuthShell({ title, subtitle, children }) {
  return (
    <section className="container-x grid min-h-[calc(100vh-4rem)] items-center py-12 lg:grid-cols-2 lg:gap-16">
      <div className="hidden lg:block">
        <p className="font-display text-5xl leading-tight text-ink">
          Good food is meant to be passed around.
        </p>
        <p className="mt-4 max-w-md text-lg text-muted">
          Log in to add recipes, keep your own collection and like the dishes other cooks share.
        </p>
      </div>
      <div className="mx-auto w-full max-w-md rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <h1 className="text-3xl text-ink">{title}</h1>
        <p className="mt-1 text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
