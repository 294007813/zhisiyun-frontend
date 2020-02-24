import axios from 'gl/axios'

axios.post("/login", {
        client: "demo15",
        username: "00001",
        password: "000000"


    },{baseUrl: "/lo-gin"}).then(res => {})