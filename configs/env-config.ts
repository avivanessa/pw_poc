import * as dotenv from 'dotenv';
import path from 'path';

// Get the enviroment and version of environment to execute it 
const envType = process.env.ENV_TYPE || 'd'; // value: d (dev), q (qa), h (hotfix), p (prod)
const envVersion = process.env.ENV_VERSION || 'ax'; // version of environment, e.g., nx, ax, nf, fx...

// Build the name of the environment path
const envFile = `./envs/.env.${envType}${envVersion}`;
// const envFile = `.env`;

console.log(`Loading environment configuration from: ${envFile}`);

dotenv.config({ path: path.resolve(__dirname, envFile) });
// dotenv.config({ path: envFile });