import axios from 'gl/axios'

axios.post("/login", {
        client: "demo12",
        username: "00001",
        password: "000000"


    },{baseUrl: "/lo-gin"}).then(res => {})