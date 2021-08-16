import React from "react";
import TableItem from "../../component/TableItem/TableItem";
import ContentPage from "../../component/ContentPage/ContentPage";
import {editGoods} from "../../redux/slices/goods";

const goodsData = [
    ["1", "CPU FX-6300", "Procesor", "111.15 €"],
    ["2", "RAM 4GB", "Random Access Memory", "25.15 €"],
    ["3", "GPU 7790HD", "Graficka na hranie", "99.69 €"]
]


const Goods = () => {
    const goodsTableItems = goodsData.map(
        (goodsInfo) => <TableItem key={goodsInfo[0]} data={goodsInfo} tableCell={goodsInfo}
                                  modalToggle={editGoods}/>
    )
    return (
        <div>
            <ContentPage title="Goods" description="Here you can find the comprehensive list of goods."
                         tableData={goodsTableItems}
                         tableColumns={["ID", "Name", "Description", "Price", "Details"]}
                         toggleCreate={editGoods}
            />
        </div>
    )
};

export default Goods;
