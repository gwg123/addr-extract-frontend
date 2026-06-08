# LogisticsPro - Address Extraction

A smart address recognition application built with Vue 3, Vite, and Tailwind CSS.

## Features

- **Smart Address Recognition**: Paste unstructured text to automatically extract logistics information
- **Multi-language Support**: English and Chinese language switching
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Form Handling**: Interactive address extraction and form management

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend build tool
- **Tailwind CSS 3** - Utility-first CSS framework
- **Material Symbols** - Google Material Design icons

## Project Structure

```
src/
├── components/
│   ├── AddressInput.vue    # Address text input component
│   ├── ExtractedForm.vue   # Extracted information form
│   ├── FooterBar.vue       # Footer navigation
│   └── TopNavBar.vue       # Top navigation bar
├── i18n/
│   ├── en.js               # English translations
│   ├── zh.js               # Chinese translations
│   └── index.js            # i18n hook
├── views/
│   └── ManagePage.vue      # Main page
├── App.vue                 # Root component
├── main.js                 # Application entry point
└── style.css               # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Paste Address Text**: Enter unstructured address text in the textarea
2. **Identify Address**: Click "Identify Address" to extract information
3. **Review & Edit**: Check and modify the extracted information
4. **Confirm & Save**: Click "Confirm & Save" to save the address

### Language Switching

Click the language button (EN/中文) in the top right corner to toggle between English and Chinese.

## License

MIT
