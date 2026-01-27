import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-background border-b border-grey300">
      <div className="w-full max-w-[100rem] mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="font-heading text-2xl font-bold text-foreground tracking-tight">
            RESUME BUILDER
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`font-paragraph text-base font-medium transition-colors ${
                isActive('/') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`font-paragraph text-base font-medium transition-colors ${
                isActive('/upload') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Upload
            </Link>
            <Link
              to="/builder"
              className={`font-paragraph text-base font-medium transition-colors ${
                isActive('/builder') ? 'text-primary' : 'text-foreground hover:text-primary'
              }`}
            >
              Builder
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
