import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';
import { supabase, Service, User } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [service, setService] = useState<(Service & { provider: User }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchService(id);
    }
  }, [id]);

  async function fetchService(serviceId: string) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          provider:users!provider_id(*)
        `)
        .eq('id', serviceId)
        .single();

      if (error) throw error;
      setService(data as any);
    } catch (error) {
      console.error('Error fetching service:', error);
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
        <p>Loading...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Service not found</p>
          <Button onClick={() => setLocation('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
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
        <Button 
          variant="ghost" 
          onClick={() => setLocation('/marketplace')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="text-sm">
                  {service.category}
                </Badge>
                <span className="text-2xl font-bold text-purple-600">
                  {formatPrice(service)}
                </span>
              </div>
              <CardTitle className="text-3xl mb-2">{service.title}</CardTitle>
              {service.location && (
                <CardDescription className="flex items-center text-base">
                  <MapPin className="w-4 h-4 mr-1" />
                  {service.location}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{service.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-bold text-2xl">
                    {service.provider.full_name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.provider.full_name}
                  </h3>
                  {service.provider.bio && (
                    <p className="text-gray-600 mb-3">{service.provider.bio}</p>
                  )}
                  <div className="space-y-2 text-sm">
                    {service.provider.email && (
                      <div className="flex items-center text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {service.provider.email}
                      </div>
                    )}
                    {service.provider.phone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {service.provider.phone}
                      </div>
                    )}
                    {service.provider.location && (
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {service.provider.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6">
                Contact Provider
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

