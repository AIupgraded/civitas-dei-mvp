import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase, Service, User } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Marketplace() {
  const [, setLocation] = useLocation();
  const [services, setServices] = useState<(Service & { provider: User })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          provider:users!provider_id(*)
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data as any);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatPrice(service: Service) {
    if (!service.price_min && !service.price_max) return 'Price negotiable';
    
    const min = service.price_min ? `£${service.price_min}` : '';
    const max = service.price_max ? `£${service.price_max}` : '';
    
    if (min && max && min !== max) {
      return `${min} - ${max}${service.price_type === 'hourly' ? '/hr' : ''}`;
    }
    return `${min || max}${service.price_type === 'hourly' ? '/hr' : ''}`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading marketplace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-amber-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-900">Civitas Dei</h1>
          <Button variant="outline" onClick={() => setLocation('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Marketplace</h2>
          <p className="text-gray-600">
            Browse services offered by trusted members of our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setLocation(`/service/${service.id}`)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{service.category}</Badge>
                  <span className="text-sm font-semibold text-purple-600">
                    {formatPrice(service)}
                  </span>
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">
                      {service.provider.full_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.provider.full_name}</p>
                    {service.location && (
                      <p className="text-xs text-gray-500">{service.location}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No services available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}

