import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const CommunityLeaderDashboard = () => {
  const navigate = useNavigate();

  const communityMetrics = {
    totalWaterUsage: "45,230L",
    activeWells: 12,
    totalFarmers: 156,
    avgGroundwaterLevel: 58
  };

  const sensorData = [
    { id: "SW001", location: "North Village", status: "Operational", level: 72, lastUpdate: "2 min ago" },
    { id: "SW002", location: "Central Fields", status: "Operational", level: 65, lastUpdate: "1 min ago" },
    { id: "SW003", location: "South Farm", status: "Malfunctioning", level: 0, lastUpdate: "2 hours ago" },
    { id: "SW004", location: "East Quarter", status: "Operational", level: 45, lastUpdate: "3 min ago" },
    { id: "SW005", location: "West Fields", status: "Operational", level: 78, lastUpdate: "1 min ago" }
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
      case "Operational": return <Badge className="bg-success text-success-foreground">Operational</Badge>;
      case "Malfunctioning": return <Badge className="bg-destructive text-destructive-foreground">Offline</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 70) return "text-success";
    if (level >= 40) return "text-warning";
    return "text-destructive";
  };

  // Mock data for historical trends
  const mockChartData = [
    { month: "Jan", level: 65 },
    { month: "Feb", level: 62 },
    { month: "Mar", level: 58 },
    { month: "Apr", level: 55 },
    { month: "May", level: 52 },
    { month: "Jun", level: 58 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Community Leader Dashboard</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Community Overview</TabsTrigger>
            <TabsTrigger value="trends">Historical Trends</TabsTrigger>
            <TabsTrigger value="sensors">Sensor Network</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Community Overview Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
                  <Droplets className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.totalWaterUsage}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Wells</CardTitle>
                  <Activity className="h-4 w-4 text-accent" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.activeWells}</div>
                  <p className="text-xs text-muted-foreground">Currently operational</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
                  <Users className="h-4 w-4 text-success" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.totalFarmers}</div>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Groundwater</CardTitle>
                  <TrendingUp className="h-4 w-4 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{communityMetrics.avgGroundwaterLevel}%</div>
                  <p className="text-xs text-muted-foreground">Community average</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Community Alerts</CardTitle>
                <CardDescription>Important notifications for community water management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div>
                      <p className="font-medium ">Sensor SW003 Offline</p>
                      <p className="text-sm text-muted-foreground">South Farm sensor has been offline for 2 hours. Maintenance required.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                    <div>
                      <p className="font-medium">Low Water Level - East Quarter</p>
                      <p className="text-sm text-muted-foreground">Groundwater level at 45% in East Quarter. Consider water conservation measures.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Groundwater Trends</CardTitle>
                <CardDescription>6-month groundwater level trends across the community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive Chart Placeholder</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Showing declining trend from 65% (Jan) to 58% (Jun)
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-6 gap-4 text-center">
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

          <TabsContent value="sensors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Village Sensor Network</CardTitle>
                <CardDescription>Real-time status of all groundwater monitoring sensors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sensorData.map((sensor) => (
                    <div key={sensor.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(sensor.status)}
                        <div>
                          <h4 className="font-medium">{sensor.id}</h4>
                          <p className="text-sm text-muted-foreground">{sensor.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
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