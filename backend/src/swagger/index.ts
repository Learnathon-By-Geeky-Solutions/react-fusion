import fs from 'fs';
import path from 'path';

import baseSwagger from './swaggerBase.json';

const pathsDir = path.join(__dirname, 'paths');

fs.readdirSync(pathsDir).forEach(file => {
  const filePath = path.join(pathsDir, file);
  const pathObj = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  baseSwagger.paths = {
    ...baseSwagger.paths,
    ...pathObj,
  };
});

export default baseSwagger;
