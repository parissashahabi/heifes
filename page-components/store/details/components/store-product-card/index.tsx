import {Button, Card, message, Row, Typography} from "antd";
import styles from "./index.module.scss"
import Info from "../../../../../public/icons/info.svg"
import ProductInfo from "../modal";
import React, {useState, useContext, useEffect} from "react";
import axios from "axios";
import {Store} from "../../../../../utils/store"
const ProductCard = ({product}:{product: any})=>{
    useEffect(()=>{
        console.log("product",product)
    },[product])
    const { state, dispatch } = useContext(Store);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const addToCartHandler = async () => {
        // @ts-ignore
        const existItem = state.cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        // @ts-ignore
        const { data } = await axios.post(`/api/stocks/find-one`, {supermarketId: product?.supermarketId, productId:product?.productId });
        if (data.product_details_list?.countInStock < quantity) {
            // TODO change window.alert with antd notification or modal ---> DONE
            message.info('موجودی کالا به اتمام رسیده است.');
            return;
        }
        const payload = {
            quantity,
            price: product.price,
            countInStock: product.countInStock,
            productId: product.productId,
            supermarketId: product.supermarketId,
            stockId: product._id,
            product_details_list: {
                name: product.product_details_list.name,
            }
        }
        dispatch({ type: 'CART_ADD_ITEM', payload: payload });
    };

    return <div className={styles["container"]}>
        <Card
            hoverable
            style={{ width: 290 }}
            cover={
                <img
                    alt="example"
                    // @ts-ignore
                    src={product.product_details_list?.image}
                />
            }
            actions={[<Button id="info" icon={<Info/>} onClick={()=>setIsModalVisible(true)}/>,
                <Button id="add-to-card" onClick={addToCartHandler} disabled={product?.countInStock == 0}>{product?.countInStock == 0 ? "اتمام موجودی":"افزودن به سبد"}</Button>
            ]}
            className={styles["card"]}
        >
            {/*@ts-ignore*/}
            <Card.Meta title={product.product_details_list?.name} description={
                <Row className={styles["description"]}>
                    <Typography.Text id="price">
                        {/*@ts-ignore*/}
                        {product.price} تومان
                    </Typography.Text>
                    <Typography.Text id="old-price">
                        {/*@ts-ignore*/}
                        {product.oldPrice} تومان
                    </Typography.Text>
                </Row>

            } />
        </Card>
        <ProductInfo isModalVisible={isModalVisible} product={product} handleCancel={handleCancel}/>
    </div>
}
export default ProductCard;