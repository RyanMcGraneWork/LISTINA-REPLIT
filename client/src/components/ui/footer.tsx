import { Link } from "wouter";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="bg-zinc-900/50 border-t border-emerald-500/20 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/#overview" className="hover:text-emerald-400 transition-colors">Overview</a>
              </li>
              <li>
                <a href="/#ai-matching" className="hover:text-emerald-400 transition-colors">Features</a>
              </li>
              <li>
                <a href="/#partners" className="hover:text-emerald-400 transition-colors">Partners</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li className="opacity-50 cursor-not-allowed">Jobs</li>
              <li className="opacity-50 cursor-not-allowed">Press</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
              <li>
                <Link href="/about#mission">Our Mission</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="opacity-50 cursor-not-allowed">Terms</li>
              <li className="opacity-50 cursor-not-allowed">Privacy</li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-emerald-500/20">
          <Logo variant="white" size="sm" />
          <p className="text-gray-400 text-sm mt-4">© 2025 Listina AI</p>
        </div>
      </div>
    </footer>
  );
}