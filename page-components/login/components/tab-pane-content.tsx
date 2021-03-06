import {Col, Row, Input, Typography, Button, Form, message} from "antd";
import Link from "next/link";
import styles from "./index.module.scss";
import {useState,useContext,useEffect} from "react";
import {Store} from "../../../utils/store";
import Cookies from 'js-cookie';
import {
  EyeInvisibleFilled ,EyeFilled
} from "@ant-design/icons";
import axios from 'axios';
import {useRouter} from "next/router";
import {isMobileNumber, isRequired} from "../../../common/miscellaneous/form-rules";
const TabPaneContent = ({ type, activeTab }: { type: string; activeTab:string }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      if(activeTab === "1"  && !userInfo.isAdmin) router.push('/store/list');
      else router.push("/seller")
    }
  }, []);
  const handleSubmit = async (dto: any) => {
    try {
      if(activeTab === "1") {
        const { data } = await axios.post('/api/customers/login', dto);
        dispatch({ type: 'USER_LOGIN', payload: data });
        Cookies.set('userInfo', JSON.stringify(data));
        router.push(`/store/list`);
      }
      else {
        const { data } = await axios.post('/api/supermarkets/login', dto);
        dispatch({ type: 'USER_LOGIN', payload: data });
        Cookies.set('userInfo', JSON.stringify(data));
        router.push(`/registration_result?status=${data?.status}`);
      }
    } catch (err) {
      message.error(err.response.data ? err.response.data.message : err.message);
    }
  };
  return (
      <Form onFinish={handleSubmit}>
        <Row
            justify="center"
            align="middle"
            className={styles["tab-pane-container"]}
        >
          <Col span={18}>
            <Typography.Title level={4}>ورود به حساب کاربری</Typography.Title>
            <Form.Item name="phoneNumber" rules={[isRequired,isMobileNumber]}>
              <Input placeholder="شماره همراه" />
            </Form.Item>
            <Form.Item name="password" rules={[isRequired]}>
              <Row className={styles["password-container"]}>
                <Input placeholder="رمز عبور" type={passwordShown ? "text" : "password"} id="password"/>
                <i onClick={togglePassword}>{passwordShown ? <EyeInvisibleFilled />:<EyeFilled /> }</i>
              </Row>
            </Form.Item>
            <Row justify="end">
              <Link href={`/recovery?user=${type}`}>رمز عبور خود را فراموش کرده‌اید؟</Link>
            </Row>
            <Button htmlType="submit">ورود</Button>
            <Row style={{marginBottom: "60px",marginTop: "12px"}}>
              <Typography.Text>
                حساب کاربری ندارید؟
                <Link href={`/register?activeTab=${activeTab}`}>عضویت در حیفه‌س</Link>
              </Typography.Text>
            </Row>
          </Col>
        </Row>
      </Form>
  );
};
export default TabPaneContent;
