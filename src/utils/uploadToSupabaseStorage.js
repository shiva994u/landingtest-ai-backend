import supabase from '../lib/supabase.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads heatmap image buffer to Supabase Storage.
 * @param {Buffer} buffer - PNG buffer
 * @param {string} persona - Persona name used in filename
 * @returns {Promise<string>} - Public URL of uploaded image
 */
export const uploadToSupabaseStorage = async (buffer, persona) => {
  const filename = `${persona.replace(/\s+/g, '_')}_heatmap_${uuidv4()}.png`;

  const { data, error } = await supabase.storage
    .from('heatmaps') // your Supabase bucket name
    .upload(filename, buffer, {
      contentType: 'image/png',
      upsert: true,
    });

  if (error) {
    console.error('Upload error:', error.message);
    throw new Error('Upload to Supabase failed');
  }

  // Retrieve the public URL
  const { data: urlData, error: urlError } = supabase.storage
    .from('heatmaps')
    .getPublicUrl(filename);

  if (urlError) {
    console.error('URL retrieval error:', urlError.message);
    throw new Error('Failed to get public URL');
  }

  return urlData.publicUrl;
};
