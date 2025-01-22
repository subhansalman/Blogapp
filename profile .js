import {getDoc, doc, db, auth, onAuthStateChanged} from "./firebase.js"

const authCheck=()=>{
    onAuthStateChanged(auth,(user)=>{
        if(!user){
            alert("User Is Login")
            window.location.replace("./index.html")
        }else{
            console.log("User is login",user.uid)
            localStorage.setItem("uid",user.uid)
            fetchUserData()
        }
    })
}


const userUID=localStorage.getItem("uid")
console.log("user uid",userUID)
const parent=document.querySelector("#parent")
const username=document.getElementById("username")
const profilePic= document.getElementById("profile")


const fetchUserData= async ()=>{
    try {
        
        const userDoc= await getDoc(doc(db,"users",userUID))
        username.innerHTML="";
        parent.innerHTML="";
        if(userDoc.exists()){
            const userData= userDoc.data()
            if(userData){
                username.innerHTML=`${userData.fullName}`
                parent.innerHTML=`<h2>Profile Details</h2>
                <div class="detail" >
                    <strong>Date of Birth:</strong> <span id="date">${userData.birthDay}</span>
                </div>
                <div class="detail">
                    <strong>Email:</strong> <span id="email-signup">${userData.userEmail}</span>
                </div>
                <div class="detail">
                    <strong>Phone:</strong> <span id="Phone" >${userData.phoneNumber}</span>
                </div>`
            }else{
                console.log("No user Data")
            }

        }else{
            console.log("No Such User Document Available")
        }
    } catch (error) {
        console.log("Error ", error.message)
    }
}

const intProfilePage= ()=>{
    fetchUserData()
}

window.intProfilePage=intProfilePage;
window.authCheck=authCheck;