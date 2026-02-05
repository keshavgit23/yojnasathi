import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MapPin, Phone, Clock, Navigation, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NearbyCenters = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");

  const centers = [
    {
      id: 1,
      name: "Collectorate Office",
      address: "Main Road, Fort, Mumbai - 400001",
      distance: "2.3 km",
      phone: "+91 22 1234 5678",
      hours: "9:00 AM - 5:00 PM",
      services: ["Certificates", "Land Records", "Revenue Services"],
      rating: 4.2,
      status: "Open",
    },
    {
      id: 2,
      name: "Tehsil Office",
      address: "Station Road, Andheri West, Mumbai - 400058",
      distance: "4.1 km",
      phone: "+91 22 2345 6789",
      hours: "10:00 AM - 6:00 PM",
      services: ["Income Certificate", "Caste Certificate", "Residence Certificate"],
      rating: 3.8,
      status: "Open",
    },
    {
      id: 3,
      name: "Sub-Divisional Office",
      address: "Civil Lines, Borivali East, Mumbai - 400066",
      distance: "7.2 km",
      phone: "+91 22 3456 7890",
      hours: "9:30 AM - 5:30 PM",
      services: ["Marriage Registration", "Birth Certificate", "Death Certificate"],
      rating: 4.0,
      status: "Closed",
    },
    {
      id: 4,
      name: "Village Panchayat Office",
      address: "Village Square, Vasai West, Palghar - 401202",
      distance: "12.5 km",
      phone: "+91 250 234 5678",
      hours: "9:00 AM - 4:00 PM",
      services: ["Property Tax", "Water Connection", "Trade License"],
      rating: 3.5,
      status: "Open",
    },
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
                <h1 className="text-xl font-bold text-foreground">Nearby Centers</h1>
                <p className="text-sm text-muted-foreground">Find government centers near you</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Search */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Search Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter your location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="w-full">
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <Card className="h-80">
              <CardContent className="p-0 h-full">
                <div className="w-full h-full bg-gradient-to-br from-nav-blue-light to-gov-green-light rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-nav-blue mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
                    <p className="text-muted-foreground">Centers will be displayed on the map</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Centers List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Government Centers</h2>
            <Badge variant="secondary" className="text-sm">
              {centers.length} centers found
            </Badge>
          </div>

          <div className="grid gap-6">
            {centers.map((center) => (
              <Card key={center.id} className="hover:shadow-elevated transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">{center.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{center.address}</span>
                      </CardDescription>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge 
                        variant={center.status === "Open" ? "default" : "secondary"}
                        className={center.status === "Open" ? "bg-gov-green" : ""}
                      >
                        {center.status}
                      </Badge>
                      <p className="text-sm font-medium text-saffron">{center.distance}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{center.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{center.hours}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{center.rating}</span>
                    <span className="text-sm text-muted-foreground">rating</span>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Available Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {center.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button variant="outline" className="flex-1">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Center
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button className="flex-1" onClick={() => navigate("/book-appointment")}>
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NearbyCenters;