export class Upload {
    
    id          :   string;
    file        :   File;
    name        :   string;
    title       :   string;
    body        :   string;
    author      :   string
    url         :   string;
    summary     :   string;
    progress    :   number;
  
    constructor(file:File) {
      this.file = file;
    }
  }
  
  export class Post {
    
        name    :   string;
        title   :   string;
        body    :   string;
        author  :   string;
        url     :   string;
        summary :   string;
    }

    export interface $Post {
        
        id      :   string;
        name    :   string;
        title   :   string;
        body    :   string;
        author  :   string;
        url     :   string;
        summary :   string;
    }

