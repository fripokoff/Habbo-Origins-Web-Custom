function updateOnlineUsers(locale) {
    var urls = {
        br: "https://origins.habbo.com.br/api/public/origins/users",
        us: "https://origins.habbo.com/api/public/origins/users",
        es: "https://origins.habbo.es/api/public/origins/users",
    };
    function fetchOnlineUsers(callback) {
        var url = urls[locale];
        if(!url) {
            callback("Failed to fetch online users");
            return;
        }
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if(this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    if(data.onlineUsers) {
                        callback(data.onlineUsers+" members online ");
                        return;
                    }
                }
                callback("Failed to fetch online users");
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
    function updateOnlineUsers() {
        fetchOnlineUsers(function(onlineMessage) {
            document.getElementById("players-online").innerHTML = `${onlineMessage} - <a href="light.html">Light loader</a>`;
        });
    }

    updateOnlineUsers();
    setInterval(updateOnlineUsers, 60000);
}