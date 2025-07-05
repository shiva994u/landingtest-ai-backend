import { ingestInput } from '../services/ingestionService.js';
import { queueSimulation } from '../services/taskQueue.js';

export const handleSimulation = async (req, res) => {
  const { url, figmaFile, personas } = req.body;

  try {
    const landingData = await ingestInput({ url, figmaFile });
    const result = await queueSimulation({ landingData, personas });
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Simulation failed' });
  }
};
