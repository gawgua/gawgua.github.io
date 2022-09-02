const socket = new WebSocket("wss://api.lanyard.rest/socket");
var HEARTBEAT = 30000;
let isSpotifyStatusExist = false;

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
    
        if (JSON.parse(data).op != 1){
            profileImage(statusData.discord_user.id, statusData.discord_user.avatar);
            checkDiscordStatus(statusData.discord_status);
    
            if (statusData.discord_status != "offline"){
                if (statusData.listening_to_spotify){
                    let cover = document.getElementById('songCover');
                    cover.setAttribute('src', statusData.spotify.album_art_url);

                    let name = document.getElementById('songName');
                    name.innerText = statusData.spotify.song;

                    isSpotifyStatusExist = true;
                }else if (isSpotifyStatusExist){
                    let cover = document.getElementById('songCover');
                    cover.setAttribute('src', '');
                    let name = document.getElementById('songName');
                    name.innerText = '';
                    isSpotifyStatusExist = false;
                }
            }
        }else{
            HEARTBEAT = statusData.heartbeat_interval;
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

function checkDiscordStatus(status){
    document.getElementById("statusImage").src = `./images/${status}.png`;
}

function profileImage(userId, avatarId){
    document.getElementById("profileImage").src = `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png`;
}