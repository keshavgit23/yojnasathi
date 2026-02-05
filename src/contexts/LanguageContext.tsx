import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'mr' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // App Name
    appName: "YojnaSathi – Queue Free India",
    appSubtitle: "Citizen Portal",
    
    // Navigation
    mySchemes: "My Schemes",
    bookAppointment: "Book Appointment",
    appointmentStatus: "Appointment Status",
    nearbyCenters: "Nearby Centers",
    
    // Dashboard
    welcome: "Welcome",
    citizen: "Citizen",
    guest: "Guest",
    accessServices: "Access government services at your fingertips",
    guestMode: "Guest Mode",
    guestModeMessage: "You're browsing in guest mode. Some features may be limited.",
    loginForFullAccess: "Login for full access",
    
    // Service Descriptions
    schemesDescription: "View personalized government schemes",
    appointmentDescription: "Schedule visit to government centers",
    statusDescription: "Track your booking status",
    centersDescription: "Find government centers near you",
    
    // Quick Actions
    quickActions: "Quick Actions",
    profile: "Profile",
    notifications: "Notifications",
    documents: "Documents",
    help: "Help",
    
    // Recent Activity
    recentActivity: "Recent Activity",
    appointmentConfirmed: "Appointment Confirmed",
    appointmentConfirmedMessage: "Your appointment for Jan 15, 2025 is confirmed",
    newSchemeAvailable: "New Scheme Available",
    newSchemeMessage: "PM Kisan Scheme application is now open",
    
    // Login
    login: "Login",
    logout: "Logout",
    skipLogin: "Skip Login",
    continueAsGuest: "Continue as Guest",
    
    // Language
    language: "Language",
    english: "English",
    marathi: "मराठी",
    tamil: "தமிழ்",
    
    // Chatbot
    chatbotTitle: "YojnaSathi Assistant",
    chatbotWelcome: "Hello! I'm YojnaSathi, your digital assistant. I can help you with government schemes, appointments, and services. How can I assist you today?",
    chatbotPlaceholder: "Type your message or ask about government schemes...",
    chatbotVoiceInput: "Voice Input",
    chatbotSend: "Send",
    chatbotExamples: "Try asking:",
    example1: "What farmer schemes are available?",
    example2: "How to book appointment for ration card?",
    example3: "Show nearby CSC centers",
    example4: "Check my appointment status",
    chatbotTyping: "YojnaSathi is typing..."
  },
  mr: {
    // App Name
    appName: "योजना साथी – रांग मुक्त भारत",
    appSubtitle: "नागरिक पोर्टल",
    
    // Navigation
    mySchemes: "माझ्या योजना",
    bookAppointment: "भेटीचे वेळापत्रक",
    appointmentStatus: "भेटीची स्थिती",
    nearbyCenters: "जवळील केंद्रे",
    
    // Dashboard
    welcome: "स्वागत",
    citizen: "नागरिक",
    guest: "अतिथी",
    accessServices: "तुमच्या बोटांच्या टोकावर सरकारी सेवा मिळवा",
    guestMode: "अतिथी मोड",
    guestModeMessage: "तुम्ही अतिथी मोडमध्ये ब्राउझ करत आहात. काही वैशिष्ट्ये मर्यादित असू शकतात.",
    loginForFullAccess: "पूर्ण प्रवेशासाठी लॉगिन करा",
    
    // Service Descriptions
    schemesDescription: "वैयक्तिक सरकारी योजना पहा",
    appointmentDescription: "सरकारी केंद्रांमध्ये भेट नियोजित करा",
    statusDescription: "तुमच्या बुकिंगची स्थिती ट्रॅक करा",
    centersDescription: "तुमच्या जवळील सरकारी केंद्रे शोधा",
    
    // Quick Actions
    quickActions: "जलद क्रिया",
    profile: "प्रोफाइल",
    notifications: "सूचना",
    documents: "कागदपत्रे",
    help: "मदत",
    
    // Recent Activity
    recentActivity: "अलीकडील गतिविधी",
    appointmentConfirmed: "भेट पुष्ट झाली",
    appointmentConfirmedMessage: "१५ जानेवारी २०२५ साठी तुमची भेट पुष्ट झाली आहे",
    newSchemeAvailable: "नवीन योजना उपलब्ध",
    newSchemeMessage: "पीएम किसान योजना अर्जाची सुरुवात झाली आहे",
    
    // Login
    login: "लॉगिन",
    logout: "लॉगआउट",
    skipLogin: "लॉगिन वगळा",
    continueAsGuest: "अतिथी म्हणून सुरू ठेवा",
    
    // Language
    language: "भाषा",
    english: "English",
    marathi: "मराठी",
    tamil: "தமிழ்",
    
    // Chatbot
    chatbotTitle: "योजना साथी सहायक",
    chatbotWelcome: "नमस्कार! मी योजना साथी आहे, तुमचा डिजिटल सहायक. मी तुम्हाला सरकारी योजना, भेटी आणि सेवांमध्ये मदत करू शकतो. आज मी तुमची कशी मदत करू शकतो?",
    chatbotPlaceholder: "तुमचा संदेश टाइप करा किंवा सरकारी योजनांबद्दल विचारा...",
    chatbotVoiceInput: "आवाज इनपुट",
    chatbotSend: "पाठवा",
    chatbotExamples: "प्रश्न विचारून पहा:",
    example1: "शेतकऱ्यांसाठी कोणत्या योजना उपलब्ध आहेत?",
    example2: "रेशन कार्डसाठी भेट कशी बुक करावी?",
    example3: "जवळची सीएससी केंद्रे दाखवा",
    example4: "माझ्या भेटीचा स्टेटस पहा",
    chatbotTyping: "योजना साथी टाइप करत आहे..."
  },
  ta: {
    // App Name
    appName: "யோஜனாசாதி – வரிசை இல்லாத இந்தியா",
    appSubtitle: "குடிமக்கள் போர்டல்",
    
    // Navigation
    mySchemes: "எனது திட்டங்கள்",
    bookAppointment: "சந்திப்பு முன்பதிவு",
    appointmentStatus: "சந்திப்பு நிலை",
    nearbyCenters: "அருகிலுள்ள மையங்கள்",
    
    // Dashboard
    welcome: "வரவேற்கிறோம்",
    citizen: "குடிமகன்",
    guest: "விருந்தினர்",
    accessServices: "உங்கள் விரல் நுனியில் அரசாங்க சேவைகளை அணுகவும்",
    guestMode: "விருந்தினர் பயன்முறை",
    guestModeMessage: "நீங்கள் விருந்தினர் பயன்முறையில் உலாவுகிறீர்கள். சில அம்சங்கள் குறைவாக இருக்கலாம்.",
    loginForFullAccess: "முழு அணுகலுக்கு உள்நுழையவும்",
    
    // Service Descriptions
    schemesDescription: "தனிப்பயனாக்கப்பட்ட அரசாங்க திட்டங்களைப் பார்க்கவும்",
    appointmentDescription: "அரசாங்க மையங்களுக்கு வருகை திட்டமிடுங்கள்",
    statusDescription: "உங்கள் முன்பதிவு நிலையைக் கண்காணிக்கவும்",
    centersDescription: "உங்களுக்கு அருகில் உள்ள அரசாங்க மையங்களைக் கண்டறியவும்",
    
    // Quick Actions
    quickActions: "விரைவு செயல்கள்",
    profile: "சுயவிவரம்",
    notifications: "அறிவிப்புகள்",
    documents: "ஆவணங்கள்",
    help: "உதவி",
    
    // Recent Activity
    recentActivity: "சமீபத்திய செயல்பாடு",
    appointmentConfirmed: "சந்திப்பு உறுதிப்படுத்தப்பட்டது",
    appointmentConfirmedMessage: "ஜனவரி 15, 2025 அன்றுக்கான உங்கள் சந்திப்பு உறுதிப்படுத்தப்பட்டுள்ளது",
    newSchemeAvailable: "புதிய திட்டம் கிடைக்கிறது",
    newSchemeMessage: "பிஎம் கிசான் திட்ட விண்ணப்பம் இப்போது திறந்துள்ளது",
    
    // Login
    login: "உள்நுழையவும்",
    logout: "வெளியேறு",
    skipLogin: "உள்நுழைவைத் தவிர்க்கவும்",
    continueAsGuest: "விருந்தினராக தொடரவும்",
    
    // Language
    language: "மொழி",
    english: "English",
    marathi: "मराठी",
    tamil: "தமிழ்",
    
    // Chatbot
    chatbotTitle: "யோஜனாசாதி உதவியாளர்",
    chatbotWelcome: "வணக்கம்! நான் யோஜனாசாதி, உங்கள் டிஜிட்டல் உதவியாளர். அரசாங்க திட்டங்கள், சந்திப்புகள் மற்றும் சேவைகளில் நான் உங்களுக்கு உதவ முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    chatbotPlaceholder: "உங்கள் செய்தியைத் தட்டச்சு செய்யுங்கள் அல்லது அரசாங்க திட்டங்களைப் பற்றி கேளுங்கள்...",
    chatbotVoiceInput: "குரல் உள்ளீடு",
    chatbotSend: "அனுப்பு",
    chatbotExamples: "கேட்க முயற்சிக்கவும்:",
    example1: "விவசாயிகளுக்கு என்ன திட்டங்கள் கிடைக்கின்றன?",
    example2: "ரேஷன் கார்டுக்கு சந்திப்பை எப்படி பதிவு செய்வது?",
    example3: "அருகிலுள்ள CSC மையங்களைக் காட்டு",
    example4: "என் சந்திப்பு நிலையைச் சரிபார்க்கவும்",
    chatbotTyping: "யோஜனாசாதி தட்டச்சு செய்கிறது..."
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};