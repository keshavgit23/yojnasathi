import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Filter, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Schemes = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const schemes = [
    {
      id: 1,
      title: "PM Kisan Samman Nidhi",
      description: "Financial assistance to farmers with landholding up to 2 hectares",
      amount: "₹6,000/year",
      eligibility: "Farmer",
      status: "Active",
      category: "Agriculture",
    },
    {
      id: 2,
      title: "Pradhan Mantri Awas Yojana",
      description: "Housing scheme for economically weaker sections",
      amount: "₹2.5 Lakh subsidy",
      eligibility: "Below Poverty Line",
      status: "Open",
      category: "Housing",
    },
    {
      id: 3,
      title: "Maharashtra Employment Guarantee",
      description: "Guaranteed employment for rural households",
      amount: "₹250/day",
      eligibility: "Rural Resident",
      status: "Active",
      category: "Employment",
    },
    {
      id: 4,
      title: "Beti Bachao Beti Padhao",
      description: "Scheme for girl child education and empowerment",
      amount: "Education support",
      eligibility: "Girl Child",
      status: "Open",
      category: "Education",
    },
  ];

  const filteredSchemes = schemes.filter(scheme =>
    scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-xl font-bold text-foreground">My Schemes</h1>
                <p className="text-sm text-muted-foreground">Personalized government schemes</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} className="hover:shadow-elevated transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{scheme.title}</CardTitle>
                    <CardDescription className="text-base">
                      {scheme.description}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={scheme.status === "Active" ? "default" : "secondary"}
                    className="shrink-0"
                  >
                    {scheme.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Benefit Amount</p>
                    <p className="text-lg font-semibold text-gov-green">{scheme.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Eligibility</p>
                    <p className="font-medium">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Category</p>
                    <Badge variant="outline">{scheme.category}</Badge>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1">
                    Apply Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No schemes found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Schemes;