// Central mock data for the Smart Agriculture app.
// In production these would come from external APIs (OpenWeather, soil sensors,
// leaf-disease ML model, market price API). Here we provide realistic sample
// data so the UI is fully functional for demonstration.

export type WeatherDay = {
  day: string;
  temp: number;
  humidity: number;
  rainfall: number;
  wind: number;
  uv: number;
  condition: string;
  icon: string;
};

export const currentWeather = {
  temp: 18,
  feelsLike: 16,
  humidity: 72,
  rainfall: 4.2,
  wind: 12,
  uv: 5,
  pressure: 1013,
  condition: 'Partly Cloudy',
  location: 'Coonoor, Nilgiris',
};

export const weatherForecast: WeatherDay[] = [
  { day: 'Mon', temp: 19, humidity: 70, rainfall: 2.1, wind: 10, uv: 5, condition: 'Partly Cloudy', icon: '⛅' },
  { day: 'Tue', temp: 17, humidity: 85, rainfall: 12.4, wind: 18, uv: 2, condition: 'Rain', icon: '🌧️' },
  { day: 'Wed', temp: 16, humidity: 90, rainfall: 18.0, wind: 22, uv: 1, condition: 'Heavy Rain', icon: '⛈️' },
  { day: 'Thu', temp: 18, humidity: 78, rainfall: 6.5, wind: 14, uv: 4, condition: 'Showers', icon: '🌦️' },
  { day: 'Fri', temp: 20, humidity: 65, rainfall: 1.2, wind: 8, uv: 6, condition: 'Sunny', icon: '☀️' },
  { day: 'Sat', temp: 21, humidity: 60, rainfall: 0, wind: 7, uv: 7, condition: 'Sunny', icon: '☀️' },
  { day: 'Sun', temp: 19, humidity: 68, rainfall: 0.8, wind: 9, uv: 6, condition: 'Partly Cloudy', icon: '⛅' },
];

export const weatherAlerts = [
  { severity: 'warning', title: 'Heavy Rain Expected Wed', body: '18mm rainfall forecast. Delay fertilizer application and secure young plants.' },
  { severity: 'info', title: 'Frost Risk Tonight', body: 'Temperature may drop to 8°C in upper slopes. Cover tender crops.' },
];

export type CropRec = {
  name: string;
  confidence: number;
  expectedYield: string;
  expectedProfit: string;
  growingTips: string[];
  fertilizers: string[];
  harvestTime: string;
  emoji: string;
};

export const cropRecommendations: CropRec[] = [
  {
    name: 'Cardamom', confidence: 94, expectedYield: '600 kg/ha', expectedProfit: '₹4.8 L/ha',
    growingTips: ['Plant in shaded areas', 'Maintain 70% humidity', 'Mulch with leaves'],
    fertilizers: ['Vermicompost', 'Bone meal', 'Wood ash'],
    harvestTime: 'Oct–Dec', emoji: '🌱',
  },
  {
    name: 'Tea', confidence: 88, expectedYield: '2,500 kg/ha', expectedProfit: '₹3.2 L/ha',
    growingTips: ['Prune every 4 years', 'Acidic soil pH 4.5–5.5', 'Drip irrigation recommended'],
    fertilizers: ['NPK 10:10:10', 'Organic compost'],
    harvestTime: 'Year-round plucking', emoji: '🌿',
  },
  {
    name: 'Potato', confidence: 82, expectedYield: '22 t/ha', expectedProfit: '₹2.1 L/ha',
    growingTips: ['Hill up soil around stems', 'Well-drained loamy soil', 'Avoid waterlogging'],
    fertilizers: ['Farmyard manure', 'NPK 15:15:15'],
    harvestTime: '90–120 days', emoji: '🥔',
  },
  {
    name: 'Ginger', confidence: 79, expectedYield: '15 t/ha', expectedProfit: '₹3.5 L/ha',
    growingTips: ['Raised beds with good drainage', 'Partial shade ideal', 'Mulch heavily'],
    fertilizers: ['Neem cake', 'Vermicompost', 'Potash'],
    harvestTime: '8–10 months', emoji: '🫚',
  },
];

export type DiseaseInfo = {
  name: string;
  confidence: number;
  symptoms: string[];
  treatment: string[];
  medicines: string[];
  organic: string[];
  prevention: string[];
};

