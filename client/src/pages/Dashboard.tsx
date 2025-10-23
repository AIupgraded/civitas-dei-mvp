import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, User, LogOut } from 'lucide-react';

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/signin');
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2D1B4E] flex items-center justify-center">
        <p className="text-[#D4AF37] text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  async function handleSignOut() {
    await signOut();
    setLocation('/');
  }

  return (
    <div className="min-h-screen bg-[#2D1B4E]">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-[#2D1B4E]">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-serif text-[#D4AF37]">Civitas Dei</h1>
          <Button 
            variant="outline" 
            onClick={handleSignOut}
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D1B4E]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Card */}
          <Card className="bg-[#4C1D95] border-[#D4AF37] border-2">
            <CardHeader>
              <CardTitle className="text-3xl font-serif text-[#D4AF37] flex items-center gap-3">
                <User className="w-8 h-8" />
                Welcome, {user.full_name || 'Member'}!
              </CardTitle>
              <CardDescription className="text-white/80 text-lg">
                You're now part of the Civitas Dei community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-[#D4AF37] font-medium mb-1">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-[#D4AF37] font-medium mb-1">Status</p>
                  <p className="text-white capitalize">{user.status || 'Active'}</p>
                </div>
                {user.location && (
                  <div>
                    <p className="text-sm text-[#D4AF37] font-medium mb-1">Location</p>
                    <p className="text-white">{user.location}</p>
                  </div>
                )}
                {user.bio && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-[#D4AF37] font-medium mb-1">Bio</p>
                    <p className="text-white">{user.bio}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card className="bg-[#4C1D95] border-[#D4AF37] border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-[#D4AF37] flex items-center gap-3">
                <ShoppingBag className="w-7 h-7" />
                Browse Services
              </CardTitle>
              <CardDescription className="text-white/80 text-base">
                Discover services offered by trusted members of the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setLocation('/services')}
                className="w-full md:w-auto bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#F4D03F] font-semibold text-lg px-8 py-6"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Browse Services
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#4C1D95] border-[#D4AF37]">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#D4AF37]">0</p>
                  <p className="text-white/70 mt-2">Services Posted</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#4C1D95] border-[#D4AF37]">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#D4AF37]">0</p>
                  <p className="text-white/70 mt-2">Transactions</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#4C1D95] border-[#D4AF37]">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-[#D4AF37]">100%</p>
                  <p className="text-white/70 mt-2">Trust Score</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

