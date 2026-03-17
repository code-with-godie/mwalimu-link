"use client";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Users, BookOpen, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { JobCard } from "../jobs/JobCard";
import { TutorCard } from "../tutor/TutorCard";
import { ResourceCard } from "../resources/ResourceCard";
import Image from "next/image";
import { mockJobs, mockResources, mockTutors } from "@/data/mockData";

const ease = [0.16, 1, 0.3, 1] as const;
const stats = [
  { value: "12,400+", label: "Registered Teachers" },
  { value: "850+", label: "Partner Schools" },
  { value: "3,200+", label: "Active Jobs" },
  { value: "98%", label: "Placement Rate" },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image - this will cover the entire section */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease }}
            className="relative w-full h-full"
          >
            <Image
              src="/hero.jpg"
              alt="Kenyan educators collaborating in a modern school environment"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40 dark:from-background/90 dark:via-background/75 dark:to-background/50" />
        </div>

        {/* Content - Centered vertically */}
        <div className="relative h-full flex items-center">
          <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.3 }}
            >
              <Badge
                variant="secondary"
                className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-sm"
              >
                <Shield className="h-3 w-3 mr-1" />
                TSC Verified Platform
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-primary-foreground"
            >
              The Professional Standard for Kenyan Educators
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.55 }}
              className="mt-5 text-lg text-primary-foreground/80 max-w-2xl"
            >
              Connecting TSC-certified teachers with leading institutions and
              parents seeking excellence. Hire, teach, and grow on Mwalimu Link.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 mt-8"
            >
              <Button variant="secondary" size="lg" asChild>
                <Link href="/register">
                  Create Your Profile
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <Link href="/jobs">Browse Jobs</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Animated accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 0.9 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left"
        />
      </section>
      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-bold tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Feed Preview */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Three Perspectives. One Platform.
            </h2>
            <p className="text-muted-foreground mt-2">
              Schools hire. Parents find tutors. Everyone accesses quality
              resources.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Job Preview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">For Schools</h3>
              </div>
              <JobCard job={mockJobs[0]} index={0} />
            </div>
            {/* Tutor Preview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">For Parents</h3>
              </div>
              <TutorCard tutor={mockTutors[0]} index={1} />
            </div>
            {/* Resource Preview */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Resources</h3>
              </div>
              <ResourceCard resource={mockResources[0]} index={2} />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 border-t bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              How Mwalimu Link Works
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Create Profile",
                desc: "Register as a teacher, school, admin, or parent.",
              },
              {
                step: "02",
                title: "Verify TSC",
                desc: "Upload your TSC certificate for verified status.",
              },
              {
                step: "03",
                title: "Connect",
                desc: "Browse jobs, find tutors, or access resources.",
              },
              {
                step: "04",
                title: "Grow",
                desc: "Build your professional record and advance your career.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease, delay: i * 0.08 }}
              >
                <Card className="p-6 h-full">
                  <span className="tsc-number text-xs text-muted-foreground">
                    {item.step}
                  </span>
                  <h3 className="font-semibold mt-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Ready to advance your teaching career?
            </h2>
            <p className="text-muted-foreground mt-2">
              Join thousands of educators already on the platform.
            </p>
            <Button variant="secondary" size="lg" className="mt-6" asChild>
              <Link href="/register">
                Get Started Today
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
