import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, MapPin, QrCode, Phone, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppointmentStatus = () => {
  const navigate = useNavigate();

  const appointment = {
    id: "APT-2025-001234",
    status: "Confirmed",
    date: "January 15, 2025",
    time: "10:00 AM - 11:00 AM",
    center: "Collectorate Office, Mumbai",
    purpose: "Certificate Application",
    token: "A-045",
    officer: "Shri Rajesh Kumar",
    phone: "+91 22 1234 5678",
  };

  const statusSteps = [
    { label: "Booking Submitted", completed: true },
    { label: "Appointment Confirmed", completed: true },
    { label: "Visit Scheduled", completed: true },
    { label: "Service Completed", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-light via-background to-gov-green-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-foreground">Appointment Status</h1>
                <p className="text-sm text-muted-foreground">Track your booking progress</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Status Overview */}
          <Card className="shadow-elevated">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Appointment #{appointment.id}</CardTitle>
                  <CardDescription>Your appointment details and current status</CardDescription>
                </div>
                <Badge 
                  variant="default"
                  className="bg-gov-green text-white"
                >
                  {appointment.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-saffron" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date</p>
                      <p className="font-semibold">{appointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-saffron" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Time</p>
                      <p className="font-semibold">{appointment.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-saffron" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Center</p>
                      <p className="font-semibold">{appointment.center}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-saffron to-gov-green p-6 rounded-lg text-white text-center">
                    <QrCode className="w-16 h-16 mx-auto mb-3" />
                    <p className="text-sm opacity-90">Your Token Number</p>
                    <p className="text-3xl font-bold">{appointment.token}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Assigned Officer:</span> {appointment.officer}</p>
                  <p><span className="font-medium">Contact Number:</span> {appointment.phone}</p>
                  <p><span className="font-medium">Purpose:</span> {appointment.purpose}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Progress</CardTitle>
              <CardDescription>Track the progress of your appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statusSteps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-gov-green text-white' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className={`flex-1 ${
                      step.completed ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      <p className="font-medium">{step.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Important Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-saffron">•</span>
                  <p>Please arrive 15 minutes before your scheduled time</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-saffron">•</span>
                  <p>Bring all required documents and a valid photo ID</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-saffron">•</span>
                  <p>Show this token number at the reception desk</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-saffron">•</span>
                  <p>For any queries, call the center contact number mentioned above</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex-1">
              <Phone className="w-4 h-4 mr-2" />
              Call Center
            </Button>
            <Button variant="outline" className="flex-1">
              Reschedule Appointment
            </Button>
            <Button variant="destructive" className="flex-1">
              Cancel Appointment
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentStatus;