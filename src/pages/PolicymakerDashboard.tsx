import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Map, 
  BarChart3, 
  FileText,
  Download,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Activity
} from "lucide-react";

const PolicymakerDashboard = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");

  const regionalData = [
    { region: "Northern District", status: "Safe", level: 78, trend: "stable", extraction: 125, recharge: 140 },
    { region: "Central District", status: "Caution", level: 45, trend: "declining", extraction: 180, recharge: 160 },
    { region: "Southern District", status: "Critical", level: 32, trend: "declining", extraction: 220, recharge: 180 },
    { region: "Eastern District", status: "Safe", level: 65, trend: "improving", extraction: 150, recharge: 170 },
    { region: "Western District", status: "Caution", level: 48, trend: "stable", extraction: 175, recharge: 165 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Safe": return "bg-success text-success-foreground";
      case "Caution": return "bg-warning text-warning-foreground";
      case "Critical": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving": return <TrendingUp className="w-4 h-4 text-success" />;
      case "declining": return <TrendingDown className="w-4 h-4 text-destructive" />;
      case "stable": return <Activity className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleMapAreaClick = (areaName: string) => {
    setSelectedArea(areaName);
  };

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
          <h1 className="text-2xl font-bold">Policymaker Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="map" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">Regional Map</TabsTrigger>
            <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
            <TabsTrigger value="reports">Generate Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Interactive Map */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Map className="w-5 h-5 text-primary" />
                      Regional Groundwater Status Map
                    </CardTitle>
                    <CardDescription>Click on regions to view detailed analytics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
                      {/* Mock Interactive Map */}
                      <div className="absolute inset-4 grid grid-cols-3 grid-rows-2 gap-2">
                        {regionalData.map((region, index) => (
                          <button
                            key={region.region}
                            onClick={() => handleMapAreaClick(region.region)}
                            className={`
                              rounded-lg border-2 transition-all duration-200 hover:scale-105
                              ${region.status === 'Safe' ? 'bg-success/20 border-success hover:bg-success/30' : ''}
                              ${region.status === 'Caution' ? 'bg-warning/20 border-warning hover:bg-warning/30' : ''}
                              ${region.status === 'Critical' ? 'bg-destructive/20 border-destructive hover:bg-destructive/30' : ''}
                              ${selectedArea === region.region ? 'scale-105 shadow-lg' : ''}
                            `}
                          >
                            <div className="p-2 text-center">
                              <div className="text-xs font-medium">{region.region.split(' ')[0]}</div>
                              <div className="text-lg font-bold">{region.level}%</div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow">
                        <div className="text-xs font-medium mb-2">Legend</div>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-success rounded"></div>
                            <span>Safe (70%+)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-warning rounded"></div>
                            <span>Caution (40-70%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-destructive rounded"></div>
                            <span>Critical (0-40%)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics Panel */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Analysis</CardTitle>
                    <CardDescription>
                      {selectedArea ? `Showing data for ${selectedArea}` : "Select a region on the map"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedArea ? (
                      <div className="space-y-4">
                        {regionalData
                          .filter(region => region.region === selectedArea)
                          .map(region => (
                            <div key={region.region} className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Status</span>
                                <Badge className={getStatusColor(region.status)}>
                                  {region.status}
                                </Badge>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Groundwater Level</span>
                                  <span className="font-bold">{region.level}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Trend</span>
                                  <div className="flex items-center gap-1">
                                    {getTrendIcon(region.trend)}
                                    <span className="text-sm capitalize">{region.trend}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="border-t pt-4 space-y-2">
                                <div className="text-sm font-medium">Extraction vs Recharge</div>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm">Daily Extraction</span>
                                    <span className="font-mono">{region.extraction}ML</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-sm">Daily Recharge</span>
                                    <span className="font-mono">{region.recharge}ML</span>
                                  </div>
                                  <div className="flex justify-between border-t pt-2">
                                    <span className="text-sm font-medium">Net Balance</span>
                                    <span className={`font-mono font-bold ${
                                      region.recharge - region.extraction >= 0 ? 'text-success' : 'text-destructive'
                                    }`}>
                                      {region.recharge - region.extraction > 0 ? '+' : ''}
                                      {region.recharge - region.extraction}ML
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground py-8">
                        <Map className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Click on a region in the map to view detailed analytics</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="northern">Northern District</SelectItem>
                  <SelectItem value="central">Central District</SelectItem>
                  <SelectItem value="southern">Southern District</SelectItem>
                  <SelectItem value="eastern">Eastern District</SelectItem>
                  <SelectItem value="western">Western District</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Critical Regions</CardTitle>
                  <CardDescription>Areas requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-destructive">1</div>
                  <p className="text-sm text-muted-foreground">Southern District (32% level)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Average Depletion Rate</CardTitle>
                  <CardDescription>Region-wide groundwater decline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-warning">-2.3%</div>
                  <p className="text-sm text-muted-foreground">Per month (last 6 months)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Policy Impact Score</CardTitle>
                  <CardDescription>Effectiveness of current measures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-success">67</div>
                  <p className="text-sm text-muted-foreground">Moderate improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>High-Frequency Data Analysis</CardTitle>
                <CardDescription>Hourly extraction vs recharge patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Advanced Analytics Chart Placeholder</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Real-time extraction patterns and recharge analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Generate Custom Reports
                  </CardTitle>
                  <CardDescription>Create detailed policy reports and assessments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly Assessment</SelectItem>
                        <SelectItem value="quarterly">Quarterly Review</SelectItem>
                        <SelectItem value="annual">Annual Report</SelectItem>
                        <SelectItem value="emergency">Emergency Assessment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Regions to Include</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select regions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        <SelectItem value="critical">Critical Regions Only</SelectItem>
                        <SelectItem value="custom">Custom Selection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Previously generated policy reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Q2 2024 Water Assessment</h4>
                        <p className="text-sm text-muted-foreground">Generated on June 30, 2024</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Emergency Assessment - Southern District</h4>
                        <p className="text-sm text-muted-foreground">Generated on June 15, 2024</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">Monthly Assessment - May 2024</h4>
                        <p className="text-sm text-muted-foreground">Generated on May 31, 2024</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PolicymakerDashboard;