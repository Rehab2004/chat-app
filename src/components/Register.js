


import React,{createRef,useState} from 'react'
import { connect } from 'react-redux'
import { storage } from '../services/firebase'
import Cropper from 'react-easy-crop'
 const Register=(props)=>{
     const{auther}=props
     const uid=auther.user.uid
     const inputRef= createRef()
     const [value,setValue]=useState("select picture")
     const[inputImg,setInputImg]=useState("")
     const [loading,setLoading]=useState(false)
     const[img,setImg]=useState("")
     const[imgURL,setURL]=useState("")
     const[done,setDone]=useState(false)
     const [crop,setCrop]=useState({x:0,y:0})
     const[zoom,setZoom]=useState(1)

     const handleChange=(e)=>{
         
         setURL("")
         
          setImg(e.currentTarget.files[0])
          const file=e.currentTarget.files[0]
          const reader=new FileReader()
          reader.addEventListener("load",()=>{
              setInputImg(reader.result)
             console.log("inputImg:"+inputImg)
            
          })
    
          if(file){
              reader.readAsDataURL(file)
          }
     }
    
     const handleSubmit=(e)=>{
         e.preventDefault()
         setLoading(true)
         const upload= storage().ref("profiles").child(uid).put(img)
         upload.on("state_changed",
         function(_){},
         function(){
             upload.snapshot.ref.getDownloadURL().then((url)=>{
                 setLoading(false)
                 setValue("done")
                 setDone("true")
                 setURL(url)
                 console.log("url:"+url)

             })
         })

     }
     //croped img
     const createImg=(url)=>{
         new Promise((resolve,reject)=>{
             const image=new Image()
             image.addEventListener("load",()=>resolve(image))
             image.addEventListener("error",(error)=>reject(error))
             image.setAttribute('crossOrigin',"anomymous")
             image.src=url
         })
     }

     const cropedImg=async(url,obj)=>{
         const myImg= createImg(url)
         const canvas=document.createElement("canvas")
         const ctx=canvas.getContext("2d")
         canvas.width=50
         canvas.height=50
         ctx.drawImage(myImg,obj.x,obj.y,0,0,canvas.width,canvas.height)
        return new Promise((resolve)=>{
             canvas.toBlob((blob)=>{
                 resolve(blob)
             },"image/jepg")
         })
     }
     const onCropComplete=async(crop)=>{
           cropedImg(inputImg,crop)
           console.log(inputImg)
     }

    return(
        <div className="container">
            <div>
        <form onSubmit={handleSubmit}>
          
            <input type="file" ref={inputRef} accept="image/*" onChange={handleChange} />
            <button type="submit" >{value}</button>
        </form>
        </div>
        <div>
          {inputImg && !done&&(
        <Cropper image={inputImg} crop={crop} zoom={zoom} aspect={1} onCropChange={()=>setCrop} onZoomChange={()=>setZoom} onCropComplete={()=>onCropComplete}/>
          )}
        </div>
        </div>
    )
}
const mapStateToProps=({auther})=>{
    return{
        auther
    }
}
export default connect(mapStateToProps)(Register)