import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  htmlSnapshot: String,
  personas: [String],
  results: [
    {
      persona: String,
      llmFeedback: String,
      heatmap: String,
      comparison: Object
    }
  ],
  createdAt: Date
});

export default mongoose.model('SimulationResult', resultSchema);
