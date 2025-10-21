import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function SignUp() {
  const [, setLocation] = useLocation();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, formData.fullName);

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      toast.success('Account created successfully!');
      setLocation('/dashboard');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2D1B4E] p-4">
      <div className="w-full max-w-md bg-[#2D1B4E] border-2 border-[#D4AF37] rounded-lg shadow-2xl p-8">
        <div className="space-y-2 mb-6">
          <h1 className="text-3xl font-serif font-bold text-[#D4AF37] text-center">
            Create an Account
          </h1>
          <p className="text-white text-center text-sm">
            Join the Civitas Dei community
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="John Smith"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="bg-[#4C1D95] border-[#D4AF37] text-white placeholder:text-gray-400 focus:border-[#F4D03F] focus:ring-[#F4D03F]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-[#4C1D95] border-[#D4AF37] text-white placeholder:text-gray-400 focus:border-[#F4D03F] focus:ring-[#F4D03F]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="bg-[#4C1D95] border-[#D4AF37] text-white placeholder:text-gray-400 focus:border-[#F4D03F] focus:ring-[#F4D03F]"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#D4AF37] text-[#2D1B4E] hover:bg-[#F4D03F] font-semibold text-lg py-6"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-white">
          Already have an account?{' '}
          <button
            onClick={() => setLocation('/signin')}
            className="text-[#D4AF37] hover:text-[#F4D03F] font-semibold hover:underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

