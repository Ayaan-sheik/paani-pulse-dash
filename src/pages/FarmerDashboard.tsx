import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

// Import the language switcher component
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const FarmerDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [groundwaterLevel] = useState(65); // Percentage

  const getWaterLevelStatus = (level: number) => {
    if (level >= 70) return { color: "success", status: t("farmerDashboard.status.safe"), icon: CheckCircle };
    if (level >= 40) return { color: "warning", status: t("farmerDashboard.status.caution"), icon: AlertTriangle };
    return { color: "destructive", status: t("farmerDashboard.status.critical"), icon: AlertTriangle };
  };

  const waterStatus = getWaterLevelStatus(groundwaterLevel);
  const StatusIcon = waterStatus.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("farmerDashboard.back")}
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
            {t("farmerDashboard.title")}
          </h1>
          {/* Replace language buttons with the LanguageSwitcher component */}
          <LanguageSwitcher />
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 sm:p-6 space-y-6">
        {/* Alerts Section */}
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{t("farmerDashboard.alerts.title")}</h2>
          <Alert className="border-warning bg-warning/10 flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <AlertDescription className="text-black">
              {t("farmerDashboard.alerts.irrigation")}
            </AlertDescription>
          </Alert>
        </div>

        {/* Current Groundwater Level */}
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
              <Gauge className="w-5 h-5 text-primary" />
              {t("farmerDashboard.groundwaterLevel")}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative mb-4">
              <div className="text-5xl sm:text-6xl font-bold text-primary mb-2">
                {groundwaterLevel}%
              </div>
              <Badge 
                variant="secondary" 
                className={`bg-${waterStatus.color} text-${waterStatus.color}-foreground inline-flex items-center gap-1`}
              >
                <StatusIcon className="w-4 h-4" />
                {waterStatus.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <Progress value={groundwaterLevel} className="h-3" />
              <div className="flex flex-col sm:flex-row justify-between text-sm text-muted-foreground mt-1 gap-1 sm:gap-0">
                <span>{t("farmerDashboard.groundwaterRanges.critical")}</span>
                <span>{t("farmerDashboard.groundwaterRanges.caution")}</span>
                <span>{t("farmerDashboard.groundwaterRanges.safe")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Irrigation Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Droplets className="w-5 h-5 text-accent" />
              {t("farmerDashboard.irrigation.title")}
            </CardTitle>
            <CardDescription>{t("farmerDashboard.irrigation.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-success/10 p-4 rounded-lg border border-success/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0">
                <div>
                  <h4 className="font-medium">{t("farmerDashboard.irrigation.fields.A.name")}</h4>
                  <p className="text-sm text-muted-foreground">{t("farmerDashboard.irrigation.fields.A.next")}</p>
                </div>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  {t("farmerDashboard.irrigation.fields.A.status")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("farmerDashboard.irrigation.fields.A.details")}
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2 sm:gap-0">
                <div>
                  <h4 className="font-medium">{t("farmerDashboard.irrigation.fields.B.name")}</h4>
                  <p className="text-sm text-muted-foreground">{t("farmerDashboard.irrigation.fields.B.next")}</p>
                </div>
                <Badge variant="outline">
                  {t("farmerDashboard.irrigation.fields.B.status")}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t("farmerDashboard.irrigation.fields.B.details")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Weather & Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <Calendar className="w-5 h-5 text-primary" />
              {t("farmerDashboard.tips.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <p className="text-sm">{t("farmerDashboard.tips.weather")}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <p className="text-sm">{t("farmerDashboard.tips.morningIrrigation")}</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <p className="text-sm">{t("farmerDashboard.tips.dripIrrigation")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
