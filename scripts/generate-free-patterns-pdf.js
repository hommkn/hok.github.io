const fs = require('fs');
const path = require('path');

const patterns = [
  {
    name: 'Heart',
    difficulty: 'Very easy',
    time: '20 minutes',
    grid: [
      '..RR..RR..',
      '.RRRRRRRR.',
      'RRRRRRRRRR',
      'RRRRRRRRRR',
      '.RRRRRRRR.',
      '..RRRRRR..',
      '...RRRR...',
      '....RR....'
    ]
  },
  {
    name: 'Star',
    difficulty: 'Very easy',
    time: '25 minutes',
    grid: [
      '....Y....',
      '...YYY...',
      '..YYYYY..',
      'YYYYYYYYY',
      '.YYYYYYY.',
      '..YYYYY..',
      '..YY.YY..',
      '.YY...YY.'
    ]
  },
  {
    name: 'Rainbow',
    difficulty: 'Easy',
    time: '30 minutes',
    grid: [
      '..RRRRRR..',
      '.ROOOOOOR.',
      'ROYYYYYYOR',
      'OYG GGGGYO',
      'YGGBBBBGY',
      'GBB....BBG',
      'BB......BB',
      '..........'
    ]
  },
  {
    name: 'Cat Face',
    difficulty: 'Easy',
    time: '35 minutes',
    grid: [
      'K........K',
      'KK......KK',
      'KPK....KPK',
      'PPPPPPPPPP',
      'PPKPPPPKPP',
      'PPPPKPPPPP',
      'PKPPPPPPKP',
      'PPKKKKKKPP'
    ]
  },
  {
    name: 'Dog Paw',
    difficulty: 'Very easy',
    time: '20 minutes',
    grid: [
      '..B..B..',
      '.BBB.BBB',
      '.BBB.BBB',
      '..B...B.',
      '.BBBBBB.',
      'BBBBBBBB',
      'BBBBBBBB',
      '.BBBBBB.'
    ]
  },
  {
    name: 'Flower',
    difficulty: 'Easy',
    time: '25 minutes',
    grid: [
      '..P.Y.P..',
      '.PPYYYPP.',
      '..P.Y.P..',
      '...GGG...',
      '...GGG...',
      '..GGGGG..',
      '.G.GGG.G.',
      '...GGG...'
    ]
  },
  {
    name: 'Cupcake',
    difficulty: 'Easy',
    time: '35 minutes',
    grid: [
      '....R....',
      '..PPPPP..',
      '.PPPPPPP.',
      'PPPPPPPPP',
      '.TTTTTTT.',
      '.TWTWTWT.',
      '.TWTWTWT.',
      '..TTTTT..'
    ]
  },
  {
    name: 'Smiley Face',
    difficulty: 'Very easy',
    time: '20 minutes',
    grid: [
      '..YYYY..',
      '.YYYYYY.',
      'YYKYYKYY',
      'YYYYYYYY',
      'YYKYYKYY',
      'YYYKKYYY',
      '.YYYYYY.',
      '..YYYY..'
    ]
  },
  {
    name: 'Butterfly',
    difficulty: 'Easy',
    time: '35 minutes',
    grid: [
      'BB..K..PP',
      'BBB.K.PPP',
      'BBBBKPPPP',
      '.BBBKBPP.',
      '..BBKBP..',
      '.BBBKBPP.',
      'BBBBKPPPP',
      'BB..K..PP'
    ]
  },
  {
    name: 'Mini House',
    difficulty: 'Easy',
    time: '30 minutes',
    grid: [
      '....R....',
      '...RRR...',
      '..RRRRR..',
      '.RRRRRRR.',
      'BBBBBBBBB',
      'BWWBWBWWB',
      'BWWBBBWWB',
      'BBBBBBBBB'
    ]
  }
];

const palette = {
  '.': { name: 'Blank', hex: '#FFFFFF' },
  R: { name: 'Red', hex: '#ED1C24' },
  O: { name: 'Orange', hex: '#FF7F00' },
  Y: { name: 'Yellow', hex: '#FFEB3B' },
  G: { name: 'Green', hex: '#22B14C' },
  B: { name: 'Blue', hex: '#0066CC' },
  P: { name: 'Pink', hex: '#FF77A8' },
  K: { name: 'Black', hex: '#000000' },
  T: { name: 'Tan', hex: '#D4A373' },
  W: { name: 'White', hex: '#FFFFFF' }
};

