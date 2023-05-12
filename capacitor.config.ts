import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rhythmicity.com',
  appName: 'rhythmcity',
  webDir: 'public',
  server: {
    androidScheme: 'https'
  }
};

export default config;
