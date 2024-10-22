import { useRuntimeConfig } from 'nuxt/app'; // Import useRuntimeConfig to access the env variables

export const getGoogleServiceAccountCredentials = () => {
  const config = useRuntimeConfig(); // Access the runtime config

  return {
    type: 'service_account',
    project_id: config.googleProjectId,
    private_key_id: config.googlePrivateKeyId,
    private_key: config.googlePrivateKey.replace(/\\n/g, '\n'), // Replace escaped newlines
    client_email: config.googleClientEmail,
    client_id: config.googleClientId,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: config.googleClientX509CertUrl,
  };
};