import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CertificateBorder } from "@/components/ui/certificate-border";
import { AchievementBadge } from "@/components/ui/achievement-badge";
import { ProjectCard } from "@/components/ui/project-card";
import { ConfettiTrigger } from "@/components/ui/confetti-trigger";
import { useRef } from "react";

import { generateProjects, type Project } from "@/api/projects";

import {
  Award,
  Download,
  Linkedin,
  Briefcase,
  Star,
  Sparkles,
  Trophy,
  CheckCircle2,
} from "lucide-react";

const Certification = () => {
  const navigate = useNavigate();
  const location = useLocation();
const { user } = useAuth();

  const {
    username = "Alex Johnson",
    course = "Advanced React Development",
    score = 92,
    level = "Advanced",
  } = location.state || {};

  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);


const hasFetched = useRef(false);

useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  const fetchProjects = async () => {
    try {
      const data = await generateProjects({ course, level });
      setProjects(data);
    } catch (err) {
      console.error("Project generation failed", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  fetchProjects();
}, [course, level]);


  const badges = [];
  if (score >= 90) badges.push({ icon: "🏆", title: "Expert Performer", desc: "Top 5% of learners", variant: "gold" as const });
  if (score >= 75) badges.push({ icon: "🚀", title: "Strong Foundation", desc: "Solid understanding", variant: "silver" as const });
  if (score >= 60) badges.push({ icon: "🎯", title: "Certified Learner", desc: "Course completed", variant: "bronze" as const });

  const downloadCertificate = () => {
    const element = document.getElementById("certificate");
    if (!element) return;

    html2pdf()
      .set({
        margin: 0.5,
        filename: `${course}-Certificate.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
      })
      .from(element)
      .save();
  };

  const shareLinkedIn = () => {
    const text = encodeURIComponent(
      `🎉 I just earned my ${course} certification on Smartway AI with a score of ${score}%!`
    );
    const url = encodeURIComponent("https://smartway.ai");
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`,
      "_blank"
    );
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <ConfettiTrigger />
      
      {/* Hero Section */}
      <section 
        className="relative overflow-hidden py-20"
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
          />
          <div 
            className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
          />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full"
              style={{ 
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

           <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
  Congratulations, {user?.name || username}!
</h1>

            
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              You've successfully mastered <span style={{ color: '#FFD700', fontWeight: 600 }}>{course}</span> and 
              earned your professional certification.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(8px)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <CheckCircle2 className="w-5 h-5" style={{ color: '#16a34a' }} />
              <span className="text-white font-medium">Score: {score}%</span>
              <span className="text-white/60">•</span>
              <span className="text-white/80">{level} Level</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-6 py-16 space-y-20">
        
        {/* Certificate */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <CertificateBorder className="w-full max-w-4xl">
            <div
              id="certificate"
              className="p-12 md:p-16 rounded-lg"
              style={{ 
                background: 'linear-gradient(to bottom, rgba(255, 215, 0, 0.1) 0%, hsl(var(--card)) 50%, rgba(255, 215, 0, 0.1) 100%)'
              }}
            >
              <div className="text-center space-y-8">
                {/* Header ornament */}
                <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #FFD700)' }} />
                  <Award className="w-10 h-10" style={{ color: '#FFD700' }} />
                  <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #FFD700)' }} />
                </div>

                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.3em]" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    Certificate of Achievement
                  </p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold" style={{ color: '#0f172a' }}>
                    {course}
                  </h2>
                </div>

                <div className="space-y-4 py-6">
                  <p style={{ color: 'hsl(var(--muted-foreground))' }}>This is to certify that</p>
                  <h3 
                    className="text-3xl md:text-4xl font-display font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {user?.name || username}!
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    has successfully completed all requirements and demonstrated proficiency in the above program
                  </p>
                </div>

                <div className="flex items-center justify-center gap-8 py-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold" style={{ color: '#0f172a' }}>{score}%</p>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Final Score</p>
                  </div>
                  <div className="w-px h-12" style={{ backgroundColor: 'hsl(var(--border))' }} />
                  <div className="text-center">
                    <p className="text-lg font-semibold" style={{ color: '#0f172a' }}>{level}</p>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Skill Level</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-8" style={{ borderTop: '1px solid rgba(255, 215, 0, 0.2)' }}>
                  <div className="text-left">
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Issue Date</p>
                    <p className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{currentDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" style={{ color: '#FFD700' }} />
                    <span className="font-display text-lg font-semibold" style={{ color: '#0f172a' }}>Smartway AI</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Certificate ID</p>
                    <p className="font-medium font-mono text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                      #{Math.random().toString(36).substring(2, 10).toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CertificateBorder>
        </motion.section>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 flex-wrap"
        >
          <Button 
            size="lg" 
            onClick={downloadCertificate}
            className="text-white hover:opacity-90"
            style={{ 
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
            }}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Certificate
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            onClick={shareLinkedIn}
            className="hover:text-white"
            style={{ 
              borderColor: '#0f172a',
              color: '#0f172a',
              backgroundColor: 'transparent'
            }}
          >
            <Linkedin className="w-5 h-5 mr-2" />
            Share on LinkedIn
          </Button>
        </motion.div>

        {/* Badges */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center space-y-10"
        >
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Achievements Unlocked
            </h2>
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              Your dedication has earned you these badges
            </p>
          </div>

          <div className="flex justify-center gap-12 flex-wrap">
            {badges.map((badge, i) => (
              <AchievementBadge
                key={i}
                icon={badge.icon}
                title={badge.title}
                description={badge.desc}
                variant={badge.variant}
                delay={i * 0.2}
              />
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <section className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-2"
          >
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              style={{ 
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                color: '#b45309'
              }}
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Recommendations
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold" style={{ color: 'hsl(var(--foreground))' }}>
              Resume-Building Projects
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Personalized project ideas to strengthen your portfolio and showcase your new skills
            </p>
          </motion.div>

          {loadingProjects ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-72 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {projects.map((project, i) => (
                <ProjectCard key={i} project={project} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Job CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card 
            className="relative overflow-hidden border-0 p-10 md:p-14 text-center"
            style={{ 
              background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
              border: 'none'
            }}
          >
            {/* Decorative */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
              style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
            />
            <div 
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl"
              style={{ backgroundColor: 'rgba(255, 215, 0, 0.05)' }}
            />

            <div className="relative z-10 space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{ backgroundColor: 'rgba(255, 215, 0, 0.2)' }}
              >
                <Star className="w-8 h-8" style={{ color: '#FFD700' }} />
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                Ready for Your Next Career Move?
              </h2>
              <p className="text-white/70 max-w-lg mx-auto">
                Explore job opportunities that match your newly acquired skills and certification level.
              </p>

              <Button
                size="lg"
                onClick={() => navigate("/jobs", { state: { course, level,score }, })}
                className="text-white hover:opacity-90"
                style={{ 
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
                }}
              >
                <Briefcase className="w-5 h-5 mr-2" />
                View Job Recommendations
              </Button>
            </div>
          </Card>
        </motion.section>
      </div>
      <Footer/>
    </div>
  );
};

export default Certification;