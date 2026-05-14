// ── KisanAI Multilingual Dictionary ─────────────────────────────
// Supports: en (English), kn (Kannada), hi (Hindi)

export type LangCode = 'en' | 'kn' | 'hi';

const translations: Record<string, Record<LangCode, string>> = {
  // ── Navigation ──
  'nav.home':           { en: 'Home',             kn: 'ಮುಖಪುಟ',           hi: 'होम' },
  'nav.scan':           { en: 'Scan',             kn: 'ಸ್ಕ್ಯಾನ್',           hi: 'स्कैन' },
  'nav.yield':          { en: 'Yield',            kn: 'ಇಳುವರಿ',           hi: 'उपज' },
  'nav.more':           { en: 'More',             kn: 'ಇನ್ನಷ್ಟು',          hi: 'और' },
  'nav.library':        { en: 'Library',          kn: 'ಲೈಬ್ರರಿ',           hi: 'पुस्तकालय' },
  'nav.marketplace':    { en: 'Marketplace',      kn: 'ಮಾರುಕಟ್ಟೆ',        hi: 'बाज़ार' },
  'nav.chat':           { en: 'Chat',             kn: 'ಚಾಟ್',             hi: 'चैट' },
  'nav.settings':       { en: 'Settings',         kn: 'ಸೆಟ್ಟಿಂಗ್ಸ್',        hi: 'सेटिंग्स' },

  // ── Dashboard ──
  'dash.greeting':      { en: 'Good Morning, Farmer 👋',  kn: 'ಶುಭೋದಯ, ರೈತರೇ 👋',  hi: 'सुप्रभात, किसान 👋' },
  'dash.quickActions':  { en: 'Quick Actions',    kn: 'ತ್ವರಿತ ಕ್ರಿಯೆಗಳು',  hi: 'त्वरित कार्य' },
  'dash.recentScans':   { en: 'Recent Scans',     kn: 'ಇತ್ತೀಚಿನ ಸ್ಕ್ಯಾನ್',  hi: 'हालिया स्कैन' },
  'dash.viewAll':       { en: 'View All',         kn: 'ಎಲ್ಲಾ ನೋಡಿ',        hi: 'सभी देखें' },
  'dash.aiInsight':     { en: 'AI Insight',       kn: 'AI ಒಳನೋಟ',         hi: 'AI अंतर्दृष्टि' },
  'dash.scanCrop':      { en: 'Scan Crop',        kn: 'ಬೆಳೆ ಸ್ಕ್ಯಾನ್',      hi: 'फसल स्कैन' },
  'dash.diseaseMap':    { en: 'Disease Map',      kn: 'ರೋಗ ನಕ್ಷೆ',         hi: 'रोग मानचित्र' },
  'dash.healthTrack':   { en: 'Health Track',     kn: 'ಆರೋಗ್ಯ ಟ್ರ್ಯಾಕ್',     hi: 'स्वास्थ्य ट्रैक' },
  'dash.yieldPredict':  { en: 'Yield Predict',    kn: 'ಇಳುವರಿ ಅಂದಾಜು',    hi: 'उपज अनुमान' },

  // ── Scan Page ──
  'scan.title':         { en: 'Scan Crop',        kn: 'ಬೆಳೆ ಸ್ಕ್ಯಾನ್',      hi: 'फसल स्कैन' },
  'scan.takePhoto':     { en: 'Take or Upload Photo',  kn: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',  hi: 'फोटो लें या अपलोड करें' },
  'scan.camera':        { en: 'Camera',           kn: 'ಕ್ಯಾಮೆರಾ',           hi: 'कैमरा' },
  'scan.gallery':       { en: 'Gallery',          kn: 'ಗ್ಯಾಲರಿ',            hi: 'गैलरी' },
  'scan.voiceDiagnosis':{ en: 'Use Voice Diagnosis', kn: 'ಧ್ವನಿ ರೋಗನಿರ್ಣಯ',  hi: 'वॉयस निदान' },
  'scan.supported':     { en: 'Supported Crops',  kn: 'ಬೆಂಬಲಿತ ಬೆಳೆಗಳು',   hi: 'समर्थित फसलें' },
  'scan.tipTitle':      { en: 'For best results...', kn: 'ಉತ್ತಮ ಫಲಿತಾಂಶಕ್ಕಾಗಿ...', hi: 'बेहतर परिणाम के लिए...' },
  'scan.tipBody':       { en: 'Ensure the plant is well-lit, the focus is sharp on the affected area, and there is minimal background clutter.',
                          kn: 'ಗಿಡವು ಚೆನ್ನಾಗಿ ಬೆಳಕಿದೆ ಎಂದು ಖಚಿತಪಡಿಸಿ, ಪೀಡಿತ ಪ್ರದೇಶದ ಮೇಲೆ ಫೋಕಸ್ ಮಾಡಿ.',
                          hi: 'सुनिश्चित करें कि पौधा अच्छी रोशनी में है, प्रभावित क्षेत्र पर फोकस तेज है।' },
  'scan.analyse':       { en: 'Analyse Crop',     kn: 'ಬೆಳೆ ವಿಶ್ಲೇಷಿಸಿ',   hi: 'फसल का विश्लेषण करें' },
  'scan.selectImage':   { en: 'Please select an image', kn: 'ದಯವಿಟ್ಟು ಚಿತ್ರ ಆಯ್ಕೆಮಾಡಿ', hi: 'कृपया एक छवि चुनें' },
  'scan.fileHint':      { en: 'PNG, JPG or JPEG up to 10MB', kn: 'PNG, JPG ಅಥವಾ JPEG 10MB ವರೆಗೆ', hi: 'PNG, JPG या JPEG 10MB तक' },

  // ── Analyzing Page ──
  'analyzing.title':    { en: 'Analysing...',     kn: 'ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...', hi: 'विश्लेषण हो रहा है...' },
  'analyzing.heading':  { en: 'AI is analysing your crop', kn: 'AI ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತಿದೆ', hi: 'AI आपकी फसल का विश्लेषण कर रहा है' },
  'analyzing.scanning': { en: 'Scanning for 38 possible diseases...', kn: '38 ಸಂಭಾವ್ಯ ರೋಗಗಳಿಗಾಗಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗುತ್ತಿದೆ...', hi: '38 संभावित बीमारियों की जांच...' },
  'analyzing.step1':    { en: 'Image uploaded',    kn: 'ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಆಗಿದೆ', hi: 'छवि अपलोड हुई' },
  'analyzing.step2':    { en: 'Preprocessing image', kn: 'ಚಿತ್ರ ಸಂಸ್ಕರಣೆ',    hi: 'छवि प्रोसेसिंग' },
  'analyzing.step3':    { en: 'Running detection',  kn: 'ಪತ್ತೆ ನಡೆಯುತ್ತಿದೆ',  hi: 'पहचान चल रही है' },
  'analyzing.step4':    { en: 'Generating treatment', kn: 'ಚಿಕಿತ್ಸೆ ರಚಿಸಲಾಗುತ್ತಿದೆ', hi: 'उपचार तैयार हो रहा है' },
  'analyzing.footer':   { en: 'This usually takes 3–5 seconds', kn: 'ಇದು ಸಾಮಾನ್ಯವಾಗಿ 3-5 ಸೆಕೆಂಡ್ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ', hi: 'इसमें आमतौर पर 3-5 सेकंड लगते हैं' },

  // ── Result Pages ──
  'result.title':       { en: 'Analysis Result',  kn: 'ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶ', hi: 'विश्लेषण परिणाम' },
  'result.healthy':     { en: 'Plant is Healthy! 🎉', kn: 'ಗಿಡ ಆರೋಗ್ಯಕರ! 🎉',  hi: 'पौधा स्वस्थ है! 🎉' },
  'result.confident':   { en: 'Confident',        kn: 'ವಿಶ್ವಾಸ',            hi: 'विश्वास' },
  'result.careTips':    { en: 'Care Tips',         kn: 'ಆರೈಕೆ ಸಲಹೆಗಳು',     hi: 'देखभाल सुझाव' },
  'result.hearLocal':   { en: 'Hear Care Tips in Local Language', kn: 'ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ಸಲಹೆ ಕೇಳಿ', hi: 'स्थानीय भाषा में सुझाव सुनें' },
  'result.scanAnother': { en: 'Scan Another Crop', kn: 'ಇನ್ನೊಂದು ಬೆಳೆ ಸ್ಕ್ಯಾನ್', hi: 'और फसल स्कैन करें' },
  'result.detected':    { en: 'Detected',          kn: 'ಪತ್ತೆಯಾಗಿದೆ',       hi: 'पता चला' },
  'result.actionReq':   { en: 'Action required immediately', kn: 'ತಕ್ಷಣ ಕ್ರಮ ಅಗತ್ಯ', hi: 'तुरंत कार्रवाई आवश्यक' },
  'result.match':       { en: 'Match',             kn: 'ಹೊಂದಾಣಿಕೆ',         hi: 'मिलान' },
  'result.severity':    { en: 'Severity Level',    kn: 'ತೀವ್ರತೆ ಮಟ್ಟ',       hi: 'गंभीरता स्तर' },
  'result.treatment':   { en: 'Treatment Plan',    kn: 'ಚಿಕಿತ್ಸಾ ಯೋಜನೆ',    hi: 'उपचार योजना' },
  'result.step':        { en: 'Step',              kn: 'ಹಂತ',               hi: 'चरण' },
  'result.hearDiag':    { en: 'Hear Diagnosis in Local Language', kn: 'ಸ್ಥಳೀಯ ಭಾಷೆಯಲ್ಲಿ ರೋಗನಿರ್ಣಯ ಕೇಳಿ', hi: 'स्थानीय भाषा में निदान सुनें' },
  'result.share':       { en: 'Share Result',      kn: 'ಫಲಿತಾಂಶ ಹಂಚಿ',      hi: 'परिणाम साझा करें' },

  // ── Voice Diagnosis ──
  'voice.title':        { en: 'Voice Diagnosis',   kn: 'ಧ್ವನಿ ರೋಗನಿರ್ಣಯ',   hi: 'वॉइस निदान' },
  'voice.listening':    { en: 'Listening...',       kn: 'ಕೇಳುತ್ತಿದೆ...',      hi: 'सुन रहा है...' },
  'voice.tapToSpeak':   { en: 'Tap mic to speak',  kn: 'ಮಾತನಾಡಲು ಮೈಕ್ ಒತ್ತಿ', hi: 'बोलने के लिए माइक दबाएं' },
  'voice.speakHint':    { en: 'Speak your crop problem in Kannada or Hindi', kn: 'ನಿಮ್ಮ ಬೆಳೆ ಸಮಸ್ಯೆಯನ್ನು ಕನ್ನಡದಲ್ಲಿ ಹೇಳಿ', hi: 'अपनी फसल की समस्या हिंदी में बोलें' },
  'voice.youSaid':      { en: 'You said:',         kn: 'ನೀವು ಹೇಳಿದ್ದು:',     hi: 'आपने कहा:' },
  'voice.analyseBtn':   { en: 'Analyse What I Said', kn: 'ನಾನು ಹೇಳಿದ್ದನ್ನು ವಿಶ್ಲೇಷಿಸಿ', hi: 'जो मैंने कहा उसका विश्लेषण करें' },
  'voice.typeInstead':  { en: 'Type Instead',      kn: 'ಬದಲಿಗೆ ಟೈಪ್ ಮಾಡಿ',  hi: 'इसके बजाय टाइप करें' },
  'voice.noSpeech':     { en: 'Could not hear you. Please try again.', kn: 'ನಿಮ್ಮನ್ನು ಕೇಳಲಾಗಲಿಲ್ಲ.', hi: 'आपको सुन नहीं पाया। कृपया पुनः प्रयास करें।' },

  // ── Yield Page ──
  'yield.title':        { en: 'Yield Predictor',   kn: 'ಇಳುವರಿ ಅಂದಾಜು',     hi: 'उपज अनुमान' },
  'yield.subtitle':     { en: 'Estimate your harvest with precision using AI-driven insights.', kn: 'AI ಒಳನೋಟಗಳನ್ನು ಬಳಸಿ ನಿಮ್ಮ ಸುಗ್ಗಿಯನ್ನು ನಿಖರವಾಗಿ ಅಂದಾಜಿಸಿ.', hi: 'AI-संचालित अंतर्दृष्टि से अपनी फसल का सटीक अनुमान लगाएं।' },
  'yield.selectCrop':   { en: 'Select Crop',       kn: 'ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ',     hi: 'फसल चुनें' },
  'yield.district':     { en: 'District',          kn: 'ಜಿಲ್ಲೆ',             hi: 'जिला' },
  'yield.soilType':     { en: 'Soil Type',         kn: 'ಮಣ್ಣಿನ ಪ್ರಕಾರ',      hi: 'मिट्टी का प्रकार' },
  'yield.season':       { en: 'Season',            kn: 'ಋತು',               hi: 'मौसम' },
  'yield.rainfall':     { en: 'Expected Rainfall', kn: 'ನಿರೀಕ್ಷಿತ ಮಳೆ',      hi: 'अपेक्षित वर्षा' },
  'yield.farmArea':     { en: 'Farm Area (Acres)', kn: 'ಕೃಷಿ ಪ್ರದೇಶ (ಎಕರೆ)', hi: 'खेत का क्षेत्रफल (एकड़)' },
  'yield.predict':      { en: 'Predict Yield',     kn: 'ಇಳುವರಿ ಅಂದಾಜಿಸಿ',   hi: 'उपज अनुमान लगाएं' },
  'yield.calculating':  { en: 'Calculating...',    kn: 'ಲೆಕ್ಕ ಹಾಕಲಾಗುತ್ತಿದೆ...', hi: 'गणना हो रही है...' },
  'yield.resetForm':    { en: 'Reset Form',        kn: 'ಫಾರ್ಮ್ ರೀಸೆಟ್',      hi: 'फॉर्म रीसेट करें' },
  'yield.howItWorks':   { en: 'How it works',      kn: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ', hi: 'यह कैसे काम करता है' },
  'yield.resultTitle':  { en: 'Yield Result',      kn: 'ಇಳುವರಿ ಫಲಿತಾಂಶ',     hi: 'उपज परिणाम' },
  'yield.estYield':     { en: 'Estimated Yield',   kn: 'ಅಂದಾಜು ಇಳುವರಿ',     hi: 'अनुमानित उपज' },
  'yield.quintalsPerAcre': { en: 'Quintals / Acre', kn: 'ಕ್ವಿಂಟಾಲ್ / ಎಕರೆ', hi: 'क्विंटल / एकड़' },
  'yield.regionalComp': { en: 'Regional Comparison', kn: 'ಪ್ರಾದೇಶಿಕ ಹೋಲಿಕೆ', hi: 'क्षेत्रीय तुलना' },
  'yield.aboveAvg':     { en: 'above district average', kn: 'ಜಿಲ್ಲಾ ಸರಾಸರಿಗಿಂತ ಹೆಚ್ಚು', hi: 'जिला औसत से अधिक' },
  'yield.yourEst':      { en: 'Your Estimate',     kn: 'ನಿಮ್ಮ ಅಂದಾಜು',       hi: 'आपका अनुमान' },
  'yield.districtAvg':  { en: 'District Avg',      kn: 'ಜಿಲ್ಲಾ ಸರಾಸರಿ',       hi: 'जिला औसत' },
  'yield.inputParams':  { en: 'INPUT PARAMETERS',  kn: 'ಇನ್ಪುಟ್ ಪ್ಯಾರಾಮೀಟರ್ಗಳು', hi: 'इनपुट पैरामीटर' },
  'yield.aiInsights':   { en: 'KisanAI INSIGHTS',  kn: 'KisanAI ಒಳನೋಟಗಳು',   hi: 'KisanAI अंतर्दृष्टि' },
  'yield.tryDifferent': { en: 'Try Different Inputs', kn: 'ವಿಭಿನ್ನ ಇನ್ಪುಟ್ ಪ್ರಯತ್ನಿಸಿ', hi: 'अलग इनपुट आज़माएं' },

  // ── History Page ──
  'history.title':      { en: 'My Scan History',   kn: 'ನನ್ನ ಸ್ಕ್ಯಾನ್ ಇತಿಹಾಸ', hi: 'मेरा स्कैन इतिहास' },
  'history.total':      { en: 'Total',             kn: 'ಒಟ್ಟು',              hi: 'कुल' },
  'history.diseases':   { en: 'Diseases',          kn: 'ರೋಗಗಳು',            hi: 'रोग' },
  'history.healthy':    { en: 'Healthy',           kn: 'ಆರೋಗ್ಯಕರ',           hi: 'स्वस्थ' },
  'history.noScans':    { en: 'No scans yet. Scan your first crop!', kn: 'ಇನ್ನೂ ಸ್ಕ್ಯಾನ್ ಇಲ್ಲ. ನಿಮ್ಮ ಮೊದಲ ಬೆಳೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ!', hi: 'अभी तक कोई स्कैन नहीं। अपनी पहली फसल स्कैन करें!' },

  // ── Community ──
  'community.selection': { en: 'Current Selection',  kn: 'ಪ್ರಸ್ತುತ ಆಯ್ಕೆ',    hi: 'वर्तमान चयन' },
  'community.reports':   { en: 'Reports',           kn: 'ವರದಿಗಳು',          hi: 'रिपोर्ट' },
  'community.topThreat': { en: 'Top Threat',        kn: 'ಪ್ರಮುಖ ಅಪಾಯ',      hi: 'प्रमुख खतरा' },
  'community.warning':   { en: 'Spread Warning',     kn: 'ಹರಡುವಿಕೆಯ ಎಚ್ಚರಿಕೆ', hi: 'प्रसार की चेतावनी' },
  'community.protectBtn':{ en: 'Protect My Crops Now', kn: 'ನನ್ನ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಿ', hi: 'मेरी फसलों की रक्षा करें' },
  'community.risk':      { en: 'Outbreak Risk',     kn: 'ರೋಗದ ಹರಡುವಿಕೆಯ ಅಪಾಯ', hi: 'प्रकोप का जोखिम' },
  'community.high':      { en: 'High',              kn: 'ಹೆಚ್ಚು',            hi: 'उच्च' },
  'community.moderate':  { en: 'Moderate',          kn: 'ಮಧ್ಯಮ',            hi: 'मध्यम' },
  'community.safe':      { en: 'Safe',              kn: 'ಸುರಕ್ಷಿತ',         hi: 'सुरक्षित' },

  // ── Weather ──
  'weather.title':      { en: 'Weather Risk Alert', kn: 'ಹವಾಮಾನ ಅಪಾಯ ಎಚ್ಚರಿಕೆ', hi: 'मौसम जोखिम अलर्ट' },
  'weather.today':      { en: "Today's Conditions", kn: "ಇಂದಿನ ಪರಿಸ್ಥಿತಿ",   hi: 'आज की स्थिति' },
  'weather.temp':       { en: 'Temp',              kn: 'ತಾಪ',               hi: 'तापमान' },
  'weather.humidity':   { en: 'Humidity',           kn: 'ಆರ್ದ್ರತೆ',           hi: 'नमी' },
  'weather.rainfall':   { en: 'Rainfall',           kn: 'ಮಳೆ',              hi: 'वर्षा' },
  'weather.forecast':   { en: 'Disease Risk Forecast', kn: 'ರೋಗ ಅಪಾಯ ಮುನ್ಸೂಚನೆ', hi: 'रोग जोखिम पूर्वानुमान' },
  'weather.loading':    { en: 'Loading weather data...', kn: 'ಹವಾಮಾನ ಡೇಟಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...', hi: 'मौसम डेटा लोड हो रहा है...' },
  'weather.highRiskTitle': { en: 'HIGH DISEASE RISK', kn: 'ಹೆಚ್ಚಿನ ರೋಗದ ಅಪಾಯ', hi: 'उच्च रोग जोखिम' },
  'weather.blightIdentification': { en: 'Blight Identification', kn: 'ಬ್ಲೈಟ್ ಗುರುತಿಸುವಿಕೆ', hi: 'झुलसा रोग की पहचान' },
  'weather.learnToSpot': { en: 'Learn to spot signs before they spread.', kn: 'ಹರಡುವ ಮೊದಲು ಚಿಹ್ನೆಗಳನ್ನು ಗುರುತಿಸಲು ಕಲಿಯಿರಿ.', hi: 'फैलने से पहले संकेतों को पहचानना सीखें।' },
  'weather.applyFungicide': { en: 'Apply Fungicide Tonight', kn: 'ಇಂದು ರಾತ್ರಿ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಸಿಂಪಡಿಸಿ', hi: 'आज रात कवकनाशी लगाएं' },
  'weather.treatmentPlan': { en: 'See Treatment Plan', kn: 'ಚಿಕಿತ್ಸಾ ಯೋಜನೆಯನ್ನು ನೋಡಿ', hi: 'उपचार योजना देखें' },

  // ── Alerts ──
  'alerts.title':       { en: 'Alerts & Tips',     kn: 'ಎಚ್ಚರಿಕೆ & ಸಲಹೆ',   hi: 'अलर्ट और सुझाव' },
  'alerts.markRead':    { en: 'Mark all read',     kn: 'ಎಲ್ಲಾ ಓದಲಾಗಿದೆ',    hi: 'सभी पढ़ लिया' },
  'alerts.today':       { en: 'Today',             kn: 'ಇಂದು',              hi: 'आज' },
  'alerts.yesterday':   { en: 'Yesterday',         kn: 'ನಿನ್ನೆ',             hi: 'कल' },
  'alerts.weatherTitle': { en: 'Weather Forecast', kn: 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ', hi: 'मौसम पूर्वानुमान' },
  'alerts.cropRiskTitle': { en: 'Crop Health Risk', kn: 'ಬೆಳೆ ಆರೋಗ್ಯ ಅಪಾಯ', hi: 'फसल स्वास्थ्य जोखिम' },
  'alerts.viewDetails': { en: 'View Details',      kn: 'ವಿವರ ನೋಡಿ',         hi: 'विवरण देखें' },

  // ── Common ──
  'common.back':        { en: 'Back',              kn: 'ಹಿಂದೆ',             hi: 'पीछे' },
  'common.loading':     { en: 'Loading...',        kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',   hi: 'लोड हो रहा है...' },
  'common.error':       { en: 'Something went wrong', kn: 'ಏನೋ ತಪ್ಪಾಗಿದೆ',    hi: 'कुछ गलत हो गया' },
  'common.retry':       { en: 'Try Again',         kn: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',   hi: 'पुनः प्रयास करें' },
  'common.diseaseDetected': { en: 'Disease Detected', kn: 'ರೋಗ ಪತ್ತೆಯಾಗಿದೆ', hi: 'रोग का पता चला' },

  // ── Library ──
  'library.title':      { en: 'Disease Library',  kn: 'ರೋಗ ಲೈಬ್ರರಿ',       hi: 'रोग पुस्तकालय' },
  'library.search':     { en: 'Search disease or crop...', kn: 'ರೋಗ ಅಥವಾ ಬೆಳೆ ಹುಡುಕಿ...', hi: 'रोग या फसल खोजें...' },
  'library.all':        { en: 'All',              kn: 'ಎಲ್ಲಾ',             hi: 'सभी' },
  'library.showing':    { en: 'Showing {count} of {total} diseases', kn: '{total} ರೋಗಗಳಲ್ಲಿ {count} ತೋರಿಸಲಾಗುತ್ತಿದೆ', hi: '{total} रोगों में से {count} दिखा रहा है' },

  // ── Marketplace ──
  'marketplace.title':  { en: 'FarmDirect',        kn: 'ಫಾರ್ಮ್ ಡೈರೆಕ್ಟ್',     hi: 'फार्म डायरेक्ट' },
  'marketplace.buy':    { en: 'Buy Products',     kn: 'ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ', hi: 'उत्पाद खरीदें' },
  'marketplace.sell':   { en: 'Sell Products',    kn: 'ಉತ್ಪನ್ನಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ', hi: 'उत्पाद बेचें' },
  'marketplace.featured':{ en: 'Featured Products', kn: 'ವಿಶೇಷ ಉತ್ಪನ್ನಗಳು',     hi: 'विशेष उत्पाद' },

  // ── Chat ──
  'chat.title':         { en: 'AgriExpert Chat',  kn: 'ಕೃಷಿ ತಜ್ಞರ ಚಾಟ್',    hi: 'कृषि विशेषज्ञ चैट' },
  'chat.placeholder':   { en: 'Type your question...', kn: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...', hi: 'अपना प्रश्न लिखें...' },
  'chat.online':        { en: 'Online Experts',   kn: 'ಆನ್‌ಲೈನ್ ತಜ್ಞರು',     hi: 'ऑनलाइन विशेषज्ञ' },

  // ── Settings ──
  'settings.title':     { en: 'Settings',         kn: 'ಸೆಟ್ಟಿಂಗ್ಸ್',        hi: 'सेटिंग्स' },
  'settings.profile':   { en: 'Profile Settings', kn: 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್ಸ್', hi: 'प्रोफ़ाइल सेटिंग्स' },
  'settings.notifications': { en: 'Notifications',  kn: 'ಅಧಿಸೂಚನೆಗಳು',       hi: 'सूचनाएं' },
  'settings.help':      { en: 'Help & Support',   kn: 'ಸಹಾಯ ಮತ್ತು ಬೆಂಬಲ',    hi: 'सहायता और समर्थन' },
  'settings.logout':    { en: 'Logout',           kn: 'ಲಾಗ್ ಔಟ್',          hi: 'लॉग आउट' },
  'settings.about':     { en: 'About KisanAI',    kn: 'KisanAI ಬಗ್ಗೆ',       hi: 'KisanAI के बारे में' },
};

/**
 * Translate a key to the given language.
 * Falls back to English if the key/lang is missing.
 */
export function t(key: string, lang: LangCode = 'en'): string {
  return translations[key]?.[lang] ?? translations[key]?.en ?? key;
}

/**
 * React hook helper — returns a bound translate function.
 * Usage: const t = useT('kn');  t('nav.home') → 'ಮುಖಪುಟ'
 */
export function createT(lang: LangCode) {
  return (key: string) => t(key, lang);
}
