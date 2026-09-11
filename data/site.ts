export const siteData = {
  brand: {
    name: "PDF Office – Doc Scanner",
    shortName: "PDF Office",
    subtitle: "Scanner • OCR • PDF Tools • eSign",
  },

  navigation: {
    features: "Features",
    tools: "PDF Tools",
    scanner: "Scanner & OCR",
    faq: "FAQ",
    getApp: "Get the app",
  },

  hero: {
    eyebrow: "Scanner • OCR • PDF Tools • eSign",

    titleTop: "Scan. Edit. Sign.",
    titleBottom: "Everything PDF.",

    description:
      "Scan documents, extract text, edit PDFs, convert files, add signatures and organize everything from one mobile workspace.",

    primaryCta: "Get it on Google Play",
    secondaryCta: "Explore tools",

    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.pdfoffice.pdf.scanner.converter.esign&hl=en_IN",
  },

  stats: [
    {
      value: "13+",
      label: "PDF Tools",
    },
    {
      value: "OCR",
      label: "Text Extraction",
    },
    {
      value: "All-in-one",
      label: "Document Workspace",
    },
  ],

  onboarding: {
    eyebrow: "Made for everyday documents",

    title:
      "From paper to polished PDF in seconds.",

    description:
      "Capture, improve, organize and sign documents without switching between multiple apps.",

    items: [
      {
        title: "Scan anything",
        description:
          "Scan documents, IDs, books, notes, business cards and more directly from your phone.",
        type: "scan",
      },

      {
        title: "Auto Crop & Enhance",
        description:
          "Detect document edges, crop automatically and improve clarity for cleaner digital copies.",
        type: "enhance",
      },

      {
        title: "eSign PDFs digitally",
        description:
          "Add your signature directly to documents whenever you need it.",
        type: "sign",
      },
    ],
  },

  tools: {
    eyebrow: "Everything in one place",

    title: "Powerful PDF tools. No clutter.",

    description:
      "Create, convert, organize and work with documents from one simple mobile workspace.",

    items: [
      {
        name: "Merge PDF",
        type: "merge",
      },
      {
        name: "Split PDF",
        type: "split",
      },
      {
        name: "eSign",
        type: "esign",
      },
      {
        name: "Watermark",
        type: "watermark",
      },
      {
        name: "Compress",
        type: "compress",
      },
      {
        name: "Image to PDF",
        type: "image",
      },
      {
        name: "Scan PDF",
        type: "scan",
      },
      {
        name: "QR Generate",
        type: "qrGenerate",
      },
      {
        name: "QR Reader",
        type: "qrReader",
      },
      {
        name: "Extract Text",
        type: "ocr",
      },
      {
        name: "Import Files",
        type: "import",
      },
      {
        name: "Word to PDF",
        type: "word",
      },
      {
        name: "Excel to PDF",
        type: "excel",
      },
    ],
  },

  faq: {
    eyebrow: "Questions",

    title: "Everything you need to know.",

    description:
      "Quick answers about scanning, OCR, PDF tools and document management.",

    items: [
      {
        question:
          "What can I scan with PDF Office?",
        answer:
          "PDF Office can be used to scan documents, notes, IDs, books, business cards and other paper content using your phone camera.",
      },

      {
        question:
          "Does PDF Office support OCR?",
        answer:
          "Yes. OCR tools allow you to extract text from camera captures and existing images.",
      },

      {
        question:
          "Can I convert files into PDF?",
        answer:
          "Yes. PDF Office includes tools for creating PDFs from images and converting supported Word and Excel files into PDF.",
      },

      {
        question:
          "Can I sign PDFs from my phone?",
        answer:
          "Yes. The eSign tool lets you add a digital signature directly to supported documents.",
      },

      {
        question:
          "Can I organize my documents?",
        answer:
          "Yes. Documents can be searched and organized using categories and tags, including Business Card, ID Card, Academic and Personal.",
      },
    ],
  },
};

export type SiteData =
  typeof siteData;