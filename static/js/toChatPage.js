const chatProfilesElements = document.querySelectorAll('.chatProfiles')
const chatPageElem = document.querySelector('.chatPage')
chatProfilesElements.forEach(elem => {
    elem.addEventListener('click',(e)=>{
        e.preventDefault()
        chatSelection.style.display = "none"
        chatPageElem.style.display = "block"
        let userFirstName  = elem.querySelector('.namingArea > .firstName > span').textContent
        getlatest(User,userFirstName.toLowerCase())
        chatPageElem.innerHTML = chatPage(userFirstName)
        const backIcon = document.querySelector(".backIcon")
        backIcon.addEventListener("click",()=>{
            chatSelection.style.display = "flex"
            chatPageElem.style.display = "none"
        })
        document.querySelector('.msgsend').addEventListener('click', (e) => {
            e.preventDefault()
            let user_n = User
            let companion = userFirstName.toLowerCase()
            let message = document.querySelector(".msginput").value
            console.log("working",user_n, companion);
                fetch("/chat", {
                    method: "POST",           // Type of request
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({     // Data to send to the server
                        user_name: user_n,
                        companion_name: companion,
                        message:message
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        document.querySelector(".chatsmesseges").innerHTML += `
                        <div class="msg sent">${data.newmsg[0].message}</div>  
                        `
                        let currentScroll = document.querySelector('.chatsmesseges').scrollTop
                        let futureScroll = document.querySelector('.chatsmesseges').scrollHeight
                        document.querySelector('.chatsmesseges').scrollTo(currentScroll,futureScroll)
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
        
        })
        let user_n = User
        let companion = userFirstName.toLowerCase()
        console.log("working",user_n, companion);
        fetch("/previous_chat", {
                method: "POST",           // Type of request
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({     // Data to send to the server
                    user_name: user_n,
                    companion_name: companion,
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Response from server:", data);
                    
                    for (let i = 0; i < data.all_messages.length; i++){
                        // console.log(data.all_messages[i].from);
                        console.log(data.all_messages[i].to);
                        
                        if (data.all_messages[i].user == User && data.all_messages[i].to == companion) {
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
        })
});
