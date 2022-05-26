import { FirebaseApp } from "firebase/app";
import { Order } from "models/order";
import Shop from "models/shop";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, DocumentData, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";
import { User } from "models/user";
import AppState from "mocks/appState";
import { OrderRequest } from "./orderRequest";

///class converters from and to firebase
export class FirebaseConverters
{
    static userConverter = {
        toFirestore: (user:User) => {
            return {
               name:user.name
            }
        },
        fromFirestore: (snapshot:DocumentSnapshot<DocumentData>) :User => {
            const data:any = snapshot.data() ;
           return {
                name:data['name'],
                id: snapshot.id
            };
        }
    };

    static requestConverter = {
        toFirestore: (orderRequest:OrderRequest) => {
            return orderRequest
        },

        fromFirestore: async (snapshot:DocumentSnapshot<DocumentData>) : Promise<OrderRequest> => {
            const data:any = snapshot.data() ;
            
            return {
                date_modified: data['date_modified'],
                quantity: data['quantity'],
                user: data['user'],
                item: data['item']
            };
        }
    };
    
    // Firestore data converter
    static orderConverter = {
        toFirestore: (order:Order) => {
            return {
                is_active:true,
                owner: AppState.activeUser,
                shop: doc(AppState.fireStore,`shops/${order.shop?.id}`),
                requests:[]
            }
        },
        fromFirestore: async (orderSnapshot:DocumentSnapshot<DocumentData>):Promise<Order> =>
        {
            const firebaseData = orderSnapshot?.data() as DocumentData ;
            const order:Partial<Order> = {is_active:firebaseData['is_active']};
            const results = await Promise.all(
                [ 
                    getDoc(doc(AppState.fireStore,firebaseData['shop']?.path)),
                ]
            )
            order.shop = results[0].data() as Shop;
            order.owner = firebaseData['owner'];
            order.requests = firebaseData['requests']
            return order as Order;
        }
    };
}