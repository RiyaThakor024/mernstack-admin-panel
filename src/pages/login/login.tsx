import { Layout, Card, Space,Form,Input,Checkbox,Button, Flex} from "antd";
import { LockFilled ,UserOutlined,LockOutlined } from '@ant-design/icons';
import { Logo } from "../../components/icons/Logo";
export const LoginPage = () => {
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
      <Form initialValues={{remember:true}}>
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
        <Button type="primary" htmlType="submit" style={{width:'100%'}}>Login</Button>
        </Form.Item>
        
      </Form>
    </Card>
  
      </Space>
    </Layout>
  </>

}
