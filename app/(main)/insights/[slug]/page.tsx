import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllInsights, getInsightBySlug } from "@/lib/mdx";
import { InsightCard } from "@/components/shared/InsightCard";
import { CTASection } from "@/components/shared/CTASection";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export async function generateStaticParams() {
  const insights = getAllInsights();
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};
  return {
    title: `${insight.title} | IMAGENN.AI Insights`,
    description: insight.description,
    openGraph: {
      title: insight.title,
      description: insight.description,
      url: `${siteConfig.url}/insights/${slug}`,
      siteName: "IMAGENN.AI",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: insight.title,
      description: insight.description,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const allInsights = getAllInsights();
  const related = allInsights.filter((i) => i.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="pt-32 pb-16 bg-obsidian">
        <div className="content-width px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-muted mb-8">
            <Link href="/insights" className="hover:text-slate-secondary transition-colors">
              Insights
            </Link>
            <span>→</span>
            <span>{insight.category}</span>
          </div>

          <div className="max-w-[720px]">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-light px-2 py-1 bg-indigo/10 rounded mb-6 inline-block">
              {insight.category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-primary leading-tight tracking-tight mb-6">
              {insight.title}
            </h1>
            <div className="flex items-center gap-4 text-xs text-slate-muted">
              <span>{insight.readTime}</span>
              <span>·</span>
              <time dateTime={insight.publishedAt}>
                {new Date(insight.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-obsidian">
        <div className="content-width px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px] prose prose-invert prose-slate prose-headings:font-sans prose-headings:font-semibold prose-p:text-slate-secondary prose-li:text-slate-secondary prose-strong:text-slate-primary">
            <MDXRemote source={insight.content} />
          </div>

          {/* Author block */}
          <div className="max-w-[720px] mt-16 pt-8 border-t border-white/5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo/20 flex items-center justify-center shrink-0 font-serif font-bold text-indigo-light">
              {siteConfig.founder.firstName[0]}
            </div>
            <div>
              <p className="font-sans font-semibold text-slate-primary text-sm">
                {siteConfig.founder.firstName} {siteConfig.founder.lastName}
              </p>
              <p className="text-xs text-slate-muted">{siteConfig.founder.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="section-padding bg-obsidian-secondary">
          <div className="content-width px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-muted mb-8">More Insights</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              {related.map((r) => (
                <InsightCard key={r.slug} {...r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        eyebrow="Ready to Act on These Ideas?"
        heading="Let's Build the AI Capability Your Organization Needs."
        subheading="Strategy is the starting point. We take you all the way to implementation, adoption, and scale."
        primaryLabel="Book a Strategy Call"
        primaryHref="/contact?intent=call"
        secondaryLabel="View Our Services"
        secondaryHref="/services"
      />
    </>
  );
}
