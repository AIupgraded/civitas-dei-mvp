import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-900">Civitas Dei</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Welcome, {user.full_name}!</CardTitle>
              <CardDescription>
                You're now part of the Civitas Dei community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="font-medium capitalize">{user.status}</p>
                </div>
                {user.location && (
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium">{user.location}</p>
                  </div>
                )}
                {user.bio && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Bio</p>
                    <p className="font-medium">{user.bio}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Explore the Marketplace</CardTitle>
              <CardDescription>
                Browse services offered by trusted members of the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setLocation('/marketplace')}
                className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
              >
                Browse Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

