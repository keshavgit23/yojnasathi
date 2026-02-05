-- Update users table to include user_type
ALTER TABLE public.users 
ADD COLUMN user_type TEXT DEFAULT 'user' CHECK (user_type IN ('user', 'developer', 'cs_center'));

-- Update the trigger function to handle user type from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (user_id, phone, name, user_type)
  VALUES (
    new.id, 
    COALESCE(new.phone, new.raw_user_meta_data->>'phone', ''), 
    COALESCE(new.raw_user_meta_data->>'name', new.email, 'User'),
    COALESCE(new.raw_user_meta_data->>'user_type', 'user')
  );
  RETURN new;
END;
$$;