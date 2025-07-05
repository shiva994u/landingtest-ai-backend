import { runLLMSimulation } from './llmAgent.js';
import { generateHeatmap } from './heatmapService.js';
import { compareVariants } from './variantComparator.js';
import supabase from '../lib/supabase.js';

export const queueSimulation = async ({ landingData, personas }) => {
  const results = [];

  for (const persona of personas) {
    const llmFeedback = await runLLMSimulation(landingData.html, persona);
    const heatmap = await generateHeatmap(landingData.html, persona);
    const comparison = await compareVariants();

    results.push({ persona, llmFeedback, heatmap, comparison });
  }

  const { data, error } = await supabase
    .from('simulations')
    .insert({
      html_snapshot: landingData.html,
      personas,
      results,
    })
    .select()
    .single();

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('DB insert failed');
  }

  return data;
};
