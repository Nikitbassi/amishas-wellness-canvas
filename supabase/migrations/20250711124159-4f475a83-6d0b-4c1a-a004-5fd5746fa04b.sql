
-- Drop the problematic policy first
DROP POLICY IF EXISTS "Admin users can view all admin_users" ON public.admin_users;

-- Create a security definer function to check if a user is an active admin
CREATE OR REPLACE FUNCTION public.is_active_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE id = user_id AND is_active = true
  );
$$;

-- Create a new policy that uses the security definer function
CREATE POLICY "Admin users can view all admin_users" ON public.admin_users
    FOR SELECT USING (public.is_active_admin(auth.uid()));

-- Also update the other policies to use the same function for consistency
DROP POLICY IF EXISTS "Admin users can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Admin users can manage appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admin users can manage available slots" ON public.available_slots;

CREATE POLICY "Admin users can view all leads" ON public.leads
    FOR ALL USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admin users can manage appointments" ON public.appointments
    FOR ALL USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admin users can manage available slots" ON public.available_slots
    FOR ALL USING (public.is_active_admin(auth.uid()));
