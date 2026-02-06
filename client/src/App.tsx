import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import ValentineWeekPage from "@/pages/valentine-week";
import AccessGate from "@/components/AccessGate";
import { hasAccess } from "@/lib/dateAccess";

function Router() {
  return (
    <Switch>
      <Route path="/" component={ValentineWeekPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Check if user has access based on date or admin override
  const userHasAccess = hasAccess();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Show access gate if outside Valentine Week and no admin override */}
        {!userHasAccess ? <AccessGate /> : <Router />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
