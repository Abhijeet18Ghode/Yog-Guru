import mongoose from 'mongoose';

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['hero', 'blog', 'session', 'contact', 'settings']
  },
  title: String,
  content: mongoose.Schema.Types.Mixed,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Content || mongoose.model('Content', ContentSchema);