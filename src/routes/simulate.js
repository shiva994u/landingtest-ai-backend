
import express from "express";
import supabase from "../lib/supabase.js";
import { handleSimulation } from '../controllers/simulateController.js';

const router = express.Router();

router.post('/', handleSimulation); 

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('simulations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: 'Failed to fetch' });
  res.json(data);
});

export default router;
