
function getlatest(x,y) {
    setInterval(() => {
        console.log("fetched");

        fetch("/previous_chat", {
            method: "POST",           // Type of request
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({     // Data to send to the server
                user_name: x,
                companion_name: y,
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Response from server:", data);
                document.querySelector(".chatsmesseges").innerHTML = ''
                for (let i = 0; i < data.all_messages.length; i++){
                    if (data.all_messages[i].user == x && data.all_messages[i].to == y) {
                        document.querySelector(".chatsmesseges").innerHTML += `
                        <div class="msg sent">${data.all_messages[i].message}</div>  
                        `
                        let currentScroll = document.querySelector('.chatsmesseges').scrollTop
                        let futureScroll = document.querySelector('.chatsmesseges').scrollHeight
                        document.querySelector('.chatsmesseges').scrollTo(currentScroll,futureScroll)
                    }
                    else
                    {
                        document.querySelector(".chatsmesseges").innerHTML += `
                        <div class="msg rcvd">${data.all_messages[i].message}</div>  
                        `
                        let currentScroll = document.querySelector('.chatsmesseges').scrollTop
                        let futureScroll = document.querySelector('.chatsmesseges').scrollHeight
                        document.querySelector('.chatsmesseges').scrollTo(currentScroll,futureScroll)
                    }
                    
                }
                
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }, 5000);
    
}