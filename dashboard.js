import { addDoc, auth, collection, db, doc, getDocs, getDoc, onAuthStateChanged, setDoc, updateDoc } from "./firebase.js";

// Define authCheck
const authCheck= ()=>{
    onAuthStateChanged(auth,(user)=>{
        if(!user){
            window.location.replace("./index.html")
            console.log("user not login")

        }else{
            console.log("user already loggedin")
            console.log("User UID:", user.uid)
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
const blogBlock=document.querySelector("#blogblock")
const title = document.querySelector("#blogtitle");
const desc = document.querySelector("#blogdesc");
const checkbox = document.querySelector("#checkbox");

const blogPost= async()=>{
    console.log("Blog post")
    const blogobj={
        title:title.value,
        desc:desc.value,
        isPrivate:checkbox.checked,
        userUID:localStorage.getItem("uid")
    }
    const addingBlog= await addDoc(collection(db,"userBlog"),blogobj)
    console.log("addingBlog",addingBlog)
    blogBlock.innerHTML=""
    getPost()
}

// Define getPost
const getPost = async () => {
    console.log("Fetching posts");
    try {
       const parent=document.querySelector("#parent")
       const snapShot= await getDocs(collection(db,"userBlog"))
       parent.innerHTML=""
       snapShot.forEach((doc)=>{
        const data=doc.data()
        const isPrivate=data.isPrivate ? "Prvate" : "Public"
        const editBtn=data.userUID===localStorage.getItem("uid") ? "<button onClick='updateBtn(this)'>Edit</button>":""
        
        if(data.isPrivate){
            if(data.uid===localStorage.getItem("uid")){
                parent.innerHTML+=`
                <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.desc}</p>
        ${editBtn}
      </div>
    </div>
  </div>
                `
            }
        }else{
            parent.innerHTML+=`
                <div class="col-sm-6 col-md-4 col-lg-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">${data.desc}</p>
        ${editBtn}
      </div>
    </div>
  </div>
                `
        }
       })
       } catch (error) {
        console.error("Error fetching posts:", error.message);
    }
};

const updateBtn= async(ele)=>{
    try {
        console.log("updateBlog", ele.id)
        const editBlog= prompt("Enter the edit Value")
        const editDesc= prompt("Enter the edit Value")
        if(!editBlog){
            alert("Edit value is ot there")
            return
        }
        
        await updateDoc (doc(db,"userBlog",ele.id),{
            title:editBlog,
            desc:editDesc
        })

        console.log("Blog Updated Succesfully")
    } catch (error) {
        console.log("Error:",error.message)
    }
}

// Attach functions to window object
window.blogPost = blogPost;
window.authCheck = authCheck;
window.getPost = getPost;


