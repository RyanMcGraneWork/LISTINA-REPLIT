import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/ui/logo";
import { User, History, Save, CreditCard, LogOut, LayoutDashboard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AccountPage() {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [, setLocation] = useLocation();

  // Handle URL query parameter for tab selection
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Logo variant="white" size="md" />
          </Link>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/dashboard?tab=chat")}
              className="text-primary hover:bg-primary/10"
            >
              <LayoutDashboard className="mr-2.5 h-4 w-4" />
              Dashboard
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user?.username ? user.username[0].toUpperCase() : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-background border-primary/20">
                <DropdownMenuLabel className="flex items-center gap-2 text-primary">
                  <User className="h-4 w-4" />
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem onClick={() => setLocation("/account")} className="text-primary hover:bg-primary/10">
                  <User className="mr-2 h-4 w-4" />
                  Personal Details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation("/account?tab=subscription")} className="text-primary hover:bg-primary/10">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation("/account?tab=saved")} className="text-primary hover:bg-primary/10">
                  <Save className="mr-2 h-4 w-4" />
                  Saved Generations
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocation("/account?tab=history")} className="text-primary hover:bg-primary/10">
                  <History className="mr-2 h-4 w-4" />
                  History
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary/10" />
                <DropdownMenuItem onClick={() => logoutMutation.mutate()} className="text-primary hover:bg-primary/10">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <nav className="flex space-x-8 border-b border-primary/10">
            <button
              onClick={() => setActiveTab("personal")}
              className={`pb-4 text-lg relative ${
                activeTab === "personal"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Personal Details
            </button>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`pb-4 text-lg relative ${
                activeTab === "subscription"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Subscription
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`pb-4 text-lg relative ${
                activeTab === "saved"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Saved Generations
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-4 text-lg relative ${
                activeTab === "history"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              History
            </button>
          </nav>

          <div className="mt-8">
            {activeTab === "personal" && (
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Personal Details</h2>
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                        <div className="w-full h-full bg-primary/10 rounded-full" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" className="border-primary/20 text-primary">
                          Upload Profile Picture
                        </Button>
                        <Button variant="outline" className="border-primary/20 text-primary">
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8 space-y-6">
                      <div>
                        <label className="text-sm text-white mb-2 block">Full Name</label>
                        <Input placeholder="Type here..." className="bg-muted border-primary/20" />
                      </div>
                      <div>
                        <label className="text-sm text-white mb-2 block">Email address</label>
                        <Input 
                          value={user?.username} 
                          disabled 
                          className="bg-muted border-primary/20"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Email address cannot be modified</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Change your password</h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      You will receive an email with instructions regarding password change.
                    </p>
                    <Button variant="outline" className="border-primary/20 text-primary">
                      Change Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Close Account</h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      This action will permanently delete your account. This action is irreversible!
                    </p>
                    <Button variant="outline" className="border-primary/20 text-primary">
                      Close Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "subscription" && (
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Subscription</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-white mb-2 block">Plan</label>
                        <p className="text-muted-foreground">Free</p>
                      </div>
                      <div>
                        <label className="text-sm text-white mb-2 block">Billing Amount</label>
                        <p className="text-muted-foreground">$0/year</p>
                      </div>
                      <div>
                        <label className="text-sm text-white mb-2 block">Next Bill Date</label>
                        <p className="text-muted-foreground">-</p>
                      </div>
                      <div className="flex gap-4">
                        <Button variant="outline" className="border-primary/20 text-primary">
                          Change Subscription
                        </Button>
                        <Button variant="outline" className="border-primary/20 text-primary">
                          Cancel Subscription
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <div className="h-2 flex-1 bg-primary/20 rounded-full">
                          <div className="w-0 h-full bg-primary rounded-full" />
                        </div>
                        <span className="ml-2">0 of words used</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Payment Method</h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      You have no card associated with this account
                    </p>
                    <Button variant="outline" className="border-primary/20 text-primary">
                      Remove
                    </Button>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-white">Invoices</h2>
                    <div className="text-center py-8 text-muted-foreground">
                      No invoices found
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "saved" && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-white">Saved Generations</h2>
                  <div className="text-center py-8 text-muted-foreground">
                    No saved generations found
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "history" && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-6 text-white">History</h2>
                  <div className="text-center py-8 text-muted-foreground">
                    No history found
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}