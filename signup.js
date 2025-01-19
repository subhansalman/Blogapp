import{auth, createUserWithEmailAndPassword,  setDoc, doc,db,onAuthStateChanged} from "./firebase.js"

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


const signupHandler = async () => {
    // Check if all required fields have values
    if (!email || !password || !userName || !userPhone || !userbirthdate) {
        alert("Enter all the required fields");
        return;
    }

    try {
        // Sign up the user with email and password
        const response = await createUserWithEmailAndPassword(auth, email.value, password.value);

        // Set user data in Firestore
        await setDoc(doc(db, "users", response.user.uid), {
            fullName: userName.value,
            phoneNumber: userPhone.value,
            birthDay: userbirthdate.value,
            userEmail: email.value,
            userPassword: password.value
        });

        alert("User successfully signed up");
        window.location.replace("./index.html");
    } catch (error) {
        console.error("Error signing up:", error.message);
        alert("Error signing up: " + error.message);
    }
};



window.authCheck=authCheck
window.signupHandler = signupHandler;
