import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AchievementBadgeProps {
  icon: string;
  title: string;
  description: string;
  variant?: "gold" | "silver" | "bronze";
  delay?: number;
}

export function AchievementBadge({ 
  icon, 
  title, 
  description, 
  variant = "gold",
  delay = 0 
}: AchievementBadgeProps) {
  // Define gradient styles for each variant
  const getVariantStyle = () => {
    switch(variant) {
      case "gold":
        return {
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
          boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
        };
      case "silver":
        return {
          background: 'linear-gradient(135deg, #cbd5e1 0%, #e2e8f0 50%, #94a3b8 100%)',
          boxShadow: '0 10px 30px rgba(148, 163, 184, 0.3)'
        };
      case "bronze":
        return {
          background: 'linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea580c 100%)',
          boxShadow: '0 10px 30px rgba(251, 146, 60, 0.3)'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)',
          boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)'
        };
    }
  };

  const variantStyle = getVariantStyle();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="flex flex-col items-center gap-3"
    >
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center text-3xl border-4 shadow-lg"
        style={{
          background: variantStyle.background,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          boxShadow: variantStyle.boxShadow
        }}
      >
        <span className="drop-shadow-md">{icon}</span>
      </div>
      <div className="text-center">
        <h4 
          className="font-semibold"
          style={{ color: 'hsl(var(--foreground))' }}
        >
          {title}
        </h4>
        <p 
          className="text-sm"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}