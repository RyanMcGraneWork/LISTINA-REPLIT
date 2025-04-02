import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
  },
  propertyImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    objectFit: 'cover',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  propertyInfo: {
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    color: '#10b981', // emerald-400
    marginBottom: 10,
  },
  details: {
    fontSize: 12,
    marginBottom: 5,
    color: '#4b5563', // gray-600
  },
  features: {
    marginTop: 15,
    fontSize: 12,
    lineHeight: 1.5,
    color: '#4b5563',
  },
  separator: {
    borderBottom: '1 solid #e5e7eb',
    marginVertical: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#6b7280',
  },
});

interface PropertyPDFProps {
  title: string;
  content: string;
  price?: string;
  details?: {
    beds?: number;
    baths?: number;
    area?: string;
  };
  features?: string[];
  logoUrl?: string;
  imageUrl?: string; // Added property image URL
}

export function PropertyPDF({ 
  title, 
  content, 
  price, 
  details, 
  features, 
  logoUrl,
  imageUrl 
}: PropertyPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {logoUrl && <Image style={styles.logo} src={logoUrl} />}
        </View>

        {imageUrl && (
          <Image 
            src={imageUrl} 
            style={styles.propertyImage} 
          />
        )}

        <Text style={styles.title}>{title}</Text>

        {price && (
          <View style={styles.propertyInfo}>
            <Text style={styles.price}>{price}</Text>
          </View>
        )}

        {details && (
          <View style={styles.propertyInfo}>
            <Text style={styles.details}>
              {details.beds && `${details.beds} beds`}
              {details.baths && ` • ${details.baths} baths`}
              {details.area && ` • ${details.area}`}
            </Text>
          </View>
        )}

        <View style={styles.separator} />

        <Text style={styles.features}>{content}</Text>

        {features && features.length > 0 && (
          <>
            <View style={styles.separator} />
            <View>
              {features.map((feature, index) => (
                <Text key={index} style={styles.details}>• {feature}</Text>
              ))}
            </View>
          </>
        )}

        <Text style={styles.footer}>Generated with LISTINA</Text>
      </Page>
    </Document>
  );
}