let User = null;
document.addEventListener("DOMContentLoaded",()=>{
    User = prompt("Enter your user name: ")
})
const chatSelection =  document.querySelector('.chatSelection')
function chatProfiles(firstName,desciption) {
    return `
    <div class="chatProfiles">
        <div class="image">
            <img src="https://img.icons8.com/3d-fluency/94/administrator-male--v2.png" alt="administrator-male--v2"/>
        </div>
        <div class="namingArea">
            <div class="firstName">
                <span>${firstName}</span>
            </div>
            <div class="desciption">${desciption}</div>
        </div>
    </div>
    `
}

Users_firstName = [
    "Rehan",
    "Moeez",
    "Abdullah",
    "Sajid",
    "Haseeb"
]
Users_description = [
    "Sigma Boy ......",
    "Cool Minded Guy .......",
    "Rehan's Toy .......",
    "Handsome Jutt .......",
    "Nice boy........"
]
for (let index = 0; index < Users_firstName.length; index++) {
    chatSelection.innerHTML += chatProfiles(Users_firstName[index],Users_description[index])
}