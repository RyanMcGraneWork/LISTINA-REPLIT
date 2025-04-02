import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { Textarea } from "@/components/ui/textarea";
import { Footer } from "@/components/ui/footer";

export default function ContactPage() {
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

      {/* Contact Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-zinc-800/50 border-emerald-500/20 p-8">
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input 
                    placeholder="Your name"
                    className="bg-muted border-primary/20 text-white placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com"
                    className="bg-muted border-primary/20 text-white placeholder:text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea 
                    placeholder="How can we help you?"
                    className="bg-muted border-primary/20 text-white placeholder:text-muted-foreground min-h-[150px]"
                  />
                </div>
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                  Send Message
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
                <h3 className="text-xl font-semibold mb-3">Office Location</h3>
                <p className="text-gray-400">
                  Av. del Prado Nueva Andalucía<br />
                  29660 Marbella<br />
                  Málaga, Spain
                </p>
              </Card>

              <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
                <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                <p className="text-gray-400">
                  Email: info@listina.ai<br />
                  Phone: +1 (555) 123-4567<br />
                  Hours: Mon-Fri 9:00 AM - 6:00 PM PST
                </p>
              </Card>

              <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
                <h3 className="text-xl font-semibold mb-3">Support</h3>
                <p className="text-gray-400">
                  For technical support and inquiries,<br />
                  please email: support@listina.ai
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}