import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { Footer } from "@/components/ui/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-4 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <Link href="/">
          <Logo variant="white" size="lg" />
        </Link>
        <div className="flex gap-2 md:gap-4">
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

      {/* Hero Section */}
      <section id="overview" className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center lg:text-left lg:max-w-[50%]">
            <p className="text-emerald-400 mb-4">#1 on Real Estate search</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Discover our realestate AI Agent for faster workflow.
            </h1>
            <p className="text-gray-400 mb-8">
              Listina.ai accelerates your property search with AI-powered precision from faster listings search & presentation.
            </p>
            <Link href="/contact">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 md:px-8 py-2 w-full md:w-auto">
                Contact us
              </Button>
            </Link>
          </div>
          <div className="flex-1 lg:max-w-[50%] flex items-center justify-center w-full">
            <div className="ai w-full max-w-[300px] md:max-w-[391px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="391" height="391" viewBox="0 0 391 391" fill="none">
                <g id="ai">
                  <g id="main" filter="url(#filter0_i)">
                    <ellipse cx="195" cy="195.878" rx="137" ry="130" fill="black" />
                  </g>
                  <g id="g" filter="url(#filter1_i)">
                    <path d="M258.925 321.952C217.208 345.095 172.592 342.312 125.078 313.602C77.5637 284.893 55.7755 241.764 59.7134 184.217C63.6513 126.669 92.3392 89.9343 145.777 74.0127C199.215 58.0912 240.138 64.8972 288.549 94.4308C336.959 123.964 352.887 163.482 336.333 212.984C319.778 262.486 300.643 298.809 258.925 321.952Z" fill="white" fillOpacity="0.01" />
                  </g>
                  <g id="f" filter="url(#filter2_i)">
                    <path d="M326.448 156.236C346.632 212.15 332.809 259.232 284.98 291.481C237.151 323.731 192.504 332.917 149.039 323.041C105.574 313.164 89.3852 282.81 62.4734 237.98C35.5616 193.149 44.0955 149.683 88.0752 113.583C132.055 77.4825 162.066 60.7542 216.109 63.398C270.151 66.0419 306.264 100.321 326.448 156.236Z" fill="white" fillOpacity="0.01" />
                  </g>
                  <g id="e" filter="url(#filter3_i)">
                    <path d="M308.736 272.285C277.494 310.837 241.385 331.695 202.457 330.853C163.529 330.012 131.724 311.363 90.3165 273.652C48.909 235.941 42.6591 180.041 78.2399 130.975C113.821 81.9087 148.433 66.384 203.478 59.8779C267.756 59.878 301.626 79.7019 321.834 139.983C342.042 200.265 339.977 233.733 308.736 272.285Z" fill="white" fillOpacity="0.01" />
                  </g>
                  <g id="d" filter="url(#filter4_i)">
                    <path d="M310.393 271.778C277.096 320.326 237.637 341.218 192.017 334.454C146.397 327.691 108.445 303.417 78.163 261.632C47.8806 219.848 47.2907 176.786 76.3933 132.447C105.496 88.1073 144.037 62.6309 192.017 56.0176C239.997 49.4042 280.045 71.5739 312.163 122.527C344.281 173.48 343.691 223.23 310.393 271.778Z" fill="white" fillOpacity="0.01" />
                  </g>
                  <g id="c" filter="url(#filter5_i)">
                    <path d="M307.832 268.624C269.508 314.707 224.746 336.931 177.547 333.296C130.347 329.662 95.4519 306.621 72.8607 264.173C50.2695 221.725 51.3869 179.861 70.2129 130.581C89.0389 81.3006 124.741 56.7332 177.319 56.8786C229.898 57.0239 268.542 71.6641 305.253 120.799C341.964 169.934 346.157 222.542 307.832 268.624Z" fill="white" fillOpacity="0.01" />
                  </g>
                  <g id="b" filter="url(#filter6_i)">
                    <path d="M331.624 168.687C347.668 221.613 330.95 272.44 279.471 301.168C227.991 329.896 187.577 329.032 145.905 318.035C105.707 305.685 76.9748 280.125 58.6244 235.997C45.9255 192.116 49.6617 164.211 87.3237 111.256C124.986 58.3013 191.752 38.1339 243.897 64.3134C296.041 90.4928 315.581 115.761 331.624 168.687Z" fill="white" fillOpacity="0.01" />
                  </g>
                  <g id="a" filter="url(#filter7_i)">
                    <path d="M326.506 247.112C315.692 300.334 286.086 320.463 219.776 328.226C162.35 330.151 125.891 317.84 89.3915 279.281C52.8915 240.723 45.0065 196.243 65.7364 145.84C86.4663 95.437 130.158 67.4141 184.915 60.2048C239.672 52.9955 281.677 69.9023 310.931 110.925C340.185 151.948 337.32 193.89 326.506 247.112Z" fill="white" fillOpacity="0.01" />
                  </g>
                </g>
                <defs>
                  <filter id="filter0_i" x="58" y="65.8779" width="274" height="260" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feMorphology radius="21" operator="erode" in="SourceAlpha" result="effect1_innerShadow" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="11" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                  <filter id="filter1_i" x="2.5" y="2.87793" width="386.053" height="385.637" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.418229 0 0 0 0 0.448185 0 0 0 0 0.9125 0 0 0 0.77 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                  <filter id="filter2_i" x="2" y="1.93799" width="385.898" height="386.199" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.418229 0 0 0 0 0.448185 0 0 0 0 0.9125 0 0 0 0.77 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                  <filter id="filter3_i" x="55" y="59.8779" width="280" height="271" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.418229 0 0 0 0 0.448185 0 0 0 0 0.9125 0 0 0 0.77 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                  <filter id="filter4_i" x="55" y="54.8779" width="280.817" height="280.817" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.418229 0 0 0 0 0.448185 0 0 0 0 0.9125 0 0 0 0.77 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                  <filter id="filter5_i" x="56" y="56.8779" width="278.738" height="276.802" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.418229 0 0 0 0 0.448185 0 0 0 0 0.9125 0 0 0 0.77 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                  <filter id="filter6_i" x="0" y="0" width="390.838" height="390.84" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.418229 0 0 0 0 0.448185 0 0 0 0 0.9125 0 0 0 0.77 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                  <filter id="filter7_i" x="35" y="39.8555" width="320.27" height="311.235" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="10" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.418229 0 0 0 0 0.448185 0 0 0 0 0.9125 0 0 0 0.77 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* AI Matching Section */}
      <section id="ai-matching" className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Accelerate Your Property Search</h2>
          <p className="text-gray-400">empowering agents with AI-driven speed and precision</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
            <h3 className="text-lg font-semibold mb-2">AI Matching</h3>
            <p className="text-gray-400 text-sm mb-4">Leverage AI to find properties faster</p>
            <ul className="space-y-2 text-gray-400 text-sm mb-4">
              <li className="flex items-start gap-2">
                <span>Our AI scans multiple property databases in real time for client-matched listings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>Automated filtering and personalized recommendations ensure agents get best-suited properties instantly.</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
            <h3 className="text-lg font-semibold mb-2">AI Assistance for Co-Creation & Support</h3>
            <p className="text-gray-400 text-sm mb-4">Enhance efficiency with AI-powered assistance</p>
            <ul className="space-y-2 text-gray-400 text-sm mb-4">
              <li className="flex items-start gap-2">
                <span>AI helps agents draft property descriptions, client emails, and marketing materials.</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
            <h3 className="text-lg font-semibold mb-2">Instant Property Reports</h3>
            <p className="text-gray-400 text-sm mb-4">Generate comprehensive insights in seconds</p>
            <ul className="space-y-2 text-gray-400 text-sm mb-4">
              <li className="flex items-start gap-2">
                <span>AI-powered reports summarize key details like price trends, ROI, and location data.</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
            <h3 className="text-lg font-semibold mb-2">Faster Workflow in Presenting Listings to Clients</h3>
            <p className="text-gray-400 text-sm mb-4">Streamline property presentations with AI</p>
            <ul className="space-y-2 text-gray-400 text-sm mb-4">
              <li className="flex items-start gap-2">
                <span>AI organizes and formats listings for easy sharing with clients.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>Create dynamic presentations visual content & text instantly.</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16">Our partners create us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
            <h3 className="text-lg font-semibold mb-2">Powered by AWS</h3>
            <p className="text-gray-400 text-sm">Leveraging Amazon Web Services (AWS) cloud infrastructure for reliable, scalable, and secure real estate solutions.</p>
            <a href="https://aws.amazon.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-emerald-400 mt-4 p-0">
                Learn more
              </Button>
            </a>
          </Card>
          <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
            <h3 className="text-lg font-semibold mb-2">Powered by OpenAI</h3>
            <p className="text-gray-400 text-sm">Advanced AI capabilities powered by OpenAI technology for intelligent property matching and analysis.</p>
            <a href="https://openai.com/" target="_blank" rel="noopener noreferrer">
              <Button variant="link" className="text-emerald-400 mt-4 p-0">
                Learn more
              </Button>
            </a>
          </Card>
          <Card className="bg-zinc-800/50 border-emerald-500/20 p-6">
            <h3 className="text-lg font-semibold mb-2">Worldwide Real Estate databases</h3>
            <p className="text-gray-400 text-sm">From Spain, Sweden to UAE. To around the globe. We are plugged in to real estate databases around the world.</p>
          </Card>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe for updates</h2>
          <p className="text-gray-400 mb-8">Stay ahead with our newsletter!</p>
          <div className="flex flex-col md:flex-row max-w-md mx-auto gap-4">
            <Input
              type="email"
              placeholder="agent@example.com"
              className="bg-zinc-800/50 border-emerald-500/20"
            />
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white md:w-auto">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer>
          <Link href="#overview">Overview</Link>
      </Footer>
    </div>
  );
}