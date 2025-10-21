import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-amber-700">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Civitas Dei
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-purple-100">
            A Trust-Based Marketplace for Christian Communities
          </p>
          <p className="text-lg mb-12 text-purple-200 max-w-2xl mx-auto">
            Connect with trusted members of your church community for services, goods, and mutual support. 
            Building economic resilience through faith and fellowship.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => setLocation('/signup')}
              className="bg-amber-500 hover:bg-amber-600 text-purple-900 font-semibold px-8 py-6 text-lg"
            >
              Get Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setLocation('/signin')}
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-6 text-lg"
            >
              Sign In
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-amber-300">Trust Infrastructure</h3>
              <p className="text-purple-100">
                Every member is recommended by their pastor, creating a foundation of verified trust and accountability.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-amber-300">Community First</h3>
              <p className="text-purple-100">
                Connect with fellow believers for services, support, and economic resilience in the AI era.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-amber-300">Biblical Values</h3>
              <p className="text-purple-100">
                Built on principles of integrity, generosity, and mutual care as demonstrated in Acts 2.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

