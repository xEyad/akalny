import { FirebaseApp } from "firebase/app";
import { Order } from "models/order";
import Shop from "models/shop";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, DocumentData, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";
import { User } from "models/user";

///mega class to mock app state/DB/Backend until we connect a backend
class AppState {
    constructor() {
        
    }

    
    

    static firebaseApp:FirebaseApp; 
    static isUserSignedFirebase:boolean;
    static get fireStore(){return getFirestore(AppState.firebaseApp)};
    static get activeUser():Readonly<User | undefined>{return JSON.parse(localStorage.getItem('activeUser') as string) as User};
    static setActiveUser(user:User) : void
    {
        localStorage.setItem('activeUser',JSON.stringify(user));
    }
}
export default AppState;