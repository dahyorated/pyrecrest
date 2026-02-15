export default function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <div className="flex items-center gap-3">
      <img
        src="/pyrecrestlogo.jpg"
        alt="Pyrecrest Logo"
        className={className}
      />
      <span className="text-2xl font-bold gradient-text hidden sm:block">
        Pyrecrest
      </span>
    </div>
  );
}
