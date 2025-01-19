import { addDoc, auth, collection, db, doc, getDocs, getDoc, onAuthStateChanged } from "./firebase.js";

// Define authCheck
const authCheck=()=>{
    onAuthStateChanged(auth,(user)=>{
        if(!user){
            window.location.replace("./index.html")
            console.log("User not sign in")
        }else{
            const
        }
    })
}

// Function to fetch user data
// const fetchUserData = async (userUid) => {
//     try {
//         const userData = await getDoc(doc(db, "users", userUid));
//         console.log(userData.data());
//         if (userData.exists()) {
//             console.log("User data:", userData.data());
//         } else {
//             console.log("No such document!");
//         }
//     } catch (error) {
//         console.error("Error fetching user data:", error.message);
//     }
// };

// Define blogPost
const title = document.querySelector("#blogtitle");
const desc = document.querySelector("#blogdesc");
const checkbox = document.querySelector("#checkbox");
const blogPost = async () => {
    try {
        console.log("blogPost");
        const obj = {
            title: title.value,
            desc: desc.value,
            isPrivate: checkbox.checked,
            uid: localStorage.getItem('uid'),
        };
        await addDoc(collection(db, "blogs"), obj);
        alert("Blog created successfully!");
        getPost();
    } catch (error) {
        console.log("Error:", error.message);
    }
};

// Define getPost
const getPost = async () => {
    console.log("Fetching posts");
    try {
        const parent = document.getElementById("parent");
        const snapShot = await getDocs(collection(db, "blogs"));
        parent.innerHTML = "";
        snapShot.forEach((doc) => {
            const data = doc.data();
            const isPrivate = data.isPrivate ? "Private" : "Public";
            const editButton = data.uid === localStorage.getItem("uid") ? "<button>EDIT</button>" : "";

            parent.innerHTML += `
                <div>
                    <li>${data.title}</li>
                    <li>${data.desc}</li>
                    <li>${isPrivate}</li>
                    ${editButton}
                    <hr />
                </div>
            `;
        });
    } catch (error) {
        console.error("Error fetching posts:", error.message);
    }
};

// Attach functions to window object
window.blogPost = blogPost;
window.authCheck = authCheck;
window.getPost = getPost;
