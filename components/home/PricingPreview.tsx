import { TextReveal } from "@/components/animation/TextReveal";
import { SectionReveal } from "@/components/animation/SectionReveal";
import { CtaButton } from "@/components/ui/cta-button";
import type { PricingPlan } from "@/lib/content";

interface PricingContent {
  eyebrow: string;
  headline: string[];
}

export function PricingPreview({
  pricing: content,
  plans,
}: {
  pricing: PricingContent;
  plans: PricingPlan[];
}) {
  return (
    <section className="bg-off-white py-20 md:py-28">
      <div className="eff-container">
        <div className="max-w-2xl">
          <SectionReveal>
            <span className="type-eyebrow text-blood-red">
              {content.eyebrow}
            </span>
          </SectionReveal>
          <TextReveal
            lines={content.headline}
            className="mt-4"
            lineClassName="font-heading text-[5.5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] text-fight-black tracking-normal uppercase pb-2"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 divide-y divide-fight-black/12 border-t border-b border-fight-black/12 md:grid-cols-3 md:divide-x md:divide-y-0">
          {plans.map((plan, i) => (
            <SectionReveal
              key={plan.id}
              delay={i * 0.08}
              className={`relative px-6 py-10 md:px-8 ${
                plan.featured ? "bg-fight-black text-off-white" : ""
              }`}
            >
              {plan.badge ? (
                <span className="type-label absolute right-6 top-8 text-blood-red">
                  {plan.badge}
                </span>
              ) : null}
              <h3
                className={`type-label ${
                  plan.featured ? "text-smoke" : "text-fight-black/50"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`type-display-md ${
                    plan.featured ? "text-off-white" : "text-fight-black"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`type-body-sm ${
                    plan.featured ? "text-smoke" : "text-fight-black/50"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="mt-7 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`type-body-sm flex items-start gap-2 ${
                      plan.featured ? "text-off-white/85" : "text-fight-black/75"
                    }`}
                  >
                    <span
                      className={`mt-1.5 size-1 shrink-0 rounded-full ${
                        plan.featured ? "bg-blood-red" : "bg-fight-black/40"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <CtaButton
                href="/free-trial"
                variant={plan.featured ? "primary" : "ghost-light"}
                className={`mt-8 w-full justify-center ${
                  plan.featured ? "" : "!text-fight-black"
                }`}
              >
                {plan.cta}
              </CtaButton>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
