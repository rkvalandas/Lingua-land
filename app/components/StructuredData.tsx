export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lingua Land",
    "url": "https://lingualand.example.com",
    "description": "Immerse yourself in a magical language learning journey with our AI companion.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://lingualand.example.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://facebook.com/lingualand",
      "https://twitter.com/lingualand",
      "https://instagram.com/lingualand"
    ],
    "mainEntity": {
      "@type": "EducationalApplication",
      "name": "Lingua Land AI Language Learning",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}