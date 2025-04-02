import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bed, Bath, Square, Calendar, Share2, Mail, Link2, FileText } from "lucide-react";
import { SiWhatsapp } from 'react-icons/si';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PropertyPDF } from "@/components/ui/pdf-document";
import type { Property } from "@shared/schema";
import { format } from "date-fns";

export default function PropertyPage() {
  const [, params] = useRoute<{ id: string }>("/property/:id");
  const { toast } = useToast();

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: [`/api/properties/${params?.id}`],
  });

  const handleShare = async (method: 'link' | 'email' | 'whatsapp') => {
    if (!property) return;

    const propertyDetails = `${property.title}\n$${property.price.toLocaleString()}\n${property.description}`;

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-xl font-semibold mb-2">Property Not Found</h1>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={property.imageUrl}
              alt={property.title}
              className="w-full rounded-lg object-cover"
              style={{ height: '500px' }}
            />
          </div>

          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <p className="text-2xl font-bold text-primary">
                  ${property.price.toLocaleString()}
                </p>
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
                    onClick={() => handleShare('link')}
                  >
                    <Link2 className="mr-2 h-4 w-4" />
                    Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-primary hover:bg-primary/10"
                    onClick={() => handleShare('email')}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-primary hover:bg-primary/10"
                    onClick={() => handleShare('whatsapp')}
                  >
                    <SiWhatsapp className="mr-2 h-4 w-4" />
                    WhatsApp
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-primary hover:bg-primary/10">
                    <PDFDownloadLink
                      document={
                        <PropertyPDF
                          title={property.title}
                          content={property.description}
                          price={`$${property.price.toLocaleString()}`}
                          details={{
                            beds: property.bedrooms,
                            baths: property.bathrooms,
                            area: `${property.area}m²`
                          }}
                          features={property.features}
                          imageUrl={property.imageUrl} // Add the property image URL
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
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-primary" />
                  <span>{property.bedrooms} Beds</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-primary" />
                  <span>{property.bathrooms} Baths</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center">
                  <Square className="h-5 w-5 mr-2 text-primary" />
                  <span>{property.area} sqft</span>
                </CardContent>
              </Card>
              {property.openHouseDate && (
                <Card>
                  <CardContent className="p-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <span>{format(new Date(property.openHouseDate), 'MMM d')}</span>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-muted-foreground">
                      <span className="h-2 w-2 bg-primary rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}