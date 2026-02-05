import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Calendar, 
  CheckCircle, 
  MapPin, 
  User,
  LogOut,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Chatbot from "@/components/Chatbot";

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut, isGuest } = useAuth();
  const { t } = useLanguage();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const serviceCards = [
    {
      title: t('mySchemes'),
      description: t('schemesDescription'),
      icon: Building2,
      path: "/schemes",
      color: "from-saffron to-primary",
    },
    {
      title: t('bookAppointment'),
      description: t('appointmentDescription'),
      icon: Calendar,
      path: "/book-appointment",
      color: "from-gov-green to-secondary",
    },
    {
      title: t('appointmentStatus'),
      description: t('statusDescription'),
      icon: CheckCircle,
      path: "/appointment-status",
      color: "from-nav-blue to-accent",
    },
    {
      title: t('nearbyCenters'),
      description: t('centersDescription'),
      icon: MapPin,
      path: "/nearby-centers",
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-light via-background to-gov-green-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-saffron to-gov-green rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{t('appName')}</h1>
                <p className="text-sm text-muted-foreground">{t('appSubtitle')}</p>
              </div>
              {isGuest && (
                <Badge variant="secondary" className="ml-2">
                  {t('guestMode')}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              {!isGuest && (
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              )}
              {isGuest ? (
                <Button size="sm" onClick={() => navigate("/login")}>
                  {t('login')}
                </Button>
              ) : (
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {t('welcome')}, {isGuest ? t('guest') : t('citizen')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('accessServices')}
          </p>
          {isGuest && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-orange-800">
                {t('guestModeMessage')}{" "}
                <Button variant="link" className="p-0 h-auto text-orange-600" onClick={() => navigate("/login")}>
                  {t('loginForFullAccess')}
                </Button>
              </p>
            </div>
          )}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {serviceCards.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-elevated transition-all duration-300 cursor-pointer border-0 overflow-hidden"
                onClick={() => navigate(service.path)}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('quickActions')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <User className="w-6 h-6" />
                <span className="text-sm">{t('profile')}</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Bell className="w-6 h-6" />
                <span className="text-sm">{t('notifications')}</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <Building2 className="w-6 h-6" />
                <span className="text-sm">{t('documents')}</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <MapPin className="w-6 h-6" />
                <span className="text-sm">{t('help')}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">{t('recentActivity')}</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <CheckCircle className="w-5 h-5 text-gov-green" />
                <div>
                  <p className="font-medium">{t('appointmentConfirmed')}</p>
                  <p className="text-sm text-muted-foreground">{t('appointmentConfirmedMessage')}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Building2 className="w-5 h-5 text-saffron" />
                <div>
                  <p className="font-medium">{t('newSchemeAvailable')}</p>
                  <p className="text-sm text-muted-foreground">{t('newSchemeMessage')}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      
      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;