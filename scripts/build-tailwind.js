const fs = require('fs');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');

const input = '@tailwind base;\n@tailwind components;\n@tailwind utilities;';

postcss([tailwind]).process(input, { from: undefined }).then(result => {
  fs.writeFileSync('temp-tailwind.css', result.css);
  console.log('Wrote temp-tailwind.css, length', result.css.length);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
