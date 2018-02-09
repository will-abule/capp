export interface Roles { 
    users?: boolean;
    subscriber?: boolean;
    admin?: boolean;
    superAdmin?:boolean;
  }
  export interface User {
    uid: string;
    email?: string;
    displayName?: string;
  }

