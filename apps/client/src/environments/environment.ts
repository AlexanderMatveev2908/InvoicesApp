export type EnvModeT = 'development' | 'production' | 'test';

export class EnvVars {
  public static readonly mode: EnvModeT = 'development';
  public static readonly backURL: string = 'https://localhost/api/v1';
  public static readonly frontURL: string = 'https://localhost';

  public static isDev(): boolean {
    return this.mode === 'development';
  }

  public static isProd(): boolean {
    return this.mode === 'production';
  }
}
