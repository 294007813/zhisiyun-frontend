import axios from 'gl/axios'

axios.post("/login", {
        // client: "demo12",
        // username: "00001",
        // password: "000000"

        client: "001",
        username: "0363",
        password: "087373"
    }
    ).then(res => {
    console.log("res", res);
})