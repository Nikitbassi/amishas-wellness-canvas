
-- Create admin users table for secure authentication
CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'manager')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leads table to store form submissions
CREATE TABLE public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    age INTEGER,
    gender TEXT,
    city TEXT,
    phone_number TEXT NOT NULL,
    preferred_consultation_date_time TIMESTAMP WITH TIME ZONE,
    health_goals TEXT[],
    okay_with_paid_plan BOOLEAN NOT NULL,
    why_lose_weight TEXT,
    health_conditions TEXT[],
    past_attempts TEXT[],
    weight_gain_reason TEXT,
    busyness_level TEXT,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'follow_up_needed', 'booked', 'converted', 'closed')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create appointments table
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status TEXT DEFAULT 'booked' CHECK (status IN ('booked', 'completed', 'cancelled', 'no_show')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create available slots table
CREATE TABLE public.available_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date DATE NOT NULL,
    time_slot TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    max_bookings INTEGER DEFAULT 1,
    current_bookings INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(date, time_slot)
);

-- Enable RLS on all tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.available_slots ENABLE ROW LEVEL SECURITY;

-- Create policies for admin users (they can access everything)
CREATE POLICY "Admin users can view all admin_users" ON public.admin_users
    FOR SELECT USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE is_active = true));

CREATE POLICY "Admin users can view all leads" ON public.leads
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE is_active = true));

CREATE POLICY "Admin users can manage appointments" ON public.appointments
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE is_active = true));

CREATE POLICY "Admin users can manage available slots" ON public.available_slots
    FOR ALL USING (auth.uid() IN (SELECT id FROM public.admin_users WHERE is_active = true));

-- Allow public access to available slots for the booking calendar
CREATE POLICY "Public can view available slots" ON public.available_slots
    FOR SELECT USING (is_available = true);

-- Allow public to insert leads
CREATE POLICY "Public can insert leads" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON public.admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_available_slots_updated_at BEFORE UPDATE ON public.available_slots FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert a default admin user (password should be changed immediately)
-- Password: 'admin123' (hashed with bcrypt)
INSERT INTO public.admin_users (email, password_hash, full_name, role) 
VALUES ('admin@amisha.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin User', 'admin');
