import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

interface Key {
  id: number;
  header_title: string;
  tooltip_marketing: string;
  full_lesson: any;
}

interface Manifesto {
  id: number;
  cta_text: string;
  hover_marketing: string;
  full_study: any;
}

export default function Home() {
  const [currentKey, setCurrentKey] = useState<Key | null>(null);
  const [currentManifesto, setCurrentManifesto] = useState<Manifesto | null>(null);
  const [showKeyTooltip, setShowKeyTooltip] = useState(false);
  const [showManifestoTooltip, setShowManifestoTooltip] = useState(false);
  const [selectedKey, setSelectedKey] = useState<Key | null>(null);
  const [selectedManifesto, setSelectedManifesto] = useState<Manifesto | null>(null);

  // Fetch random key on mount
  useEffect(() => {
    async function fetchRandomKey() {
      const { data } = await supabase
        .from('keys')
        .select('*')
        .order('id', { ascending: true });
      
      if (data && data.length > 0) {
        const randomKey = data[Math.floor(Math.random() * data.length)];
        setCurrentKey(randomKey);
      }
    }
    fetchRandomKey();
  }, []);

  // Fetch random manifesto on mount
  useEffect(() => {
    async function fetchRandomManifesto() {
      const { data } = await supabase
        .from('manifestos')
        .select('*')
        .order('id', { ascending: true });
      
      if (data && data.length > 0) {
        const randomManifesto = data[Math.floor(Math.random() * data.length)];
        setCurrentManifesto(randomManifesto);
      }
    }
    fetchRandomManifesto();
  }, []);

  // Rotate key every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('keys')
        .select('*')
        .order('id', { ascending: true });
      
      if (data && data.length > 0) {
        const randomKey = data[Math.floor(Math.random() * data.length)];
        setCurrentKey(randomKey);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Rotate manifesto every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('manifestos')
        .select('*')
        .order('id', { ascending: true });
      
      if (data && data.length > 0) {
        const randomManifesto = data[Math.floor(Math.random() * data.length)];
        setCurrentManifesto(randomManifesto);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#2D1B4E]">
      {/* Header */}
      <header className="bg-[#2D1B4E]">
        {/* Top navigation */}
        <div className="border-b-2 border-[#D4AF37] py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/">
              <a className="text-[#D4AF37] text-3xl font-serif font-bold hover:text-white transition">
                Civitas Dei
              </a>
            </Link>
            <nav className="flex items-center gap-6">
              <a href="#about" className="text-white hover:text-[#D4AF37] transition">About</a>
              <a href="#how-it-works" className="text-white hover:text-[#D4AF37] transition">How It Works</a>
              <a href="#for-churches" className="text-white hover:text-[#D4AF37] transition">For Churches</a>
              <a href="#contact" className="text-white hover:text-[#D4AF37] transition">Contact</a>
              <Link href="/signin">
                <a className="text-white hover:text-[#D4AF37] transition">Sign In</a>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#F4D03F] font-semibold">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>

        {/* Rotating Key Section */}
        {currentKey && (
          <div className="border-t border-b border-[#D4AF37] py-6">
            <div className="container mx-auto px-4">
              <div className="relative">
                <div 
                  className="text-white text-center text-lg font-light italic cursor-pointer relative"
                  onMouseEnter={() => setShowKeyTooltip(true)}
                  onMouseLeave={() => setShowKeyTooltip(false)}
                  onClick={() => setSelectedKey(currentKey)}
                >
                  <span className="hover:text-[#D4AF37] transition">
                    "{currentKey.header_title}"
                  </span>

                  {/* Tooltip */}
                  {showKeyTooltip && (
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 bg-[#2D1B4E] border-2 border-[#D4AF37] rounded-lg p-6 shadow-2xl z-50 w-[600px] max-w-[90vw]"
                      style={{ pointerEvents: 'none' }}
                    >
                      <div className="text-sm text-white font-normal not-italic text-left leading-relaxed">
                        {currentKey.tooltip_marketing}
                      </div>
                      <div className="text-xs text-[#D4AF37] mt-3 text-center">
                        Click to read more →
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="bg-[#2D1B4E] py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-6xl font-serif font-bold text-white mb-4">
              Welcome to Civitas Dei
            </h1>
            <h2 className="text-3xl font-serif text-[#D4AF37] mb-6">
              The Place Where Everything Fits Together
            </h2>
            <p className="text-white text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect with trusted members of the global church community for services, goods, and mutual support. Building economic resilience through faith and fellowship.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#F4D03F] font-semibold text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" className="border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D1B4E] font-semibold text-lg px-8 py-6 bg-transparent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#4C1D95] py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#2D1B4E] p-8 rounded-lg border-2 border-[#D4AF37] hover:transform hover:scale-105 transition">
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3">Trust Infrastructure</h3>
                <p className="text-white">
                  Every member is recommended by their pastor, creating a foundation of verified trust and accountability.
                </p>
              </div>
              
              <div className="bg-[#2D1B4E] p-8 rounded-lg border-2 border-[#D4AF37] hover:transform hover:scale-105 transition">
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3">Community First</h3>
                <p className="text-white">
                  Connect with fellow believers for services, support, and economic resilience in the AI era.
                </p>
              </div>
              
              <div className="bg-[#2D1B4E] p-8 rounded-lg border-2 border-[#D4AF37] hover:transform hover:scale-105 transition">
                <h3 className="font-serif text-2xl text-[#D4AF37] mb-3">Biblical Values</h3>
                <p className="text-white">
                  Built on principles of integrity, generosity, and mutual care as demonstrated in Acts 2.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Manifesto Section (Rotating Testimonial Style) */}
        {currentManifesto && (
          <section className="bg-[#2D1B4E] py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div 
                  className="cursor-pointer relative"
                  onMouseEnter={() => setShowManifestoTooltip(true)}
                  onMouseLeave={() => setShowManifestoTooltip(false)}
                  onClick={() => setSelectedManifesto(currentManifesto)}
                >
                  <p className="text-white text-3xl italic font-light mb-4 hover:text-[#D4AF37] transition">
                    "{currentManifesto.cta_text}"
                  </p>

                  {/* Tooltip */}
                  {showManifestoTooltip && (
                    <div 
                      className="absolute left-1/2 transform -translate-x-1/2 top-full mt-4 bg-[#2D1B4E] border-2 border-[#D4AF37] rounded-lg p-6 shadow-2xl z-50 w-[700px] max-w-[90vw]"
                      style={{ pointerEvents: 'none' }}
                    >
                      <div className="text-sm text-white font-normal not-italic text-left leading-relaxed">
                        {currentManifesto.hover_marketing}
                      </div>
                      <div className="text-xs text-[#D4AF37] mt-3 text-center">
                        Click to read the full study →
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-[#4C1D95] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif font-bold text-[#D4AF37] mb-6">
              Join the Pilot Programme
            </h2>
            <p className="text-white text-lg max-w-2xl mx-auto mb-8">
              Be part of the first wave building the Kingdom economy for the AI era.
            </p>
            <Link href="/signup">
              <Button className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#F4D03F] font-semibold text-lg px-8 py-6">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#2D1B4E] border-t-2 border-[#D4AF37] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white">
            © 2025 Civitas Dei. Building Kingdom Economics for the AI Era.
          </p>
        </div>
      </footer>

      {/* Key Modal */}
      {selectedKey && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={() => setSelectedKey(null)}
          ></div>

          <div className="relative bg-[#2D1B4E] border-2 border-[#D4AF37] rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedKey(null)}
              className="sticky top-4 float-right mr-4 text-[#D4AF37] hover:text-white text-3xl font-bold transition z-10"
            >
              ×
            </button>

            <div className="p-8 text-white">
              <h1 className="font-serif text-4xl text-[#D4AF37] mb-6 leading-tight">
                {selectedKey.full_lesson.title}
              </h1>

              <div className="mb-8 text-lg leading-relaxed border-l-4 border-[#D4AF37] pl-6 italic">
                {selectedKey.full_lesson.intro}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Biblical Foundation</h2>
                <div className="space-y-4">
                  {selectedKey.full_lesson.verses.map((verse: string, idx: number) => (
                    <div key={idx} className="bg-[#4C1D95] p-4 rounded border-l-4 border-[#D4AF37]">
                      <p className="italic leading-relaxed">{verse}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Examples</h2>
                <p className="leading-relaxed">{selectedKey.full_lesson.examples}</p>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Action Steps</h2>
                <ul className="space-y-2">
                  {selectedKey.full_lesson.actions.map((action: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#D4AF37] mr-2">→</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manifesto Modal */}
      {selectedManifesto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={() => setSelectedManifesto(null)}
          ></div>

          <div className="relative bg-[#2D1B4E] border-2 border-[#D4AF37] rounded-lg max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedManifesto(null)}
              className="sticky top-4 float-right mr-4 text-[#D4AF37] hover:text-white text-3xl font-bold transition z-10"
            >
              ×
            </button>

            <div className="p-8 text-white">
              <h1 className="font-serif text-4xl text-[#D4AF37] mb-6 leading-tight">
                {selectedManifesto.full_study.title}
              </h1>

              <div className="mb-8 text-lg leading-relaxed border-l-4 border-[#D4AF37] pl-6 italic">
                {selectedManifesto.full_study.intro}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Biblical Foundation</h2>
                <p className="leading-relaxed mb-4">{selectedManifesto.full_study.biblical_foundation}</p>
                <div className="space-y-4">
                  {selectedManifesto.full_study.verses.map((verse: string, idx: number) => (
                    <div key={idx} className="bg-[#4C1D95] p-4 rounded border-l-4 border-[#D4AF37]">
                      <p className="italic leading-relaxed">{verse}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Practical Steps</h2>
                <ul className="space-y-2">
                  {selectedManifesto.full_study.practical_steps.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#D4AF37] mr-2">→</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Expected Outcomes</h2>
                <p className="leading-relaxed">{selectedManifesto.full_study.expected_outcomes}</p>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-[#D4AF37] mb-4">Call to Action</h2>
                <p className="leading-relaxed">{selectedManifesto.full_study.call_to_action}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