export const diseaseDatabase: Record<string, DiseaseInfo> = {
  early_blight: {
    name: 'Early Blight (Alternaria solani)',
    confidence: 87,
    symptoms: ['Dark brown spots with concentric rings on leaves', 'Yellowing around lesions', 'Lower leaves affected first'],
    treatment: ['Remove infected leaves', 'Apply copper-based fungicide', 'Improve air circulation'],
    medicines: ['Mancozeb 0.2%', 'Chlorothalonil', 'Copper oxychloride'],
    organic: ['Neem oil spray (5ml/L)', 'Baking soda + soap solution', 'Compost tea foliar spray'],
    prevention: ['Crop rotation', 'Avoid overhead watering', 'Use disease-free seed tubers'],
  },
  late_blight: {
    name: 'Late Blight (Phytophthora infestans)',
    confidence: 91,
    symptoms: ['Water-soaked lesions on leaves', 'White mold on underside', 'Rapid browning and collapse'],
    treatment: ['Destroy infected plants', 'Apply systemic fungicide immediately', 'Avoid working in wet fields'],
    medicines: ['Metalaxyl + Mancozeb', 'Cymoxanil', 'Dimethomorph'],
    organic: ['Copper spray weekly', 'Garlic + chili extract', 'Trichoderma viride application'],
    prevention: ['Plant resistant varieties', 'Ensure good drainage', 'Monitor humidity levels'],
  },
  leaf_spot: {
    name: 'Leaf Spot (Cercospora)',
    confidence: 84,
    symptoms: ['Small circular spots with grey centers', 'Brown margins', 'Premature leaf drop'],
    treatment: ['Remove affected foliage', 'Apply fungicide at first sign', 'Reduce humidity'],
    medicines: ['Carbendazim', 'Azoxystrobin', 'Thiophanate-methyl'],
    organic: ['Bordeaux mixture', 'Cow urine spray (diluted 1:10)', 'Pseudomonas fluorescens'],
    prevention: ['Space plants adequately', 'Sanitize tools', 'Avoid nitrogen excess'],
  },
  healthy: {
    name: 'Healthy Leaf',
    confidence: 96,
    symptoms: ['No visible lesions or discoloration', 'Uniform green coloration', 'Turgid texture'],
    treatment: ['No treatment needed', 'Continue regular monitoring', 'Maintain balanced nutrition'],
    medicines: [],
    organic: ['Weekly compost tea foliar feed', 'Seaweed extract for immunity'],
    prevention: ['Maintain crop rotation', 'Balanced NPK fertilization', 'Regular field scouting'],
  },
};

export type Scheme = {
  name: string;
  category: string;
  eligibility: string;
  benefits: string;
  documents: string[];
  link: string;
  emoji: string;
};

export const governmentSchemes: Scheme[] = [
  {
    name: 'PM Kisan Samman Nidhi',
    category: 'Income Support',
    eligibility: 'Small & marginal farmers holding cultivable land',
    benefits: '₹6,000/year in three installments directly to bank account',
    documents: ['Aadhaar', 'Land records', 'Bank account details'],
    link: 'https://pmkisan.gov.in',
    emoji: '💰',
  },
  {
    name: 'Pradhan Mantri Fasal Bima Yojana',
    category: 'Crop Insurance',
    eligibility: 'All farmers growing notified crops in notified areas',
    benefits: 'Crop loss insurance coverage with low premium (1.5–2%)',
    documents: ['Land documents', 'Sowing certificate', 'Bank details'],
    link: 'https://pmfby.gov.in',
    emoji: '🛡️',
  },
  {
    name: 'Soil Health Card Scheme',
    category: 'Soil Testing',
    eligibility: 'All farmers across India',
    benefits: 'Free soil health card with nutrient status and fertilizer recommendation',
    documents: ['Land records', 'Identity proof'],
    link: 'https://soilhealth.dac.gov.in',
    emoji: '🧪',
  },
  {
    name: 'Micro Irrigation Fund',
    category: 'Irrigation',
    eligibility: 'Farmers adopting drip/sprinkler irrigation in hilly areas',
    benefits: 'Subsidy up to 55% for drip & sprinkler systems',
    documents: ['Land records', 'Quotation from approved supplier', 'Bank details'],
    link: 'https://agricoop.gov.in',
    emoji: '💧',
  },
  {
    name: 'Paramparagat Krishi Vikas Yojana',
    category: 'Organic Farming',
    eligibility: 'Farmer groups practicing organic farming',
    benefits: '₹50,000/ha for 3 years for organic inputs & certification',
    documents: ['Group registration', 'Land records', 'Organic plan'],
    link: 'https://pgsindia.gov.in',
    emoji: '🌾',
  },
  {
    name: 'Kisan Credit Card (KCC)',
    category: 'Credit',
    eligibility: 'All farmers including sharecroppers & tenant farmers',
    benefits: 'Short-term credit at 4% interest (with subvention) up to ₹3 lakh',
    documents: ['Land records', 'Identity proof', 'Bank account'],
    link: 'https://www.myscheme.gov.in/schemes/kcc',
    emoji: '💳',
  },
];

