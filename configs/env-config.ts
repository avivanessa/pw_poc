import * as dotenv from 'dotenv';
import path from 'path';

// Get the enviroment and version of environment to execute it 
const envType = process.env.ENV_TYPE || 'd'; // value: d (dev), q (qa), h (hotfix), p (prod)
const envVersion = process.env.ENV_VERSION || 'ax'; // version of environment, e.g., nx, ax, nf, fx...

// Build the name of the environment path
const envFile = `./envs/.env.${envType}${envVersion}`;

dotenv.config({ path: path.resolve(__dirname, envFile) });