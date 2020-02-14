import axios from 'gl/axios'

axios.post("/login", {
        client: "demo15",
        username: "00001",
        password: "000000"

        // client: "001",
        // username: "0363",
        // password: "087373"
    },{baseUrl: "/lo-gin"}).then(res => {})