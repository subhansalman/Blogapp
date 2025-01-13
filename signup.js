import{auth, createUserWithEmailAndPassword, onAuthStateChanged, setDoc} from "./firebase.js"

const authCheck= ()=>{
    onAuthStateChanged(auth,(user)=>{
        if(user){
            window.location.replace("./index.html")
            console.log("User is already Signed up")
        }else{
            console.log("User not Signed up")
        }
    })
}

const email=document.querySelector("#email-signup")
const password= document.querySelector("#email-password")
const userName= document.querySelector("#username")
const userPhone= document.querySelector("#Phone")
const userbirthdate= document.querySelector("#date") 


const signupHandler= async()=>{
//     if(!email || !password || !userName || !userPhone || !userbirthdate){
//         alert("Fill all the required files")
//         return
//     }

//     const response= await createUserWithEmailAndPassword(auth, email.value, password.value)

//     await setDoc(doc(db,"users",response.user.uid),{
//         fullName:userName,
//         phoneNumber:userPhone,
//         birthDay:userbirthdate,
//         userEmail:email,
//         userPassword:password
//     })

//     window.location.replace("./index.html")
// }

if(!email || !password || !userName || !userPhone || !userbirthdate){
    alert("Enter all the required fields")
    return
}

const response =await createUserWithEmailAndPassword(auth, email.value, password.value)
await setDoc(doc(db,"users",response.user.uid),{
    fullName:userName,
         phoneNumber:userPhone,
        birthDay:userbirthdate,
        userEmail:email,
        userPassword:password
})

alert("user Successfully sign up")
window.location.replace("./index.html")
}



window.authCheck=authCheck
window.signupHandler=signupHandler