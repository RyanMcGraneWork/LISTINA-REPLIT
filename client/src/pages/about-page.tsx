import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-8 flex justify-between items-center">
        <Link href="/">
          <Logo variant="white" size="lg" />
        </Link>
        <div className="flex gap-4">
          <Link href="/about">
            <Button variant="link" className="text-emerald-400">About Us</Button>
          </Link>
          <Link href="/contact">
            <Button variant="link" className="text-emerald-400">Contact</Button>
          </Link>
          <Link href="/auth">
            <Button variant="secondary" className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* About Us Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Listina AI</h1>

          <Card className="bg-zinc-800/50 border-emerald-500/20 p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-400 mb-6">
              At Listina AI, we're revolutionizing the real estate industry by combining cutting-edge artificial intelligence with comprehensive property data. Our mission is to empower real estate professionals with tools that make property matching and client communication more efficient and effective.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-400">
                Our AI-powered platform continuously evolves, incorporating the latest advancements in machine learning and data analytics to provide the most accurate property recommendations and market insights.
              </p>
            </Card>

            <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
              <h3 className="text-xl font-semibold mb-3">Global Reach</h3>
              <p className="text-gray-400">
                With connections to real estate databases worldwide, from Spain to Sweden to the UAE, we provide comprehensive coverage of global property markets.
              </p>
            </Card>

            <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
              <h3 className="text-xl font-semibold mb-3">Technology</h3>
              <p className="text-gray-400">
                Powered by Amazon AWS and advanced AI technologies, our platform delivers reliable, scalable, and intelligent solutions for real estate professionals.
              </p>
            </Card>

            <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
              <h3 className="text-xl font-semibold mb-3">Client Success</h3>
              <p className="text-gray-400">
                We measure our success through the achievements of our clients, focusing on delivering tools that enhance productivity and drive business growth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}