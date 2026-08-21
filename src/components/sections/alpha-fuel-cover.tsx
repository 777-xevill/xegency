import { cx } from "@/components/ui";

/* ============================================================================
   ALPHA FUEL — styled cover panel
   ----------------------------------------------------------------------------
   No real screenshot on file yet, so this recreates the brand's own look
   (near-black background, lime accent, blocky condensed headline) rather than
   falling back to Xegency's generic tint panel. Swap for a real screenshot at
   /public/work/alpha-fuel/cover.jpg whenever one's available.
   ========================================================================== */

const LIME = "#C6F135";

function Mark({ size = 32 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-md font-sans font-black"
      style={{
        width: size,
        height: size,
        background: LIME,
        color: "#0f0e0d",
        fontSize: size * 0.55,
      }}
    >
      A
    </span>
  );
}

export function AlphaFuelCover() {
  return (
    <div className="grain relative flex flex-col justify-between overflow-hidden bg-[#0c0f08] p-8 md:p-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: LIME }}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Mark />
          <span className="font-sans text-lg font-black uppercase tracking-tight text-bone">
            Alphafuel
          </span>
        </div>
        <span
          className="eyebrow hidden md:block"
          style={{ color: LIME }}
        >
          Dhaka · Imported stock
        </span>
      </div>

      <div className="relative mt-10">
        <p className="font-sans text-[clamp(2.2rem,6.5vw,4.75rem)] font-black uppercase leading-[0.95] tracking-tight text-bone">
          Real tubs.
          <br />
          <span style={{ color: LIME }}>Checked batches.</span>
        </p>
      </div>

      <div className="relative mt-10 flex flex-wrap items-end justify-between gap-6">
        <p className="pretty max-w-md text-sm leading-relaxed text-bone/55">
          Bangladesh&rsquo;s supplement market runs on refilled tubs and copied
          labels. Every batch code logged, every seal checked before it ships.
        </p>
        <div className="flex gap-8">
          <Stat value="46" label="Products on shelf" />
          <Stat value="27" label="Brands carried" />
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="display text-3xl leading-none text-bone">{value}</p>
      <p className="eyebrow mt-2 text-bone/40">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------- grid card preview */

export function AlphaFuelCardPreview() {
  return (
    <div className="grain absolute inset-0 flex flex-col justify-between overflow-hidden bg-[#0c0f08] p-7 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] md:p-9">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.14] blur-3xl"
        style={{ background: LIME }}
      />

      <div className="relative flex items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Mark size={24} />
          <span className="font-sans text-[13px] font-black uppercase tracking-tight text-bone">
            Alphafuel
          </span>
        </div>
        <span className="eyebrow opacity-60" style={{ color: LIME }}>
          E-commerce
        </span>
      </div>

      <p className="relative font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-black uppercase leading-[0.95] tracking-tight opacity-90">
        <span className="text-bone">Real tubs.</span>
        <br />
        <span style={{ color: LIME }}>Checked batches.</span>
      </p>

      <div className="relative flex gap-5">
        {[
          { value: "46", label: "Products" },
          { value: "27", label: "Brands" },
        ].map((s) => (
          <span key={s.label} className="eyebrow opacity-50">
            <span className={cx("mr-1.5 font-medium")} style={{ color: LIME }}>
              {s.value}
            </span>
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
