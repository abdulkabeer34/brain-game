import { Table, TableColumnsType } from "antd"
import useStore from "../../../UseCases/store/store";
import { HistoryDataType } from "../../../Entities/game-data";


const TableColumsnData :TableColumnsType<HistoryDataType> =[
    {title:"Game Id" , dataIndex :"GameId" , key : "GameId"},
    {title:"Time Taken" , dataIndex :"TimeTaken" , key : "TimeTaken"}
]


export const History = () => {
    const store = useStore();
    const newStore = store.history.map(item=>({
        ...item,
        TimeTaken : `${item.TimeTaken[0]} Mins , ${item.TimeTaken[1] } Seconds`
    }));

  return (
   <div className="flex items-center flex-col font-mono mt-11 h-[80vh] bg-purple-50">
    <h1 className="w-4/5 text-2xl ">History</h1>
    <Table className="w-4/5 mt-9 bg-purple-50"  pagination={{pageSize:6}} columns={TableColumsnData} dataSource={newStore}/>
   </div>
  )
}
