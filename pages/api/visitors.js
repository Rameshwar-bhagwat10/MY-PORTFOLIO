// API route for tracking real visitors
import { promises as fs } from 'fs';
import path from 'path';

const VISITORS_FILE = path.join(process.cwd(), 'data', 'visitors.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Get visitor data
async function getVisitorData() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(VISITORS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, create initial data
    const initialData = {
      totalVisitors: 0,
      uniqueVisitors: new Set(),
      dailyVisitors: {},
      lastUpdated: new Date().toISOString()
    };
    await saveVisitorData(initialData);
    return initialData;
  }
}

// Save visitor data
async function saveVisitorData(data) {
  await ensureDataDir();
  // Convert Set to Array for JSON serialization
  const dataToSave = {
    ...data,
    uniqueVisitors: Array.from(data.uniqueVisitors)
  };
  await fs.writeFile(VISITORS_FILE, JSON.stringify(dataToSave, null, 2));
}

// Generate visitor fingerprint
function generateFingerprint(req) {
  const ip = req.headers['x-forwarded-for'] || 
             req.headers['x-real-ip'] || 
             req.connection.remoteAddress || 
             req.socket.remoteAddress ||
             (req.connection.socket ? req.connection.socket.remoteAddress : null);
  
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  
  // Create a simple fingerprint
  return Buffer.from(`${ip}-${userAgent}-${acceptLanguage}`).toString('base64');
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = await getVisitorData();
      
      // Convert Array back to Set for processing
      data.uniqueVisitors = new Set(data.uniqueVisitors);
      
      res.status(200).json({
        totalVisitors: data.totalVisitors,
        uniqueVisitors: data.uniqueVisitors.size,
        lastUpdated: data.lastUpdated
      });
    } catch (error) {
      console.error('Error getting visitor data:', error);
      res.status(500).json({ error: 'Failed to get visitor data' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = await getVisitorData();
      
      // Convert Array back to Set for processing
      data.uniqueVisitors = new Set(data.uniqueVisitors);
      
      const fingerprint = generateFingerprint(req);
      const today = new Date().toDateString();
      
      // Check if this is a new unique visitor
      const isNewVisitor = !data.uniqueVisitors.has(fingerprint);
      
      if (isNewVisitor) {
        data.uniqueVisitors.add(fingerprint);
        data.totalVisitors += 1;
      }
      
      // Track daily visitors
      if (!data.dailyVisitors[today]) {
        data.dailyVisitors[today] = new Set();
      } else {
        data.dailyVisitors[today] = new Set(data.dailyVisitors[today]);
      }
      
      data.dailyVisitors[today].add(fingerprint);
      data.dailyVisitors[today] = Array.from(data.dailyVisitors[today]);
      
      data.lastUpdated = new Date().toISOString();
      
      await saveVisitorData(data);
      
      res.status(200).json({
        totalVisitors: data.totalVisitors,
        uniqueVisitors: data.uniqueVisitors.size,
        isNewVisitor,
        dailyVisitors: data.dailyVisitors[today].length
      });
    } catch (error) {
      console.error('Error updating visitor data:', error);
      res.status(500).json({ error: 'Failed to update visitor data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}