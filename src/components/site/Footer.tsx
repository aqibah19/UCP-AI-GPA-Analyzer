import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="no-print mt-20 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              UCP
            </span>
            <span className="font-display text-base font-semibold">UCP AI GPA Analyzer</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Upload your LMS marks and course evaluation screenshots, and get an accurate, evaluation-aware GPA
            estimate in seconds.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/analyze" className="hover:text-foreground">Analyze Marks</Link></li>
            <li><Link to="/gpa-calculator" className="hover:text-foreground">GPA Calculator</Link></li>
            <li><Link to="/cgpa-calculator" className="hover:text-foreground">CGPA Calculator</Link></li>
            <li><Link to="/grade-scale" className="hover:text-foreground">Grade Scale</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Developer</h3>
          <p className="mt-4 text-sm text-muted-foreground">Designed &amp; Developed by Aqib Ahmed</p>
          <a
            href="mailto:aqibah50@gmail.com"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            <Mail className="h-4 w-4" /> aqibah50@gmail.com
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Disclaimer: This is an independent academic utility for UCP students and is not an official University of
            Central Punjab website.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            © {new Date().getFullYear()} UCP AI GPA Analyzer. All results are estimates — always confirm with your
            instructor.
          </p>
        </div>
      </div>
    </footer>
  );
}