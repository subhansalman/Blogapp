import{ auth, onAuthStateChanged, signInWithEmailAndPassword }from "./firebase.js"


const authcheck=()=>{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            window.location.replace("./dashboard.js")
            console.log("User Already logged in")
        }else{
            console.log("User not logged in")

        }
    })
}

const email=document.querySelector("#email-signup")
const password=document.querySelector("#email-password")

const loginHandler= async ()=>{
    try {
        if(!email || !password){
            alert("Email or Password is not available")
            return
        }
        
        const response= await signInWithEmailAndPassword(auth, email.value, password.value )
        const uid=response.user.uid
        localStorage.setItem("uid",uid)
        
        alert("User Login Successfully")
        window.location.replace("./dashboard.html")

    } catch (error) {
        console.log("error",error.message)
    }
}





window.loginHandler=loginHandler

window.authcheck=authcheck