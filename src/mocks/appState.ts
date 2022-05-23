import { Order } from "models/order";
import Shop from "models/shop";

///mega class to mock app state/DB/Backend until we connect a backend
class AppState {
    constructor() {
        
    }
    static shops:Shop[] = [
        {
            "id":"1",
            "name":"shabrawy",
            "delivery":1,
            "vatPercentage":3,
            "menu":[
            {
                "id":"1",
                "name":"fool",
                "price":11
            },
            {
                "id":"2",
                "name":"t3mya",
                "price":15
            },
            {
                "id":"3",
                "name":"eggs",
                "price":3
            }
        ]
        },
        {
            "id":"2",
            "name":"gad",
            "delivery":51,
            "vatPercentage":14,
            "menu":[
            {
                "id":"4",
                "name":"fool",
                "price":23
            },
            {
                "id":"5",
                "name":"t3mya",
                "price":6
            },
            {
                "id":"6",
                "name":"eggs",
                "price":4
            },
            {
                "id":"7",
                "name":"gbna m2lya",
                "price":14
            }
        ]
        },
    ]

    static orders:Order[] = [
        {
            "id":"1",
            "owner":{
                "name":"el sisi",
                "id":"1"
            },
            "shop": {
                "id":"1",
                "name":"shabrawy",
                "delivery":1,
                "vatPercentage":3,
                "menu":[
                {
                    "id":"1",
                    "name":"fool",
                    "price":11
                },
                {
                    "id":"2",
                    "name":"t3mya",
                    "price":15
                },
                {
                    "id":"3",
                    "name":"eggs",
                    "price":3
                }
            ]
            },
            "requests":[
                {
                    "id":"1",
                    "item_id":"1",
                    "price":1,
                    "qty":1,
                    "date_modified":"1653315575",
                    "user":{
                        "name":"el sisi",
                        "id":"1"
                    }
                },
                {
                    "id":"2",
                    "item_id":"3",
                    "item_price":1,
                    "qty":3,
                    "date_modified":"1653315575",
                    "user":{
                        "name":"eyad",
                        "id":"2"
                    }
                }
            ]

        }
    ]
}
export default AppState;