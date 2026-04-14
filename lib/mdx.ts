// lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type InsightFrontmatter = {
  title: string;
  description: string;
  category: string;
  slug: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
};

export type Insight = InsightFrontmatter & { content: string };

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights");

export function getAllInsights(): InsightFrontmatter[] {
  const files = fs.readdirSync(INSIGHTS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(INSIGHTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        ...(data as InsightFrontmatter),
        slug: file.replace(".mdx", ""),
        readTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getInsightBySlug(slug: string): Insight | null {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    ...(data as InsightFrontmatter),
    slug,
    readTime: readingTime(content).text,
    content,
  };
}
