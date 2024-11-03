function chatPage(firstName) {
    return `
    <header>
        <div class="backIcon">
            <img width="30" height="30" src="https://img.icons8.com/material-rounded/24/FFFFFF/arrow-pointing-left.png" alt="arrow-pointing-left"/>
        </div>
        <div class="image">
            <img src="https://img.icons8.com/3d-fluency/94/administrator-male--v2.png" alt="administrator-male--v2"/>
        </div>
        <div class="namingArea">
            <div class="firstName">${firstName}</div>
        </div>
        
    </header>
    <div class="chatsmesseges"></div>
        <footer>
            <textarea name="msginput" class="msginput"></textarea>
            <button class="msgsend">
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/50/FFFFFF/sent.png" alt="sent"/>
            </button>
        </footer>
    `
}
// document.querySelector(".msgsend").addEventListener("click",()=>{
//     navigator.vibrate(50);
// })
