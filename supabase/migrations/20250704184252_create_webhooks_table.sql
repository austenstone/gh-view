-- Create webhooks table for storing GitHub webhook deliveries
CREATE TABLE public.webhooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    github_id TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    repository TEXT,
    sender TEXT,
    payload JSONB NOT NULL,
    headers JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_webhooks_event_type ON public.webhooks(event_type);
CREATE INDEX idx_webhooks_repository ON public.webhooks(repository);
CREATE INDEX idx_webhooks_created_at ON public.webhooks(created_at DESC);
CREATE INDEX idx_webhooks_github_id ON public.webhooks(github_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.webhooks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust for your security needs)
CREATE POLICY "Allow all operations on webhooks" ON public.webhooks
    FOR ALL USING (true);

-- Enable real-time for the webhooks table
ALTER PUBLICATION supabase_realtime ADD TABLE public.webhooks;

-- Create function to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_webhooks_updated_at 
    BEFORE UPDATE ON public.webhooks 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
