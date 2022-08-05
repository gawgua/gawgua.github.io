const socket = new WebSocket("wss://api.lanyard.rest/socket");
var HEARTBEAT = 30000;

socket.addEventListener("open", () => {
    socket.send(
        JSON.stringify({
            op: 2,
            d: {
                "subscribe_to_id": "518362974411292691"
            },
        }),
    );

    socket.addEventListener("message", ({ data }) => {
        const message = JSON.parse(data);
        if (message.op == 1){
            HEARTBEAT = message.d.heartbeat_interval;
        }else{
            console.log(JSON.parse(data));
        }
    });

    setInterval(() => {
        socket.send(
            JSON.stringify({
                op: 3,
            }),
        );
        console.log("3");
    }, HEARTBEAT);
});

async function checkDiscordStatus(status){
    if (status === "online"){
        //change img src
    }
    if (status === "idle"){
        //change img src
    }
    if (status === "dnd"){
        //change img src
    }
    if (status === "offline"){
        //change img src
    }
}

async function profileImage(userId, avatarId){
    //set image to url 
    const url = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
}