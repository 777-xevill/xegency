import { Shell, Eyebrow, Cta } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[70vh] items-center bg-ink pt-32 pb-24">
      <Shell>
        <Eyebrow>404</Eyebrow>
        <h1 className="display balance mt-7 max-w-3xl text-[clamp(2.5rem,6vw,5rem)]">
          That page has moved, or never existed.
        </h1>
        <p className="pretty mt-8 max-w-lg text-lg leading-relaxed text-bone/70">
          Either way it isn&rsquo;t your fault. Head back to the work, or tell
          me what you were looking for and I&rsquo;ll point you at it.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Cta href="/work">See the work</Cta>
          <Cta href="/" variant="outline">
            Back to the start
          </Cta>
        </div>
      </Shell>
    </section>
  );
}
