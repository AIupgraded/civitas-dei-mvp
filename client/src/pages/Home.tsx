import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Key {
  id: number;
  header_title: string;
  tooltip_marketing: string;
  full_lesson: {
    title: string;
    intro: string;
    verses: string[];
    examples: string;
    actions: string[];
  };
}

interface Manifesto {
  id: number;
  cta_text: string;
  hover_marketing: string;
  full_study: {
    title: string;
    intro: string;
    biblical_foundation: string;
    verses: string[];
    practical_steps: string[];
    expected_outcomes: string;
    call_to_action: string;
  };
}

export default function Home() {
  const [currentKey, setCurrentKey] = useState<Key | null>(null);
  const [manifestos, setManifestos] = useState<Manifesto[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Key | null>(null);
  const [selectedStudy, setSelectedStudy] = useState<Manifesto | null>(null);
  const [showKeyTooltip, setShowKeyTooltip] = useState(false);
  const [hoveredManifesto, setHoveredManifesto] = useState<number | null>(null);

  useEffect(() => {
    // Fetch random key for header
    const fetchKey = async () => {
      const { data, error } = await supabase
        .from("keys")
        .select("*")
        .limit(1)
        .order("id", { ascending: false });
      
      if (data && data.length > 0) {
        // Get random key
        const randomIndex = Math.floor(Math.random() * 20) + 1;
        const { data: randomKey } = await supabase
          .from("keys")
          .select("*")
          .eq("id", randomIndex)
          .single();
        
        if (randomKey) setCurrentKey(randomKey);
      }
    };

    // Fetch 6 random manifestos
    const fetchManifestos = async () => {
      const { data } = await supabase
        .from("manifestos")
        .select("*")
        .limit(20);
      
      if (data) {
        // Shuffle and take 6
        const shuffled = data.sort(() => 0.5 - Math.random());
        setManifestos(shuffled.slice(0, 6));
      }
    };

    fetchKey();
    fetchManifestos();
  }, []);

  return (
    <div className="min-h-screen bg-[#2D1B4E] text-white">
      {/* Header */}
      <header className="border-b-2 border-[#D4AF37]">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Civitas Dei
            </h1>
            <nav className="flex gap-6">
              <Link href="/signin">
                <Button variant="ghost" className="text-white hover:text-[#D4AF37]">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#B8941F]">
                  Get Started
                </Button>
              </Link>
            </nav>
          </div>
        </div>
        
        {/* Rotating Key Header */}
        {currentKey && (
          <div className="border-t border-[#D4AF37]/30 py-3">
            <div className="container">
              <div 
                className="text-center cursor-pointer relative"
                onMouseEnter={() => setShowKeyTooltip(true)}
                onMouseLeave={() => setShowKeyTooltip(false)}
                onClick={() => setSelectedLesson(currentKey)}
              >
                <p className="text-lg italic text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "{currentKey.header_title}"
                </p>
                
                {/* Tooltip on hover */}
                {showKeyTooltip && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white text-gray-900 p-4 rounded-lg shadow-xl z-50">
                    <p className="text-sm">{currentKey.tooltip_marketing}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Civitas Dei
          </h2>
          <p className="text-2xl mb-4 text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
            A Trust-Based Marketplace for Christian Communities
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Connect with trusted members of your church community for services, goods, and mutual support. 
            Building economic resilience through faith and fellowship.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#B8941F] text-lg px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D1B4E] text-lg px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#4C1D95]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#2D1B4E] border-[#D4AF37] p-6">
              <h3 className="text-xl font-bold mb-3 text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Trust Infrastructure
              </h3>
              <p className="text-white">
                Every member is recommended by their pastor, creating a foundation of verified trust and accountability.
              </p>
            </Card>
            <Card className="bg-[#2D1B4E] border-[#D4AF37] p-6">
              <h3 className="text-xl font-bold mb-3 text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Community First
              </h3>
              <p className="text-white">
                Connect with fellow believers for services, support, and economic resilience in the AI era.
              </p>
            </Card>
            <Card className="bg-[#2D1B4E] border-[#D4AF37] p-6">
              <h3 className="text-xl font-bold mb-3 text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Biblical Values
              </h3>
              <p className="text-white">
                Built on principles of integrity, generosity, and mutual care as demonstrated in Acts 2.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Manifestos Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12 text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Kingdom Economics Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {manifestos.map((manifesto) => (
              <Card 
                key={manifesto.id}
                className="bg-[#4C1D95] border-[#D4AF37] p-6 cursor-pointer relative hover:border-[#D4AF37] transition-all"
                onMouseEnter={() => setHoveredManifesto(manifesto.id)}
                onMouseLeave={() => setHoveredManifesto(null)}
                onClick={() => setSelectedStudy(manifesto)}
              >
                <h3 className="text-lg font-bold text-[#D4AF37] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {manifesto.cta_text}
                </h3>
                
                {/* Hover popup */}
                {hoveredManifesto === manifesto.id && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-900 p-4 rounded-lg shadow-xl z-50">
                    <p className="text-sm">{manifesto.hover_marketing}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#4C1D95]">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#D4AF37]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Join the Pilot Program
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the first wave building the Kingdom economy for the AI era. 
            3 months free. No obligations.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#B8941F] text-lg px-12">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#D4AF37] py-8">
        <div className="container text-center">
          <p className="text-[#D4AF37]">
            © 2025 Civitas Dei. Building Kingdom Economics for the AI Era.
          </p>
        </div>
      </footer>

      {/* Key Lesson Modal */}
      <Dialog open={!!selectedLesson} onOpenChange={() => setSelectedLesson(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedLesson?.full_lesson.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700">{selectedLesson?.full_lesson.intro}</p>
            
            <div>
              <h4 className="font-bold mb-2">Biblical Foundation:</h4>
              {selectedLesson?.full_lesson.verses.map((verse, idx) => (
                <p key={idx} className="italic text-gray-600 mb-2">"{verse}"</p>
              ))}
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Examples:</h4>
              <p className="text-gray-700">{selectedLesson?.full_lesson.examples}</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Action Steps:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {selectedLesson?.full_lesson.actions.map((action, idx) => (
                  <li key={idx} className="text-gray-700">{action}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manifesto Study Modal */}
      <Dialog open={!!selectedStudy} onOpenChange={() => setSelectedStudy(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedStudy?.full_study.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-700">{selectedStudy?.full_study.intro}</p>
            
            <div>
              <h4 className="font-bold mb-2">Biblical Foundation:</h4>
              <p className="text-gray-700 mb-2">{selectedStudy?.full_study.biblical_foundation}</p>
              {selectedStudy?.full_study.verses.map((verse, idx) => (
                <p key={idx} className="italic text-gray-600 mb-2">"{verse}"</p>
              ))}
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Practical Steps:</h4>
              <ul className="list-disc pl-6 space-y-1">
                {selectedStudy?.full_study.practical_steps.map((step, idx) => (
                  <li key={idx} className="text-gray-700">{step}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Expected Outcomes:</h4>
              <p className="text-gray-700">{selectedStudy?.full_study.expected_outcomes}</p>
            </div>
            
            <div className="bg-[#2D1B4E] text-white p-4 rounded-lg">
              <p className="font-bold">{selectedStudy?.full_study.call_to_action}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

