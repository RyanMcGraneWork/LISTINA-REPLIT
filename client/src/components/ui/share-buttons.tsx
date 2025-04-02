import { MessageCircle, Mail, Download } from "lucide-react";
import { Button } from "./button";

interface ShareButtonsProps {
  title: string;
  content: string;
  onExportPDF: () => void;
}

export function ShareButtons({ title, content, onExportPDF }: ShareButtonsProps) {
  const handleWhatsAppShare = () => {
    const text = `${title}\n\n${content}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(content);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="flex gap-2 mt-4">
      <Button
        variant="outline"
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={handleWhatsAppShare}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={handleEmailShare}
      >
        <Mail className="h-4 w-4 mr-2" />
        Email
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="border-primary/20 text-primary hover:bg-primary/10"
        onClick={onExportPDF}
      >
        <Download className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
}