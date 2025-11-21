import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Download, 
  CheckCircle2,
  Clock,
  BarChart3,
  PieChart
} from "lucide-react";

const Analytics = () => {
  const stats = [
    { label: "Total Views", value: "2,847", change: "+12.5%", icon: Eye, trend: "up" },
    { label: "Completions", value: "1,923", change: "+8.2%", icon: CheckCircle2, trend: "up" },
    { label: "Active Users", value: "456", change: "+23.1%", icon: Users, trend: "up" },
    { label: "Avg. Duration", value: "8.4 min", change: "-2.3%", icon: Clock, trend: "down" },
  ];

  const trainingModules = [
    { name: "Workplace Safety 2025", views: 847, completions: 712, rate: 84 },
    { name: "Equipment Operation", views: 623, completions: 489, rate: 78 },
    { name: "Emergency Procedures", views: 512, completions: 456, rate: 89 },
    { name: "PPE Requirements", views: 489, completions: 423, rate: 87 },
    { name: "Hazard Identification", views: 376, completions: 298, rate: 79 },
  ];

  const exportFormats = [
    { format: "MP4 Video", downloads: 423, percentage: 38 },
    { format: "PDF Document", downloads: 367, percentage: 33 },
    { format: "PPT with Audio", downloads: 201, percentage: 18 },
    { format: "Training Poster", downloads: 123, percentage: 11 },
  ];

  const engagementData = [
    { day: "Mon", views: 145, completions: 112 },
    { day: "Tue", views: 189, completions: 156 },
    { day: "Wed", views: 234, completions: 198 },
    { day: "Thu", views: 198, completions: 167 },
    { day: "Fri", views: 256, completions: 223 },
    { day: "Sat", views: 89, completions: 71 },
    { day: "Sun", views: 67, completions: 54 },
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Training <span className="text-primary">Analytics</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Monitor engagement, completion rates, and training effectiveness
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-border hover:border-primary/40 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.trend === "up" ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <stat.icon className={`w-6 h-6 ${stat.trend === "up" ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <Badge
                    className={
                      stat.trend === "up"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground border-border"
                    }
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="modules" className="data-[state=active]:bg-primary/10">
              <BarChart3 className="w-4 h-4 mr-2" />
              Training Modules
            </TabsTrigger>
            <TabsTrigger value="engagement" className="data-[state=active]:bg-primary/10">
              <TrendingUp className="w-4 h-4 mr-2" />
              Weekly Engagement
            </TabsTrigger>
            <TabsTrigger value="exports" className="data-[state=active]:bg-primary/10">
              <PieChart className="w-4 h-4 mr-2" />
              Export Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Module Performance</CardTitle>
                <CardDescription>
                  View completion rates and engagement across all training modules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trainingModules.map((module, index) => (
                    <div key={index} className="p-4 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-lg">{module.name}</h4>
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {module.rate}% Complete
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Views:</span>
                          <span className="font-semibold">{module.views}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Completions:</span>
                          <span className="font-semibold">{module.completions}</span>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-accent h-2 rounded-full transition-all duration-300"
                          style={{ width: `${module.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Weekly Training Activity</CardTitle>
                <CardDescription>
                  View and completion trends over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {engagementData.map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold w-12">{data.day}</span>
                        <div className="flex gap-4">
                          <span className="text-muted-foreground">
                            <Eye className="w-4 h-4 inline mr-1" />
                            {data.views}
                          </span>
                          <span className="text-primary">
                            <CheckCircle2 className="w-4 h-4 inline mr-1" />
                            {data.completions}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-muted-foreground/50 h-full transition-all duration-300"
                            style={{ width: `${(data.views / 256) * 100}%` }}
                          />
                        </div>
                        <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                          <div
                            className="bg-gradient-accent h-full transition-all duration-300"
                            style={{ width: `${(data.completions / 256) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 mt-8 p-4 rounded-lg bg-muted/30 border border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted-foreground/50" />
                    <span className="text-sm">Views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary" />
                    <span className="text-sm">Completions</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exports" className="space-y-4">
            <Card className="bg-gradient-card border-border">
              <CardHeader>
                <CardTitle>Export Format Distribution</CardTitle>
                <CardDescription>
                  Most popular export formats by download count
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exportFormats.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Download className="w-5 h-5 text-primary" />
                          <span className="font-semibold">{item.format}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold">{item.downloads}</span>
                          <Badge className="bg-accent/10 text-accent border-accent/20">
                            {item.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className="bg-gradient-accent h-3 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">1,114</div>
                    <div className="text-sm text-muted-foreground">Total Downloads This Month</div>
                    <Badge className="mt-3 bg-primary/10 text-primary border-primary/20">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +18.5% from last month
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
