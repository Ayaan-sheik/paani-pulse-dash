import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Users, BarChart3 } from "lucide-react";
import heroImage from "@/assets/paani-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const userRoles = [
    {
      title: "Farmer Dashboard",
      description: "Monitor groundwater levels and get smart irrigation recommendations",
      icon: Droplets,
      path: "/farmer",
      color: "text-primary"
    },
    {
      title: "Community Leader Dashboard", 
      description: "Oversee community water usage and sensor networks",
      icon: Users,
      path: "/community-leader",
      color: "text-accent"
    },
    {
      title: "Policymaker Dashboard",
      description: "Analyze regional water data and generate policy reports",
      icon: BarChart3,
      path: "/policymaker", 
      color: "text-success"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Water management technology" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center text-white space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
              PaaniConnect
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Smart Water Management for Sustainable Agriculture
            </p>
            <p className="text-base sm:text-lg text-white/80 max-w-3xl mx-auto">
              Monitor groundwater levels, optimize irrigation, and make data-driven decisions 
              for sustainable water resource management across farming communities.
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            Choose Your Dashboard
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Select your role to access tailored water management tools
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userRoles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.path} 
                className="hover:shadow-lg transition-shadow cursor-pointer group flex flex-col h-full"
              >
                <CardHeader className="text-center pb-2 flex-grow">
                  <div className="mx-auto mb-4 p-4 bg-secondary rounded-full w-fit flex items-center justify-center">
                    <IconComponent className={`w-8 h-8 ${role.color}`} />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-center text-sm sm:text-base">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 mt-auto">
                  <Button 
                    onClick={() => navigate(role.path)}
                    className="w-full group-hover:scale-105 transition-transform"
                    variant="outline"
                  >
                    Access Dashboard
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/50 py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base text-muted-foreground">
            Built for Smart India Hackathon 2025 - Empowering sustainable water management
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
