import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { user_service } from '@/context/AppContext'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'


const LoginPage = () => {
  const responseGoogle=async(authResult:any)=>{
     try{
     const result =await axios.post(`${user_service}/api/v1/login`,{
      code:authResult["code"]
     });
     Cookies.set("token",result.data.token,{
      expires:5,
      secure:true,
      path:"/"
     });
     toast.success(result.data.message);

     }catch(error){
       console.log("Error occurred",error);
       toast.error("Problem while logging occurred");
     }

  };

  const googleLogin =useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:"auth-code",

  })
  return (
    
    <div className='w-[350px] m-auto justify-center mt-50 '>
 <Card className="w-full max-w-sm">
    <CardHeader>
     <CardTitle>Login to the Reading Retreat</CardTitle>
     <CardDescription>Lets understand the preprestive of ideas</CardDescription>
</CardHeader>
<Button >
  Login with google {" "}
</Button>
    </Card>

   </div>
  )
}

export default LoginPage