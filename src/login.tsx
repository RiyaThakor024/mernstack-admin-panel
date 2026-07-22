import { Layout, Card, Space,Form,Input,Checkbox,Button, Flex, Alert} from "antd";
import { LockFilled ,UserOutlined,LockOutlined } from '@ant-design/icons';
import { Logo } from "./components/icons/Logo";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Credentials } from "./types";
import { login,self } from "./http/api";
import { useEffect } from "react";
import {useAuthStore} from '../store.ts';

const loginUser = async (credential: Credentials)=>{
  //server call logic
  const {data} = await login(credential);
  return data;
}
const getSelf = async()=>{
  const {data} = await self();
  return data;
}
export const LoginPage = () => {

   const {setUser} = useAuthStore();

  const {data: selfData,refetch} = useQuery({
    queryKey:['Self'],
    queryFn:getSelf,
    enabled:false,
  });
   
   useEffect(() =>{
    if(selfData){
      console.log("UserData:",selfData);
      
    }
   },[selfData]);

  const {mutate,isPending,isError,error} = useMutation({
    mutationKey:['Login'],
    mutationFn:loginUser,
    onSuccess:async(data)=>{
      
      
      localStorage.setItem('accessToken',data.accessToken);
      localStorage.setItem('refreshToken',data.refreshToken);
        const result = await refetch();
        if (result.data) {
      setUser(result.data);
      console.log('UserData:',result.data);
          
        }
       
      console.log("Login successful");
      
    }
  })
  return <>
  {/* <h1>Sign in</h1>
  <input type="text" placeholder="Username" />    
  <input type="password" placeholder="Password" />    
  <button>Login</button>
  <label htmlFor="remember-me">Remember me</label>
  <input type="checkbox" id="remember-me" />
  <a href="#">Forgot Password</a> */}
   <Layout
     style={{
        height:'100vh',
        display:'grid',
        placeItems:'center  '
     }}
   >  
      <Space direction="vertical" align="center" size="large">
            <Layout.Content style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
      <Logo />
     
    </Layout.Content>
    <Card
       variant="borderless"
       style={{width:300}}
       title={
      <Space style={{width:'100%', fontSize:16 ,justifyContent:'center'}}>
        <LockFilled />
        Sign in
      </Space>}>
      <Form initialValues={{remember:true}}
      onFinish={(values)=>{
        mutate({email:values.username,password:values.password});
        console.log(values);
        
      }}
      >
        {isError && <Alert type="error" message={error?.message}/>}
        <Form.Item name="username" rules={[
          {
            required:true,
            message:"Please input your Username"
          },
          {
            type:"email",
            message:"Email is not valid"
          }
        ]}>
            <Input prefix={<UserOutlined />} placeholder="Username"/>
        </Form.Item>
         <Form.Item name="password" rules={[
          {
            required:true,
            message:"Please input your Password"
          }
         ]}>
            <Input.Password  prefix={<LockOutlined />} placeholder="Password"/>
        </Form.Item>
        <Flex justify="space-between">
          <Form.Item name="remember" valuePropName="checked">
         <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <a href="#" className="forgot-password">Forgot Password</a>
        </Flex>
        <Form.Item name="password">
        <Button type="primary" htmlType="submit" style={{width:'100%'}} loading={isPending}>Login</Button>
        </Form.Item>
        
      </Form>
    </Card>
  
      </Space>
    </Layout>
  </>

}
