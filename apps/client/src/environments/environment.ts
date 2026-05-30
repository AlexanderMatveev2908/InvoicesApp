
export type EnvModeT = 'development' | 'production' | 'test';

export interface EnvVarsT {
  expectedMode:EnvModeT;
  mode: EnvModeT;
  backURL: string;
  frontURL: string;
}

export const envVars: EnvVarsT = {
  expectedMode: 'development',
  mode: 'development',
  backURL: 'https://localhost/api/v1',
  frontURL: 'https://localhost'
};

for (const pair of Object.entries(envVars)) {
  if (!pair[1].trim()) {
    console.log(`❌ ENV key ${pair[0]} missing or empty`);
  }
}

if (envVars.mode !== envVars.expectedMode)
  console.log(`❌ expected ENV mode '${envVars.expectedMode}' => received '${envVars.mode}'`);

export class EnvMng {
  public static isDev(): boolean {
    return envVars.mode === 'development';
  }
  public static isTest(): boolean {
    return envVars.mode === 'test';
  }
  public static isProd(): boolean {
    return envVars.mode === 'production';
  }
}

