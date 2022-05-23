///mega class to mock app state/DB/Backend until we connect a backend
class AppState {
    constructor() {
        
    }
    shops = [
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
                "id":"1",
                "name":"fool",
                "price":23
            },
            {
                "id":"2",
                "name":"t3mya",
                "price":6
            },
            {
                "id":"3",
                "name":"eggs",
                "price":4
            },
            {
                "id":"4",
                "name":"gbna m2lya",
                "price":14
            }
        ]
        },
    ]
}
export default AppState;