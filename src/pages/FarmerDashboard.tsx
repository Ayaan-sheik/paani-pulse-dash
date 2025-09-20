import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  Gauge
} from "lucide-react";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const [groundwaterLevel] = useState(65); // Percentage

  const getWaterLevelStatus = (level: number) => {
    if (level >= 70) return { color: "success", status: "Safe", icon: CheckCircle };
    if (level >= 40) return { color: "warning", status: "Caution", icon: AlertTriangle };
    return { color: "destructive", status: "Critical", icon: AlertTriangle };
  };

  const waterStatus = getWaterLevelStatus(groundwaterLevel);
  const StatusIcon = waterStatus.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold">Farmer Dashboard</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Alerts Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">Alerts</h2>
          <Alert className="border-warning bg-warning/10">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-black">
              Irrigation recommended for Field A - optimal soil moisture detected
            </AlertDescription>
          </Alert>
        </div>

        {/* Current Groundwater Level */}
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2">
              <Gauge className="w-5 h-5 text-primary" />
              Current Groundwater Level
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative mb-4">
              <div className="text-6xl font-bold text-primary mb-2">
                {groundwaterLevel}%
              </div>
              <Badge 
                variant="secondary" 
                className={`bg-${waterStatus.color} text-${waterStatus.color}-foreground`}
              >
                <StatusIcon className="w-4 h-4 mr-1" />
                {waterStatus.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Progress 
                value={groundwaterLevel} 
                className="h-3"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Critical (0-40%)</span>
                <span>Caution (40-70%)</span>
                <span>Safe (70%+)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Irrigation Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-accent" />
              Smart Irrigation Schedules
            </CardTitle>
            <CardDescription>AI-powered recommendations for optimal water usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium ">Field A - Wheat</h4>
                  <p className="text-sm text-muted-foreground">Next irrigation: Today 6:00 AM</p>
                </div>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  Ready
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Soil moisture: 25% • Recommended duration: 45 minutes
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">Field B - Rice</h4>
                  <p className="text-sm text-muted-foreground">Next irrigation: Tomorrow 5:30 AM</p>
                </div>
                <Badge variant="outline">
                  Scheduled
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Soil moisture: 60% • Recommended duration: 30 minutes
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weather & Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <p className="text-sm">Weather forecast shows no rain for next 3 days - maintain regular irrigation schedule</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm">Morning irrigation (5-7 AM) reduces water loss by evaporation</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <p className="text-sm">Consider drip irrigation for 20% water savings in Field A</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;