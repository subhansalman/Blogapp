import{addDoc,auth,collection, onAuthStateChanged} from "./firebase.js"

const authCheck= ()=>{
    onAuthStateChanged(auth,(user)=>{
        if(!user){
            window.location.replace("./index.html")
        }else{
            console.log("Useris already logged in")
        }
    })
}


const userUID=localStorage.getItem("uid")



const blogPost= async()=>{
    try {
        console.log("blogpost")
        const blogTitle=document.querySelector("#blogtitle")
        const blogDesc=document.querySelector("#blogdesc")
        const checkbox=document.querySelector("#checkbox")
        const blogObj={
            title:blogTitle.ariaValueMax,
            desc:blogDesc.ariaValueMax,
            isPrivate:checkbox.ariaChecked,
            uid:userUID
        }

        await addDoc(collection(db,"blogs"),blogObj)
        alert("Blog Successfully Added")

        getPost()

    } catch (error) {
        console.log("error",error.message)
    }
}


const getPost = async () => {
    console.log("getPost get")
    try {
        const parent = document.getElementById("parent")
        const snapShot = await getDocs(collection(db, "blogs"))
        parent.innerHTML = ""
        snapShot.forEach((doc) => {
            if (doc.data().isPrivate) {
                if (doc.data().uid === localStorage.getItem("uid")) {
                    parent.innerHTML += 
            //         ` <div>
            //     <li> ${doc.data().title} </li>
            //     <li>${doc.data().desc}</li>
            //     <li> ${doc.data().isPrivate ? "Private" : "Public"} </li>
            //     ${doc.data().uid === localStorage.getItem("uid") ?

            //                 "<button>EDIT</button>" : ""
            //             }
            //     <hr />
            // </div>`
            `<div class="col-sm-6 col-md-4 mb-5">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${doc.data().title}</h5>
                <p class="card-text">${doc.data().desc}</p>
                <li> ${doc.data().isPrivate ? "Private" : "Public"} </li>
                ${doc.data().uid === localStorage.getItem("uid") ?

                                    "<button>EDIT</button>" : ""
                                }
                        <hr />
              </div>
            </div>
          </div>`
                }

            } else {
                parent.innerHTML += ` <div>
                <li> ${doc.data().title} </li>
                <li>${doc.data().desc}</li>
                <li> ${doc.data().isPrivate ? "Private" : "Public"} </li>
                ${doc.data().uid === localStorage.getItem("uid") ?

                        "<button>EDIT</button>" : ""
                    }
                
                <hr />
            </div>`
            }

        })

    } catch (error) {

    }

}


window.authCheck=authCheck
window.blogPost=blogPost
window.getPost=getPost