function esc(text) {
  return String(text).replace(/[\\()]/g, '\\$&');
}

function rgb(hex) {
  const n = hex.replace('#', '');
  return [
    parseInt(n.slice(0, 2), 16) / 255,
    parseInt(n.slice(2, 4), 16) / 255,
    parseInt(n.slice(4, 6), 16) / 255
  ];
}

function countColors(grid) {
  const counts = new Map();
  for (const row of grid) {
    for (const ch of row) {
      if (ch === '.' || ch === ' ') continue;
      counts.set(ch, (counts.get(ch) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => palette[a[0]].name.localeCompare(palette[b[0]].name))
    .map(([ch, count]) => `${palette[ch].name}: ${count}`);
}

function pageStream(pattern, index) {
  const cell = 22;
  const startX = 72;
  const startY = 510;
  const parts = [];

  parts.push('0.227 0.208 0.188 rg');
  parts.push(`BT /F1 26 Tf 72 748 Td (${esc(pattern.name)}) Tj ET`);
  parts.push('0.419 0.388 0.361 rg');
  parts.push(`BT /F1 11 Tf 72 724 Td (${esc(`Pattern ${index + 1} of 10 | ${pattern.difficulty} | About ${pattern.time}`)}) Tj ET`);
  parts.push('0.419 0.388 0.361 rg');
  parts.push('BT /F1 10 Tf 72 704 Td (Print this page, place beads on a square pegboard, then fuse with ironing paper.) Tj ET');

  for (let y = 0; y < pattern.grid.length; y++) {
    for (let x = 0; x < pattern.grid[y].length; x++) {
      const ch = pattern.grid[y][x];
      const color = palette[ch] || palette['.'];
      const [r, g, b] = rgb(color.hex);
      const px = startX + x * cell;
      const py = startY - y * cell;
      parts.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`);
      parts.push(`${px} ${py} ${cell} ${cell} re f`);
      parts.push('0.820 0.780 0.718 RG');
      parts.push(`${px} ${py} ${cell} ${cell} re S`);
    }
  }

  parts.push('0.227 0.208 0.188 rg');
  parts.push('BT /F1 14 Tf 330 526 Td (Color list) Tj ET');
  parts.push('0.419 0.388 0.361 rg');
  countColors(pattern.grid).forEach((line, i) => {
    parts.push(`BT /F1 11 Tf 330 ${504 - i * 17} Td (${esc(line)}) Tj ET`);
  });

  parts.push('0.910 0.373 0.306 rg');
  parts.push('BT /F1 11 Tf 72 70 Td (Made with BeadSnap - Free photo to bead pattern maker) Tj ET');
  parts.push('0.419 0.388 0.361 rg');
  parts.push('BT /F1 10 Tf 72 54 Td (Need more printable patterns? Visit https://beadsnap.app/free-patterns.html) Tj ET');

  return parts.join('\n');
}

function buildPdf() {
  const objects = [];
  const add = content => {
    objects.push(content);
    return objects.length;
  };

  const catalogId = add('');
  const pagesId = add('');
  const fontId = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const pageIds = [];

  patterns.forEach((pattern, index) => {
    const stream = pageStream(pattern, index);
    const streamId = add(`<< /Length ${Buffer.byteLength(stream, 'utf8')} >>\nstream\n${stream}\nendstream`);
    const pageId = add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${streamId} 0 R >>`);
    pageIds.push(pageId);
  });

  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map(id => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

  const chunks = ['%PDF-1.4\n'];
  const offsets = [0];
  objects.forEach((obj, i) => {
    offsets.push(Buffer.byteLength(chunks.join(''), 'utf8'));
    chunks.push(`${i + 1} 0 obj\n${obj}\nendobj\n`);
  });
  const xrefOffset = Buffer.byteLength(chunks.join(''), 'utf8');
  chunks.push(`xref\n0 ${objects.length + 1}\n`);
  chunks.push('0000000000 65535 f \n');
  for (let i = 1; i < offsets.length; i++) {
    chunks.push(`${String(offsets[i]).padStart(10, '0')} 00000 n \n`);
  }
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
  return chunks.join('');
}

const outDir = path.join(__dirname, '..', 'downloads');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, '10-free-beginner-bead-patterns.pdf'), buildPdf());
