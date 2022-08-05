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
        const statusData = JSON.parse(data).d;
        if (statusData.op == 1){
            HEARTBEAT = statusData.heartbeat_interval;
        }else{
            console.log(statusData);
            profileImage(statusData.discord_user.id, statusData.discord_user.avatar);
            checkDiscordStatus(statusData.discord_status);

            if (statusData.discord_status != "offline"){
                
            }
        }
    });

    setInterval(() => {
        socket.send(
            JSON.stringify({
                op: 3,
            }),
        );
    }, HEARTBEAT);
});

async function checkDiscordStatus(status){
    if (status === "offline"){
        document.getElementById("statusImage").src = "./images/offline.png";
    }
    if (status === "online"){
        document.getElementById("statusImage").src = "./images/online.png";
    }
    if (status === "idle"){
        document.getElementById("statusImage").src = "./images/idle.png";
    }
    if (status === "dnd"){
        document.getElementById("statusImage").src = "./images/dnd.png";
    }
}

async function profileImage(userId, avatarId){
    document.getElementById("profileImage").src = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
}