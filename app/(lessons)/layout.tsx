import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

interface LessonsLayoutProps {
  children: React.ReactNode;
}

export default function LessonsLayout({ children }: LessonsLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
} 