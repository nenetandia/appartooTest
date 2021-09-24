
 export class User {
    _id      : string;
    fullName : string;
    age      : string; 
    group      : string;
    race      : string; 
    food      : string; 
    email    : string;
    password : string;
    
    constructor(obj: any) {
        this._id  = obj && obj._id  || null;
        this.fullName = obj && obj.fullName || null;
        this.age = obj && obj.age || null;
        this.group = obj && obj.group || null;
        this.race = obj && obj.race || null;
        this.food = obj && obj.food || null;
        this.email  = obj && obj.email  || null;
        this.password = obj && obj.password || null;
    }
}
export class userDetails {
    fullName : string;
    age      : string; 
    group      : string;
    race      : string; 
    food      : string; 
    email    : string;
    password : string;
    
    constructor(obj: any) {
        this.fullName = obj && obj.fullName || null;
        this.age = obj && obj.age || null;
        this.group = obj && obj.group || null;
        this.race = obj && obj.race || null;
        this.food = obj && obj.food || null;
        this.email  = obj && obj.email  || null;
        this.password = obj && obj.password || null;
    }
  }
  export class users {
    _id      : string;
    fullName : string;
    age      : string; 
    group      : string;
    race      : string; 
    food      : string; 
    email    : string;
    password : string;
    
    constructor(obj: any) {
        this._id  = obj && obj._id  || null;
        this.fullName = obj && obj.fullName || null;
        this.age = obj && obj.age || null;
        this.group = obj && obj.group || null;
        this.race = obj && obj.race || null;
        this.food = obj && obj.food || null;
        this.email  = obj && obj.email  || null;
        this.password = obj && obj.password || null;
    }
}
    export class listFriends {
        _id      : string;
        fullName : string;
        age      : string; 
        group      : string;
        race      : string; 
        food      : string; 
        email    : string;
        password : string;
        
        constructor(obj: any) {
            this._id  = obj && obj._id  || null;
            this.fullName = obj && obj.fullName || null;
            this.age = obj && obj.age || null;
            this.group = obj && obj.group || null;
            this.race = obj && obj.race || null;
            this.food = obj && obj.food || null;
            this.email  = obj && obj.email  || null;
            this.password = obj && obj.password || null;
        }

  }
