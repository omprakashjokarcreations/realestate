CREATE TABLE public.project_enquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
 phone text CHECK (char_length(phone) <= 40),
 project_type text NOT NULL CHECK (project_type IN ('Custom home', 'Renovation', 'Interior design', 'Not sure yet')),
 description text NOT NULL CHECK (char_length(description) BETWEEN 10 AND 3000)
);
GRANT INSERT ON public.project_enquiries TO anon;
GRANT ALL ON public.project_enquiries TO service_role;
ALTER TABLE public.project_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit enquiries" ON public.project_enquiries FOR INSERT TO anon WITH CHECK (true);