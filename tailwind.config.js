/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'surface-bright': '#f8f9fb',
        'error-container': '#ffdad6',
        'on-primary-fixed': '#00174b',
        'on-secondary-fixed-variant': '#930009',
        'on-error-container': '#93000a',
        'secondary': '#bb000f',
        'primary-fixed-dim': '#b4c5ff',
        'on-primary': '#ffffff',
        'on-secondary-container': '#fffbff',
        'on-tertiary-fixed-variant': '#832700',
        'tertiary': '#822600',
        'tertiary-fixed-dim': '#ffb59c',
        'surface-container-high': '#e7e8ea',
        'tertiary-fixed': '#ffdbd0',
        'surface-container': '#edeef0',
        'on-error': '#ffffff',
        'surface-container-lowest': '#ffffff',
        'primary-container': '#0052d9',
        'primary-fixed': '#dbe1ff',
        'on-primary-container': '#cbd6ff',
        'on-tertiary': '#ffffff',
        'surface-dim': '#d9dadc',
        'surface-container-highest': '#e1e2e4',
        'on-surface-variant': '#434654',
        'error': '#ba1a1a',
        'on-background': '#191c1e',
        'surface-tint': '#0353da',
        'on-secondary': '#ffffff',
        'inverse-surface': '#2e3132',
        'on-primary-fixed-variant': '#003ea8',
        'on-secondary-fixed': '#410002',
        'on-surface': '#191c1e',
        'outline': '#737686',
        'inverse-on-surface': '#f0f1f3',
        'on-tertiary-container': '#ffccbc',
        'on-tertiary-fixed': '#390c00',
        'secondary-container': '#e32322',
        'surface-container-low': '#f3f4f6',
        'outline-variant': '#c3c6d7',
        'tertiary-container': '#aa3500',
        'surface-variant': '#e1e2e4',
        'primary': '#003da6',
        'background': '#f8f9fb',
        'secondary-fixed': '#ffdad5',
        'secondary-fixed-dim': '#ffb4aa',
        'inverse-primary': '#b4c5ff',
        'surface': '#f8f9fb'
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      },
      spacing: {
        gutter: '20px',
        xl: '32px',
        unit: '4px',
        md: '16px',
        lg: '24px',
        sm: '8px',
        xs: '4px',
        'container-max': '1200px'
      },
      fontFamily: {
        'headline-lg': ['Inter'],
        'label-md': ['Inter'],
        'display-lg': ['Inter'],
        'headline-lg-mobile': ['Inter'],
        'body-lg': ['Inter'],
        'title-md': ['Inter'],
        'body-md': ['Inter']
      },
      fontSize: {
        'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'label-md': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '500' }],
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'title-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body-md': ['14px', { lineHeight: '20px', fontWeight: '400' }]
      },
      maxWidth: {
        'container-max': '1200px'
      }
    }
  },
  plugins: []
}
