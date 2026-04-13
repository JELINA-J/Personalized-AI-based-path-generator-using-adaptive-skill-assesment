import { cn } from "@/lib/utils";

interface CertificateBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function CertificateBorder({ children, className }: CertificateBorderProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Outer decorative border */}
      <div 
        className="absolute inset-0 border-[3px] rounded-lg"
        style={{ borderColor: 'rgba(255, 215, 0, 0.3)' }}
      />
      <div 
        className="absolute inset-2 border-[1px] rounded-lg"
        style={{ borderColor: 'rgba(255, 215, 0, 0.2)' }}
      />
      
      {/* Corner ornaments */}
      <svg 
        className="absolute -top-1 -left-1 w-12 h-12 rotate-0" 
        viewBox="0 0 48 48" 
        fill="none"
        style={{ color: '#FFD700' }}
      >
        <path d="M4 24C4 12.954 12.954 4 24 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 24C8 15.163 15.163 8 24 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="4" r="2" fill="currentColor"/>
        <circle cx="4" cy="24" r="2" fill="currentColor"/>
      </svg>
      
      <svg 
        className="absolute -top-1 -right-1 w-12 h-12 rotate-90" 
        viewBox="0 0 48 48" 
        fill="none"
        style={{ color: '#FFD700' }}
      >
        <path d="M4 24C4 12.954 12.954 4 24 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 24C8 15.163 15.163 8 24 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="4" r="2" fill="currentColor"/>
        <circle cx="4" cy="24" r="2" fill="currentColor"/>
      </svg>
      
      <svg 
        className="absolute -bottom-1 -right-1 w-12 h-12 rotate-180" 
        viewBox="0 0 48 48" 
        fill="none"
        style={{ color: '#FFD700' }}
      >
        <path d="M4 24C4 12.954 12.954 4 24 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 24C8 15.163 15.163 8 24 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="4" r="2" fill="currentColor"/>
        <circle cx="4" cy="24" r="2" fill="currentColor"/>
      </svg>
      
      <svg 
        className="absolute -bottom-1 -left-1 w-12 h-12 -rotate-90" 
        viewBox="0 0 48 48" 
        fill="none"
        style={{ color: '#FFD700' }}
      >
        <path d="M4 24C4 12.954 12.954 4 24 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 24C8 15.163 15.163 8 24 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="4" r="2" fill="currentColor"/>
        <circle cx="4" cy="24" r="2" fill="currentColor"/>
      </svg>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}