import Link from "next/link";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column - Larger */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">
                    ML
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-lg tracking-tight block">
                    Mwalimu Link
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Shield className="h-3 w-3" />
                    TSC Verified Platform
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                Connecting TSC-certified teachers with leading institutions and
                parents seeking excellence. Hire, teach, and grow on Mwalimu
                Link.
              </p>

              {/* Stats from screenshot */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    12,400+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Registered Teachers
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">850+</div>
                  <div className="text-xs text-muted-foreground">
                    Partner Schools
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    3,200+
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Active Jobs
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">98%</div>
                  <div className="text-xs text-muted-foreground">
                    Placement Rate
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/jobs"
                    className="hover:text-foreground transition-colors"
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tutors"
                    className="hover:text-foreground transition-colors"
                  >
                    Find Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="hover:text-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/past-papers"
                    className="hover:text-foreground transition-colors"
                  >
                    Past Papers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/high-school"
                    className="hover:text-foreground transition-colors"
                  >
                    High School
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Schools & Parents */}
            <div>
              <h4 className="font-semibold text-sm mb-4">For Schools</h4>
              <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                <li>
                  <Link
                    href="/post-job"
                    className="hover:text-foreground transition-colors"
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    href="/find-teachers"
                    className="hover:text-foreground transition-colors"
                  >
                    Find Teachers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/school-pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>

              <h4 className="font-semibold text-sm mb-4">For Parents</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/find-tutors"
                    className="hover:text-foreground transition-colors"
                  >
                    Find Tutors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/request-session"
                    className="hover:text-foreground transition-colors"
                  >
                    Request Session
                  </Link>
                </li>
                <li>
                  <Link
                    href="/parent-resources"
                    className="hover:text-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="font-semibold text-sm mb-4">Contact Us</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a
                    href="mailto:help@mwalimulink.co.ke"
                    className="hover:text-foreground transition-colors"
                  >
                    help@mwalimulink.co.ke
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0" />
                  <a
                    href="tel:+254700000000"
                    className="hover:text-foreground transition-colors"
                  >
                    +254 700 000 000
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>

              {/* Social Links */}
              <div className="mt-6">
                <h4 className="font-semibold text-sm mb-3">Follow Us</h4>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Links */}
        <div className="border-t py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Mwalimu Link. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link
                href="/cookies"
                className="hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
              <span className="text-muted-foreground/30">•</span>
              <Link
                href="/sitemap"
                className="hover:text-foreground transition-colors"
              >
                Sitemap
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-xs">
              <Shield className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground">TSC Verified</span>
            </div>
          </div>
        </div>

        {/* Optional: Featured Job/Teacher Preview from screenshot */}
        {/* <div className="border-t py-6">
          <div className="text-xs text-muted-foreground mb-3">
            Featured Teacher
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold">JK</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">James Kamau</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    TSC Verified
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Physics Teacher • Starehe Boys' Centre • ★ 4.9 (47 reviews)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">KES 85,000/mo</div>
                <div className="text-xs text-muted-foreground">Full-time</div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link href="/tutors/james-kamau">View Profile</Link>
              </Button>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
