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
        console.log(statusData);
    
        if (statusData.op != 1){
            profileImage(statusData.discord_user.id, statusData.discord_user.avatar);
            checkDiscordStatus(statusData.discord_status);
    
            if (statusData.discord_status != "offline"){
                
            }
        }else{
            HEARTBEAT = message.d.heartbeat_interval;
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
    document.getElementById("statusImage").src = `./images/${status}.png`;
}

async function profileImage(userId, avatarId){
    document.getElementById("profileImage").src = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
}