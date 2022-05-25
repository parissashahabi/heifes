import {Form, Input, Button, Col, Typography, Row} from 'antd';
import styles from "./index.module.scss";
import {useContext} from "react";
import {Store} from "../../../../utils/store";
import changePassword from "../../../../common/functions/change-password";
import CustomerAvatar from "../../../../public/icons/customerAvatar.svg";



const DashboardPage = () => {
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    return (
        <Row justify={"space-between"}>
            <Col  className={styles["profile"]}>
                <Row  justify={"center"} >
                    <CustomerAvatar style={{margin: "20px", width:"100px"}} />
                    <Row justify={"center"}>
                        <Typography.Text
                            style={{color:"#7E7E7E", fontSize:"16px" ,fontWeight:"500" }}>
                            name
                        </Typography.Text>
                        <Typography.Text
                            style={{color:"#A0A0A0", fontSize:"16px" ,fontWeight:"500" }}>
                            phoneNumber
                        </Typography.Text>
                        <Button  className={styles["edit-btn"]}>
                            ویرایش پروفایل
                        </Button>
                    </Row >

                </Row>


            </Col>
            <Col className={styles["order-list"]}>
                <Typography.Title
                    level={3} style={{color:"#707070", margin:"20px" }}>
                    سفارشات جاری
                </Typography.Title>

            </Col>
        </Row>
    );
};

export default DashboardPage;