export const testimonials = [
  {
    name: 'Ramesh Kumar', role: 'Tea Farmer, Darjeeling', text: 'The disease detection feature saved my entire crop last season. I uploaded a photo and got treatment advice instantly.', rating: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Lakshmi Devi', role: 'Vegetable Grower, Ooty', text: 'Soil analysis recommendations helped me switch to organic fertilizer and increase my potato yield by 30%.', rating: 5,
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Tenzin Norbu', role: 'Cardamom Farmer, Sikkim', text: 'Weather alerts tell me exactly when to harvest and when to cover my crops. This app understands hill farming.', rating: 4,
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

export const faqs = [
  { q: 'Is the Smart Agriculture app free to use?', a: 'Yes, the core features — weather, soil analysis, crop recommendation, disease detection, and market prices — are completely free for all registered farmers.' },
  { q: 'How accurate is the AI disease detection?', a: 'Our model is trained on over 50,000 leaf images covering 14 common crop diseases with an average accuracy of 88%. Always cross-check with an agricultural extension officer for critical decisions.' },
  { q: 'Do I need internet to use the app?', a: 'The app works offline in a limited mode — cached weather data, saved reports, and irrigation controls remain accessible. Live updates require connectivity.' },
  { q: 'Which crops are supported for hilly regions?', a: 'We support tea, cardamom, potato, ginger, cabbage, tomato, wheat, maize, onion, and rice — crops commonly cultivated in hilly terrain across India.' },
  { q: 'Can I get market price alerts?', a: 'Yes. Once you register, you can subscribe to specific crops and receive daily price notifications for your nearest mandi.' },
];

export const stats = [
  { label: 'Happy Farmers', value: '12,400+', icon: 'Users' },
  { label: 'AI Accuracy', value: '88%', icon: 'BrainCircuit' },
  { label: 'Supported Crops', value: '24', icon: 'Sprout' },
  { label: 'Villages Covered', value: '186', icon: 'MapPin' },
];

export const benefits = [
  { title: 'Smart Irrigation', desc: 'Automated watering based on real-time soil moisture sensors to save water and boost yield.', icon: 'Droplets' },
  { title: 'Weather Prediction', desc: '7-day hyperlocal forecasts and frost/rain alerts tailored for hilly terrain microclimates.', icon: 'CloudSun' },
  { title: 'Disease Detection', desc: 'Upload a leaf photo and get instant diagnosis with treatment and organic remedies.', icon: 'ScanLine' },
  { title: 'AI Suggestions', desc: 'Crop, fertilizer, and irrigation recommendations powered by machine learning models.', icon: 'BrainCircuit' },
  { title: 'Market Prices', desc: 'Live mandi prices with trend graphs so you sell at the right time for maximum profit.', icon: 'LineChart' },
  { title: 'Government Schemes', desc: 'Discover and apply for subsidies, insurance, and credit schemes you are eligible for.', icon: 'Landmark' },
];

export const allFeatures = [
  { title: 'Weather Prediction', desc: '7-day forecasts, frost/rain alerts, and microclimate monitoring for hilly farms.', icon: 'CloudSun', image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Soil Monitoring', desc: 'Track NPK, pH, moisture, and temperature with sensor integration and manual input.', icon: 'Layers', image: 'https://images.pexels.com/photos/162809/farmer-field-rice-production-asia-162809.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Crop Recommendation', desc: 'AI suggests the best crops for your soil, climate, and season with yield projections.', icon: 'Sprout', image: 'https://images.pexels.com/photos/265232/pexels-photo-265232.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Disease Detection', desc: 'Snap a photo of any leaf and get disease name, confidence score, and treatment plan.', icon: 'ScanLine', image: 'https://images.pexels.com/photos/4503271/pexels-photo-4503271.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Market Price', desc: 'Real-time mandi prices with historical trends, search, and PDF export.', icon: 'LineChart', image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Pest Detection', desc: 'Identify common pests and get integrated pest management strategies.', icon: 'Bug', image: 'https://images.pexels.com/photos/5180189/pexels-photo-5180189.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Smart Irrigation', desc: 'Monitor tank levels, motor status, and automate watering schedules remotely.', icon: 'Droplets', image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Fertilizer Recommendation', desc: 'Get organic and chemical fertilizer plans with dosage and application timing.', icon: 'FlaskConical', image: 'https://images.pexels.com/photos/2932035/pexels-photo-2932035.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'AI Chatbot', desc: 'Ask any farming question and get instant, contextual answers with voice support.', icon: 'MessageSquare', image: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Farmer Dashboard', desc: 'Unified dashboard with stats, charts, calendar, and recent activity timeline.', icon: 'LayoutDashboard', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Analytics', desc: 'Yield analytics, profit tracking, and seasonal comparison reports.', icon: 'BarChart3', image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { title: 'Government Schemes', desc: 'Browse, filter, and apply for central & state agriculture schemes.', icon: 'Landmark', image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600' },
];
