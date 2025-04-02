import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Search, FileText, Bot, LogOut, User, History, Save, CreditCard, Loader2, Share2, Mail, Link2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import { Logo } from "@/components/ui/logo";
import { ShareButtons } from "@/components/ui/share-buttons";
import { PropertyPDF } from "@/components/ui/pdf-document";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { SiWhatsapp } from 'react-icons/si';
import { FloatingChat } from "@/components/ui/floating-chat";
import { DataDashboard } from "@/components/ui/data-dashboard";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function HomePage() {
  const { user, logoutMutation } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"recent" | "chat" | "info" | "valuation" | "data">("recent");
  const [, setLocation] = useLocation();

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = properties?.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [clientName, setClientName] = useState("");
  const [summaryTitle, setSummaryTitle] = useState("");
  const [preferences, setPreferences] = useState("");
  const [messageStyle, setMessageStyle] = useState("");
  const [cta, setCta] = useState("");
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [listingUrls, setListingUrls] = useState<string[]>([""]);

  const { toast } = useToast();

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const addUrlField = () => {
    setListingUrls([...listingUrls, ""]);
  };

  const removeUrlField = (index: number) => {
    if (listingUrls.length > 1) {
      const newUrls = listingUrls.filter((_, i) => i !== index);
      setListingUrls(newUrls);
    }
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...listingUrls];
    newUrls[index] = value;
    setListingUrls(newUrls);
  };

  const handleGenerateContent = async () => {
    if (!clientName || !summaryTitle || listingUrls.some(url => !url) || !preferences || !messageStyle || !cta) {
      setGeneratedContent("Please fill in all fields before generating content.");
      return;
    }

    setGeneratedContent("Generating summary..."); 

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientName,
          summaryTitle,
          preferences,
          messageStyle,
          cta,
          listingUrls
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data.generatedContent);
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedContent(error instanceof Error ? error.message : "Error generating content. Please try again later.");
    }
  };

  const handleShare = async (property: {title: string, price: string, features: string}, method: 'link' | 'email' | 'whatsapp') => {
    const propertyDetails = `${property.title}\n${property.price}\n${property.features}`;

    switch (method) {
      case 'link':
        try {
          await navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Link copied!",
            description: "Property link has been copied to clipboard",
          });
        } catch (err) {
          toast({
            title: "Failed to copy link",
            description: "Please try again",
            variant: "destructive",
          });
        }
        break;

      case 'email':
        const emailSubject = encodeURIComponent(property.title);
        const emailBody = encodeURIComponent(propertyDetails);
        window.open(`mailto:?subject=${emailSubject}&body=${emailBody}`);
        break;

      case 'whatsapp':
        const whatsappText = encodeURIComponent(propertyDetails);
        window.open(`https://wa.me/?text=${whatsappText}`);
        break;
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    setIsChatLoading(true);
    const newMessage: ChatMessage = { role: 'user', content: currentMessage };
    setChatMessages(prev => [...prev, newMessage]);
    setCurrentMessage("");

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...chatMessages, newMessage],
          context: "Help users find and understand property listings. Focus on their specific requirements and preferences."
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from AI",
        variant: "destructive"
      });
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black">
      <header className="border-b border-primary/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo variant="white" size="md" />

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setActiveTab("chat");
              }}
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="7" height="7" className="fill-current"/>
                <rect x="14" y="3" width="7" height="7" className="fill-current"/>
                <rect x="3" y="14" width="7" height="7" className="fill-current"/>
                <rect x="14" y="14" width="7" height="7" className="fill-current"/>
              </svg>
              Dashboard
            </button>
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

      <nav className="border-b border-primary/10 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8">
            <button
              onClick={() => setActiveTab("recent")}
              className={`relative py-4 flex flex-col items-center ${
                activeTab === "recent"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Search className="w-6 h-6 mb-2" />
              <span className="mt-1">Recent Listing</span>
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`relative py-4 flex flex-col items-center ${
                activeTab === "chat"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Bot className="w-6 h-6 mb-2" />
              <span className="mt-1">AI Search</span>
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`relative py-4 flex flex-col items-center ${
                activeTab === "info"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <FileText className="w-6 h-6 mb-2" />
              <span className="mt-1">Listing info URL</span>
            </button>
            <button
              onClick={() => setActiveTab("valuation")}
              className={`relative py-4 flex flex-col items-center ${
                activeTab === "valuation"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <CreditCard className="w-6 h-6 mb-2" />
              <span className="mt-1">Valuation</span>
            </button>
            <button
              onClick={() => setActiveTab("data")}
              className={`relative py-4 flex flex-col items-center ${
                activeTab === "data"
                  ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <FileText className="w-6 h-6 mb-2" />
              <span className="mt-1">Data</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeTab === "recent" && (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-xl text-center mb-4 text-white">Search for recent listing</h2>
              <div className="flex justify-center">
                <Input
                  placeholder="Begin with Search for recent listing"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-lg bg-muted border-primary/20 text-white placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {searchQuery && (
              <div className="mb-6 flex justify-center gap-2">
                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2">
                  Your Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="hover:text-primary">×</button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <Card key={i} className="animate-pulse bg-muted border-primary/20">
                    <CardContent className="h-[200px]" />
                  </Card>
                ))
              ) : filteredProperties?.map((property) => (
                <Link key={property.id} href={`/property/${property.id}`}>
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow border-primary/20 bg-muted hover:bg-muted/80">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <Search className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{property.title}</h3>
                          <p className="text-muted-foreground text-sm">{property.location}</p>
                        </div>
                      </div>
                      <div className="text-primary font-bold mb-2">${property.price.toLocaleString()}</div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{property.bedrooms} beds</span>
                        <span>{property.bathrooms} baths</span>
                        <span>{property.area} m²</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-primary hover:text-primary/80">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 bg-background border-primary/20">
                          <DropdownMenuItem
                            className="text-primary hover:bg-primary/10"
                            onClick={() => handleShare(property, 'link')}
                          >
                            <Link2 className="mr-2 h-4 w-4" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-primary hover:bg-primary/10"
                            onClick={() => handleShare(property, 'email')}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-primary hover:bg-primary/10"
                            onClick={() => handleShare(property, 'whatsapp')}
                          >
                            <SiWhatsapp className="mr-2 h-4 w-4" />
                            WhatsApp
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-primary hover:bg-primary/10">
                            <PDFDownloadLink
                              document={
                                <PropertyPDF
                                  title={property.title}
                                  content={property.features}
                                  price={`$${property.price.toLocaleString()}`}
                                  details={{
                                    beds: property.bedrooms,
                                    baths: property.bathrooms,
                                    area: `${property.area}m²`
                                  }}
                                  imageUrl={property.imageUrl}
                                />
                              }
                              fileName={`${property.title.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                              className="flex items-center w-full"
                            >
                              {({ loading }) => (
                                <>
                                  <FileText className="mr-2 h-4 w-4" />
                                  {loading ? 'Preparing PDF...' : 'Download PDF'}
                                </>
                              )}
                            </PDFDownloadLink>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/20 bg-muted">
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">AI Search Assistant</h2>
                  <p className="text-muted-foreground">Ask me about properties or search criteria</p>
                </div>

                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-background/50 text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-background/50 rounded-lg p-4">
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about properties or type your search criteria..."
                    className="bg-background border-primary/20 text-white placeholder:text-muted-foreground"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSendMessage}
                    disabled={isChatLoading}
                  >
                    {isChatLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Send'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "info" && (
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/20 bg-muted">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Listing Summary Generator</h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-white mb-2 block">Client Name</label>
                    <Input
                      placeholder="Enter client name..."
                      className="bg-background border-primary/20"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white mb-2 block">Summary Title</label>
                    <Input
                      placeholder="E.g., Exclusive Marbella Listings..."
                      className="bg-background border-primary/20"
                      value={summaryTitle}
                      onChange={(e) => setSummaryTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white mb-2 block">Listing info URLs</label>
                    {listingUrls.map((url, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <Input
                          placeholder="Paste property listing URL here..."
                          className="bg-background border-primary/20"
                          value={url}
                          onChange={(e) => updateUrl(index, e.target.value)}
                        />
                        {listingUrls.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary hover:text-primary/80"
                            onClick={() => removeUrlField(index)}
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 mt-2"
                      onClick={addUrlField}
                    >
                      + Add Another URL
                    </Button>
                  </div>

                  <div>
                    <label className="text-sm text-white mb-2 block">Client Preferences</label>
                    <textarea
                      className="w-full min-h-[100px] bg-background border-primary/20 rounded-md p-3 text-white placeholder:text-muted-foreground"
                      placeholder="E.g., Luxury villa, sea views, 3+ bedrooms, modern design..."
                      value={preferences}
                      onChange={(e) => setPreferences(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm text-white mb-2 block">Message Style</label>
                    <select
                      className="w-full bg-background border-primary/20 rounded-md p-3 text-white"
                      value={messageStyle}
                      onChange={(e) => setMessageStyle(e.target.value)}
                    >
                      <option value="">Choose message style...</option>
                      <option value="Friendly Message (WhatsApp format)">WhatsApp Format</option>
                      <option value="Professional Email">Professional Email</option>
                      <option value="Formal Letter">Formal Letter</option>
                      <option value="Social Media Post">Social Media Post</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-white mb-2 block">Call-to-Action</label>
                    <Input
                      placeholder="E.g., Would you like to schedule a viewing?"
                      className="bg-background border-primary/20"
                      value={cta}
                      onChange={(e) => setCta(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                    onClick={handleGenerateContent}
                    disabled={!clientName || !summaryTitle || listingUrls.some(url => !url) || !preferences || !messageStyle || !cta}
                  >
                    Generate Summary
                  </Button>

                  {generatedContent && (
                    <>
                      <div className="mt-6 p-4 bg-background rounded-md">
                        <h3 className="font-semibold text-white mb-2">{summaryTitle}</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {generatedContent === "Generating summary..." ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              {generatedContent}
                            </span>
                          ) : (
                            generatedContent
                          )}
                        </p>
                      </div>

                      {generatedContent !== "Generating summary..." && !generatedContent.includes("Error") && (
                        <>
                          <ShareButtons
                            title={summaryTitle}
                            content={generatedContent}
                            onExportPDF={() => {
                              // PDF export logic
                            }}
                          />

                          <PDFDownloadLink
                            document={
                              <PropertyPDF
                                title={summaryTitle}
                                content={generatedContent}
                              />
                            }
                            fileName={`${summaryTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`}
                          >
                            {({ loading }) => (
                              loading ? 'Preparing PDF...' : 'Download PDF'
                            )}
                          </PDFDownloadLink>
                        </>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "valuation" && (
          <div className="max-w-4xl mx-auto">
            <Card className="border-primary/20 bg-muted">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-center mb-8 text-white">Evaluate Your Property</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2 text-white">Property Type</h3>
                    <div className="space-y-2">
                      {['House', 'Vacation house', 'Apartment', 'Department'].map((type) => (
                        <div key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            id={type}
                            className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label htmlFor={type} className="ml-2 text-sm text-gray-300">
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2 text-white">Property Condition</h3>
                    <div className="space-y-2">
                      {['Newly Renovated', 'Good Condition', 'Needs Renovation'].map((condition) => (
                        <div key={condition} className="flex items-center">
                          <input
                            type="checkbox"
                            id={condition}
                            className="h-4 w-4 rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
                          />
                          <label htmlFor={condition} className="ml-2 text-sm text-gray-300">
                            {condition}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2 text-white">Upload Image</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="w-full text-left">
                        Upload image (optional)
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" className="w-full text-left">
                        Add link (optional)
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2 text-white">Property Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Input
                        placeholder="Enter your Address"
                        className="bg-background border-primary/20"
                      />
                      <p className="text-xs text-gray-400 mt-1">Address</p>
                    </div>

                    <div>
                      <Input
                        placeholder="Price"
                        type="number"
                        className="bg-background border-primary/20"
                      />
                      <p className="text-xs text-gray-400 mt-1">Enter price (optional)</p>
                    </div>

                    <div>
                      <Input
                        placeholder="Enter living area (sqm)"
                        type="number"
                        className="bg-background border-primary/20"
                      />
                      <p className="text-xs text-gray-400 mt-1">Fill it just with numbers</p>
                    </div>

                    <div>
                      <Input
                        placeholder="Number of rooms"
                        type="number"
                        className="bg-background border-primary/20"
                      />
                      <p className="text-xs text-gray-400 mt-1">Fill it just with numbers</p>
                    </div>

                    <div>
                      <Input
                        placeholder="Enter year built"
                        type="number"
                        className="bg-background border-primary/20"
                      />
                      <p className="text-xs text-gray-400 mt-1">Fill it just with numbers</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2 text-white">Description</h3>
                  <textarea
                    className="w-full min-h-[100px] bg-background border-primary/20 rounded-md p-3 text-white placeholder:text-gray-400"
                    placeholder="Describe your wish"
                  />
                </div>

                <Button className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-white">
                  Calculate Valuation
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "data" && <DataDashboard />}
      </main>
      <FloatingChat />
    </div>
  );
}