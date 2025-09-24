import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Users, 
  Droplets, 
  Activity,
  AlertCircle,
  CheckCircle,
  WifiOff,
  TrendingUp
} from "lucide-react";

// Import the LanguageSwitcher component
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import TrendAnalysis from "@/components/ui/TrendAnalysis";

const CommunityLeaderDashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const communityMetrics = {
    totalWaterUsage: "45,230L",
    activeWells: 12,
    totalFarmers: 156,
    avgGroundwaterLevel: 58
  };

  const sensorData = [
  { id: "SW001", locationKey: "locations.northVillage", status: "Operational", level: 72, lastUpdate: "2 min ago" },
  { id: "SW002", locationKey: "locations.centralFields", status: "Operational", level: 65, lastUpdate: "1 min ago" },
  { id: "SW003", locationKey: "locations.southFarm", status: "Malfunctioning", level: 0, lastUpdate: "2 hours ago" },
  { id: "SW004", locationKey: "locations.eastQuarter", status: "Operational", level: 45, lastUpdate: "3 min ago" },
  { id: "SW005", locationKey: "locations.westFields", status: "Operational", level: 78, lastUpdate: "1 min ago" }
];


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Operational": return <CheckCircle className="w-4 h-4 text-success" />;
      case "Malfunctioning": return <WifiOff className="w-4 h-4 text-destructive" />;
      default: return <AlertCircle className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Operational": return <Badge className="bg-success text-success-foreground">{t('communityLeaderDashboard.sensors.status.operational')}</Badge>;
      case "Malfunctioning": return <Badge className="bg-destructive text-destructive-foreground">{t('communityLeaderDashboard.sensors.status.malfunctioning')}</Badge>;
      default: return <Badge variant="outline">{t('communityLeaderDashboard.sensors.status.unknown')}</Badge>;
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 70) return "text-success";
    if (level >= 40) return "text-warning";
    return "text-destructive";
  };

  const mockChartData = [
    { month: "Jan", level: 75 },
    { month: "Feb", level: 62 },
    { month: "Mar", level: 88 },
    { month: "Apr", level: 55 },
    { month: "May", level: 92 },
    { month: "Jun", level: 38 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('communityLeaderDashboard.back')}
          </Button>
          <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">{t('communityLeaderDashboard.title')}</h1>
          {/* Place LanguageSwitcher here */}
          <LanguageSwitcher />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-1 sm:grid-cols-3 gap-2 overflow-x-auto">
            <TabsTrigger value="overview">{t('communityLeaderDashboard.tabs.overview')}</TabsTrigger>
            <TabsTrigger value="trends">{t('communityLeaderDashboard.tabs.trends')}</TabsTrigger>
            <TabsTrigger value="sensors">{t('communityLeaderDashboard.tabs.sensors')}</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('communityLeaderDashboard.metrics.totalWaterUsage')}</CardTitle>
                  <Droplets className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.totalWaterUsage}</div>
                  <p className="text-xs text-muted-foreground">{t('communityLeaderDashboard.metrics.thisMonth')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('communityLeaderDashboard.metrics.activeWells')}</CardTitle>
                  <Activity className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.activeWells}</div>
                  <p className="text-xs text-muted-foreground">{t('communityLeaderDashboard.metrics.currentlyOperational')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('communityLeaderDashboard.metrics.totalFarmers')}</CardTitle>
                  <Users className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.totalFarmers}</div>
                  <p className="text-xs text-muted-foreground">{t('communityLeaderDashboard.metrics.registeredUsers')}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{t('communityLeaderDashboard.metrics.avgGroundwater')}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.avgGroundwaterLevel}%</div>
                  <p className="text-xs text-muted-foreground">{t('communityLeaderDashboard.metrics.communityAverage')}</p>
                </CardContent>
              </Card>
            </div>

            {/* Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>{t('communityLeaderDashboard.alerts.recentAlerts')}</CardTitle>
                <CardDescription>{t('communityLeaderDashboard.alerts.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium">{t('communityLeaderDashboard.alerts.sensorOffline', { id: "SW003" })}</p>
                      <p className="text-sm text-muted-foreground">{t('communityLeaderDashboard.alerts.offlineMessage', { location: "South Farm", time: "2 hours" })}</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium">{t('communityLeaderDashboard.alerts.lowWaterLevel', { location: "East Quarter" })}</p>
                      <p className="text-sm text-muted-foreground">{t('communityLeaderDashboard.alerts.lowWaterMessage', { level: 45, location: "East Quarter" })}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('communityLeaderDashboard.trends.title')}</CardTitle>
                <CardDescription>{t('communityLeaderDashboard.trends.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <TrendAnalysis data={mockChartData} />
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
                  {mockChartData.map((data) => (
                    <div key={data.month} className="space-y-1">
                      <div className="text-sm font-medium">{data.month}</div>
                      <div className={`text-lg font-bold ${getLevelColor(data.level)}`}>
                        {data.level}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          {/* Sensors */}
          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('communityLeaderDashboard.sensors.title')}</CardTitle>
                <CardDescription>{t('communityLeaderDashboard.sensors.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sensorData.map((sensor) => (
                    <div key={sensor.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(sensor.status)}
                        <div>
                          <h4 className="font-medium">{sensor.id}</h4>
                          <p className="text-sm text-muted-foreground">{t(`communityLeaderDashboard.${sensor.locationKey}`)}</p>

                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <div className="text-right">
                          <div className={`font-bold ${getLevelColor(sensor.level)}`}>
                            {sensor.level > 0 ? `${sensor.level}%` : "N/A"}
                          </div>
                          <div className="text-xs text-muted-foreground">{sensor.lastUpdate}</div>
                        </div>
                        {getStatusBadge(sensor.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityLeaderDashboard;
