const svgToDataUri = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

const visual = ({ title, accent, secondary, scene }) => svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#111827"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="1" stop-color="${secondary}"/>
    </linearGradient>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="640" height="360" rx="28" fill="url(#panel)"/>
  <path d="M0 280 C130 235 205 345 340 292 C455 248 508 182 640 215 L640 360 L0 360Z" fill="${secondary}" opacity=".10"/>
  <g opacity=".24" stroke="#94a3b8" stroke-width="1">
    <path d="M70 74 H570"/>
    <path d="M70 128 H570"/>
    <path d="M70 182 H570"/>
    <path d="M70 236 H570"/>
    <path d="M124 42 V306"/>
    <path d="M232 42 V306"/>
    <path d="M340 42 V306"/>
    <path d="M448 42 V306"/>
    <path d="M556 42 V306"/>
  </g>
  ${scene}
  <rect x="34" y="26" width="182" height="34" rx="8" fill="#020617" opacity=".72"/>
  <circle cx="54" cy="43" r="6" fill="${accent}"/>
  <text x="70" y="48" fill="#e2e8f0" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="700">${title}</text>
</svg>`);

export const agentVisuals = {
  email: visual({
    title: 'Email SDR',
    accent: '#f4ca71',
    secondary: '#8f2f49',
    scene: `
      <rect x="78" y="96" width="292" height="176" rx="18" fill="#020617" stroke="#334155"/>
      <rect x="104" y="124" width="240" height="18" rx="5" fill="#1f2937"/>
      <rect x="104" y="158" width="190" height="12" rx="4" fill="#334155"/>
      <rect x="104" y="184" width="220" height="12" rx="4" fill="#334155"/>
      <rect x="104" y="216" width="118" height="28" rx="8" fill="url(#accent)" filter="url(#glow)"/>
      <path d="M430 120 h92 a24 24 0 0 1 24 24 v62 a24 24 0 0 1-24 24 h-92 a24 24 0 0 1-24-24 v-62 a24 24 0 0 1 24-24Z" fill="#0f172a" stroke="#f4ca71"/>
      <path d="M424 144 l52 38 54-38" fill="none" stroke="#f4ca71" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  }),
  phone: visual({
    title: 'Phone SDR',
    accent: '#c7b892',
    secondary: '#8f2f49',
    scene: `
      <circle cx="204" cy="180" r="78" fill="#0f172a" stroke="#c7b892"/>
      <path d="M180 142 c-8 5-10 22-4 39 7 22 27 43 49 50 17 6 33 4 39-4 l-22-25 c-5 4-12 4-21-1-12-6-24-18-30-30-5-9-5-16-1-21Z" fill="url(#accent)"/>
      <path d="M330 126 h122" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
      <path d="M330 172 h184" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
      <path d="M330 218 h92" stroke="#334155" stroke-width="16" stroke-linecap="round"/>
      <path d="M480 116 q44 64 0 128" fill="none" stroke="#8f2f49" stroke-width="10" stroke-linecap="round" opacity=".75"/>
    `,
  }),
  qualifier: visual({
    title: 'Qualifier',
    accent: '#b93158',
    secondary: '#f4ca71',
    scene: `
      <rect x="96" y="88" width="448" height="196" rx="18" fill="#020617" stroke="#334155"/>
      <rect x="132" y="128" width="86" height="116" rx="12" fill="#111827" stroke="#475569"/>
      <rect x="276" y="128" width="86" height="116" rx="12" fill="#111827" stroke="#475569"/>
      <rect x="420" y="128" width="86" height="116" rx="12" fill="#111827" stroke="#475569"/>
      <circle cx="175" cy="160" r="22" fill="url(#accent)" filter="url(#glow)"/>
      <circle cx="319" cy="160" r="22" fill="#334155"/>
      <circle cx="463" cy="160" r="22" fill="#334155"/>
      <path d="M145 218 h60 M289 218 h60 M433 218 h60" stroke="#64748b" stroke-width="10" stroke-linecap="round"/>
      <path d="M143 244 h40 M287 244 h64 M431 244 h36" stroke="#f4ca71" stroke-width="8" stroke-linecap="round"/>
    `,
  }),
  scheduler: visual({
    title: 'Scheduler',
    accent: '#8792a6',
    secondary: '#f4ca71',
    scene: `
      <rect x="112" y="76" width="328" height="222" rx="18" fill="#020617" stroke="#334155"/>
      <rect x="112" y="76" width="328" height="48" rx="18" fill="#111827"/>
      <path d="M152 154 h248 M152 198 h248 M152 242 h248 M204 132 v142 M276 132 v142 M348 132 v142" stroke="#334155" stroke-width="4"/>
      <rect x="216" y="164" width="116" height="28" rx="8" fill="url(#accent)" filter="url(#glow)"/>
      <rect x="360" y="208" width="90" height="28" rx="8" fill="#1e293b" stroke="#8792a6"/>
      <path d="M480 120 l34 34 70-76" fill="none" stroke="#f4ca71" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    `,
  }),
  compliance: visual({
    title: 'Compliance',
    accent: '#c7b892',
    secondary: '#8792a6',
    scene: `
      <path d="M320 72 l132 42 v78 c0 70-48 118-132 148-84-30-132-78-132-148v-78Z" fill="#0f172a" stroke="#c7b892" stroke-width="6"/>
      <path d="M266 190 l38 38 78-92" fill="none" stroke="#c7b892" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" filter="url(#glow)"/>
      <rect x="72" y="118" width="112" height="26" rx="8" fill="#1f2937"/>
      <rect x="456" y="240" width="112" height="26" rx="8" fill="#1f2937"/>
      <circle cx="118" cy="204" r="26" fill="#111827" stroke="#8792a6"/>
      <circle cx="522" cy="150" r="26" fill="#111827" stroke="#f4ca71"/>
    `,
  }),
};
