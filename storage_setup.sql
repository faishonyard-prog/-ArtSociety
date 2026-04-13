-- SUPABASE STORAGE SETUP FOR MEDIA UPLOAD
-- Run this in your Supabase SQL Editor

-- 1. Create a bucket named 'mahiarts-media'
INSERT INTO storage.buckets (id, name, public)
VALUES ('mahiarts-media', 'mahiarts-media', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow Public Access to view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'mahiarts-media' );

-- 3. Allow Authenticated users to upload images
CREATE POLICY "Admin Upload"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'mahiarts-media'
  -- You can add further checks here if needed, 
  -- e.g. checking auth.uid() if you have specific user roles in auth.users
);

-- 4. Allow Authenticated users to update/delete their images (optional)
CREATE POLICY "Admin Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'mahiarts-media' );

CREATE POLICY "Admin Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'mahiarts-media' );
