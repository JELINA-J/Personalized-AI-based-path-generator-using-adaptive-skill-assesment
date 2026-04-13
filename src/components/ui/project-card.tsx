import { motion } from "framer-motion";
import { Clock, Gauge, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateProjects, type Project } from "@/api/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300"
      style={{ 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        backgroundColor: 'hsl(var(--card))',
        borderColor: 'hsl(var(--border))'
      }}
    >
      {/* Gradient accent bar */}
      <div 
        className="h-1.5"
        style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}
      />
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 
            className="text-xl font-semibold transition-colors"
            style={{ color: 'hsl(var(--foreground))' }}
          >
            {project.title}
          </h3>
          <div 
            className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
          >
            <span className="text-lg">🚀</span>
          </div>
        </div>
        
        <p 
          className="leading-relaxed"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill, idx) => (
            <Badge 
              key={idx} 
              variant="secondary"
              className="hover:bg-secondary"
              style={{ 
                backgroundColor: 'hsl(var(--secondary) / 0.8)',
                color: 'hsl(var(--secondary-foreground))'
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 pt-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4" />
            <span>{project.difficulty}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{project.estimatedTime}</span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full mt-2 group/btn"
          style={{ 
            backgroundColor: 'transparent',
            color: 'hsl(var(--foreground))'
          }}
        >
          Start Building
          <ArrowRight className="w-4 h-4 ml-2 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}