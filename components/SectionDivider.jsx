export default function SectionDivider({ bg, fill, type = "convex" }) {
  const path = type === "convex" 
    ? "M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
    : "M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z";
    
  return (
    <div className="section-divider" style={{ backgroundColor: bg }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
        <path d={path} fill={fill} />
      </svg>
    </div>
  );
}
