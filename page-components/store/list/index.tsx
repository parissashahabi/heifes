import StoreBanner from "./components/store-banner/index"
import {Button, Row, Typography,Col} from "antd";
import { useRouter } from "next/router";
import React, {useEffect} from "react";
import ArrowLeft from "../../../public/icons/arrowLeft.svg"
import styles from "./index.module.scss"
import SearchBarHeader from "../../../common/components/searchBarHeader";
import ProductCard from "./components/store-product-card/index"
import Banner from "./components/store-banner/index";


const StoreList = () => {

    const router = useRouter();
    useEffect( () => {
        const { id } = router.query;
        // getStoreDetails(id);
    }, []);

    // دیتای آزمایشی
    const cities = [
        "1",
        "2",
        "3"
    ];
    const stores=[
        {
            name: "سوپر مارکت ستاره",
            rate: "4.6",
            address: "اصفهان، شیخ مفید، نبش فرعی لاله ",
            img: "https://statics.basalam.com/public/users/AgPpB/2106/e6uTwceQpMXSognejk21fuan5ikIxXYWJHRTyXHO.jpeg_512X512X70.jpeg",
        },
    ]

    return <>
        <Banner stores={stores} />
        <Row style={{marginTop: "30px"}}>
            <SearchBarHeader
                inputPlaceholderLabel="جستجوی نام فروشگاه..."
                page={`store-${router.query.id}`}
                // onSearch={onSearch}

            />
        </Row>
        <Row className={styles["cards"]}>
            {stores.map(store => {
                return <ProductCard store={store}/>
            })}
        </Row>

    </>;
};
export default StoreList;
