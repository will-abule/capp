export class Upload {
    
    id          :   string;
    file        :   File;
    name        :   string;
    title       :   string;
    body        :   string;
    url         :   string;
    progress    :   number;
  
    constructor(file:File) {
      this.file = file;
    }
  }
  
  export class Post {
    
        name    :   string;
        title   :   string;
        url     :   string;
    }

    export interface $Post {
        
        id      :   string;
        name    :   string;
        title   :   string;
        url     :   string;
    }

