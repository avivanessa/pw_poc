import { globalVariables } from './variables.setup';
import { authSetup } from './auth.setup';
import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  await globalVariables();
  await authSetup();
}

export default globalSetup;