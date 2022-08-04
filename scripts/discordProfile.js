setInterval(reloadProfile, 2000);

function reloadProfile(){
    let date = new Date();
    let timestamp = date.getTime();
    let image = document.getElementById('profileImage');  
    image.src = 'https://lanyard.cnrad.dev/api/518362974411292691' + '?t=' + timestamp; 
}