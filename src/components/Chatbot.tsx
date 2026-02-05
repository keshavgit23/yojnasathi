import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic, Send, MessageCircle, X, Volume2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const defaultResponses = {
    en: {
      greeting: "Hello! I'm YojnaSathi, your digital assistant. I can help you with government schemes, appointments, and services. How can I assist you today?",
      farmer: "For farmer schemes, you can apply for PM-KISAN (₹6000/year), Crop Insurance, and Soil Health Card. Would you like to know the application process?",
      appointment: "To book an appointment: 1) Visit 'Book Appointment' tab 2) Select service type 3) Choose date & time 4) Provide required details. Need help with a specific service?",
      status: "To check appointment status: 1) Go to 'Appointment Status' tab 2) Enter your booking ID or mobile number 3) View current status. Do you have a booking ID?",
      centers: "You can find nearby CSC/eSeva centers in the 'Nearby Centers' tab. It will show locations, contact details, and available services. Which area are you looking for?",
      default: "I can help you with government schemes, booking appointments, checking status, and finding nearby centers. What would you like to know?"
    },
    mr: {
      greeting: "नमस्कार! मी योजना साथी आहे, तुमचा डिजिटल सहायक. मी तुम्हाला सरकारी योजना, भेटी आणि सेवांमध्ये मदत करू शकतो. आज मी तुमची कशी मदत करू शकतो?",
      farmer: "शेतकरी योजनांसाठी, तुम्ही पीएम-किसान (₹6000/वर्ष), पीक विमा, आणि मृदा आरोग्य कार्डसाठी अर्ज करू शकता. अर्जाची प्रक्रिया जाणून घ्यायची आहे का?",
      appointment: "भेट बुक करण्यासाठी: 1) 'भेट बुक करा' टॅबवर जा 2) सेवा प्रकार निवडा 3) दिनांक आणि वेळ निवडा 4) आवश्यक तपशील द्या. कोणत्या सेवेसाठी मदत हवी?",
      status: "भेटीचा स्टेटस तपासण्यासाठी: 1) 'भेटीचा स्टेटस' टॅबवर जा 2) तुमचा बुकिंग आयडी किंवा मोबाइल नंबर टाका 3) सध्याचा स्टेटस पहा. तुमच्याकडे बुकिंग आयडी आहे का?",
      centers: "तुम्ही 'जवळची केंद्रे' टॅबमध्ये जवळची सीएससी/ईसेवा केंद्रे शोधू शकता. यात स्थान, संपर्क तपशील आणि उपलब्ध सेवा दिसतील. कोणत्या भागासाठी शोधत आहात?",
      default: "मी तुम्हाला सरकारी योजना, भेट बुकिंग, स्टेटस तपासणे आणि जवळची केंद्रे शोधण्यात मदत करू शकतो. तुम्हाला काय जाणून घ्यायचे आहे?"
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: t('chatbotWelcome'),
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, t, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    const lang = t('language') === 'भाषा' ? 'mr' : 'en';
    const responses = defaultResponses[lang];

    if (message.includes('farmer') || message.includes('शेतकरी') || message.includes('किसान')) {
      return responses.farmer;
    }
    if (message.includes('appointment') || message.includes('भेट') || message.includes('book')) {
      return responses.appointment;
    }
    if (message.includes('status') || message.includes('स्टेटस') || message.includes('check')) {
      return responses.status;
    }
    if (message.includes('center') || message.includes('केंद्र') || message.includes('nearby')) {
      return responses.centers;
    }
    return responses.default;
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = t('language') === 'भाषा' ? 'mr-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      recognition.start();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = t('language') === 'भाषा' ? 'mr-IN' : 'en-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50 ${isOpen ? 'hidden' : 'flex'}`}
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-xl z-50 bg-background border-border">
          <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t('chatbotTitle')}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[500px]">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      {!message.isUser && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-6 h-6 mt-1 opacity-60 hover:opacity-100"
                          onClick={() => speakText(message.text)}
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                      <p className="text-sm italic">{t('chatbotTyping')}</p>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Examples */}
            <div className="px-4 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">{t('chatbotExamples')}</p>
              <div className="flex flex-wrap gap-1">
                {[t('example1'), t('example2'), t('example3')].map((example, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2"
                    onClick={() => setInputValue(example)}
                  >
                    {example.length > 20 ? example.substring(0, 20) + '...' : example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chatbotPlaceholder')}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={startVoiceInput}
                  disabled={isListening}
                  className={isListening ? 'bg-red-100 text-red-600' : ''}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                <Button onClick={sendMessage} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;