export type User = {
  spotify: {
    tokens: {
      access: string;
      refresh: string;
      expireDate: Date;
    }
    id: string;
    email: string;
    displayName: string;
  },
  jwt: string;
};