import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase, Service, User } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Filter } from 'lucide-react';

export default function Services() {
  const [, setLocation] = useLocation();
  const [services, setServices] = useState<(Service & { provider: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2D1B4E] flex items-center justify-center">
        <p className="text-[#D4AF37] text-xl">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2D1B4E]">
      {/* Header */}
      <header className="border-b border-[#D4AF37]/20 bg-[#2D1B4E]">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-serif text-[#D4AF37]">Civitas Dei</h1>
          <Button 
            variant="outline" 
            onClick={() => setLocation('/dashboard')}
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D1B4E]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-serif font-bold text-[#D4AF37] mb-3">Community Services</h2>
          <p className="text-white/80 text-lg">
            Browse services offered by trusted members of our community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4AF37] w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#4C1D95] border-2 border-[#D4AF37] rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#F4D03F]"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="text-[#D4AF37] w-5 h-5" />
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category 
                  ? "bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#F4D03F]"
                  : "border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#2D1B4E]"
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card 
              key={service.id} 
              className="bg-[#4C1D95] border-[#D4AF37] border-2 hover:border-[#F4D03F] transition-all cursor-pointer hover:scale-105"
              onClick={() => setLocation(`/service/${service.id}`)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className="bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#F4D03F]">
                    {service.category}
                  </Badge>
                  <span className="text-sm font-semibold text-[#D4AF37]">
                    {formatPrice(service)}
                  </span>
                </div>
                <CardTitle className="text-xl text-[#D4AF37] font-serif">{service.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-white/70">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                    <span className="text-[#2D1B4E] font-bold text-lg">
                      {service.provider.full_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{service.provider.full_name}</p>
                    {service.location && (
                      <p className="text-xs text-white/60">{service.location}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-lg">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No services match your search criteria.' 
                : 'No services available at the moment.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

