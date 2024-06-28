import { Button,  message } from "antd";
import { Images } from "../../../UseCases";
import { useEffect, useState } from "react";
import FlipCard from "../../Components/Card";
import useStore from "../../../UseCases/store/store";
import { randomizedImagesTypes } from "../../../Entities/game-data";
import { setRandomImages } from "../../../UseCases/utils";



export const GameArea = () => {
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [visibleBlocks, setVisibleBlocks] = useState<number>(-1);
  const [time, setTime] = useState<Array<number>>([0, 0]);
  const [interval, setIntervalid] = useState<number | null>();
  const [imageData, setImageData] = useState<Array<randomizedImagesTypes>>([]);
  const [api,contextHolder]  =  message.useMessage();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [gameId,setGameId] = useState<number>(-1)
  const store = useStore();

  useEffect(() => {
    setImageData(setRandomImages(Images));
  }, []);

  const startGame = () => {
    setGameStart(true);
    const id = window.setInterval(IncreaseTheInterval, 1000);
    setIntervalid(id);
    setGameId(Math.floor(Math.random()*100000))
  };

  const stopGame = () => {
    interval && clearInterval(interval);
    setIntervalid(null);
    Success()
    setGameStart(false);
  };

  const checkIfBlockAreaSame = (i: number, j: number) => {
    if (imageData[i].id === imageData[j].id) return true;
    return false;
  };

  const handleCardClick = async (index: number) => {
    if (imageData[index].opened || !gameStart || isProcessing) return;
    setIsProcessing(true);

    const data = imageData.map((item, i) => {
      if (i === index) {
        item.opened = true;
      }
      return item;
    });

    setImageData(data);
   
    setVisibleBlocks((prev) => {
      const data = prev;

      if (data != -1) {
        const response = checkIfBlockAreaSame(data, index);
        if (!response) {
          setTimeout(() => {
            const newData = imageData;
            imageData[index].opened = false;
            imageData[data].opened = false;
            setImageData(newData);
          }, 800);
        }
        else if(checkGameEnded()){
             stopGame();
        }
        return -1;
      }



      return index;
    });

    setIsProcessing(false);
  };

  const IncreaseTheInterval = () => {
    setTime((prev) => {
      let [mins, secs] = prev;
      if (mins === 59) return [mins + 1, 0];
      else return [mins, secs + 1];
    });
  };

  const checkGameEnded   = ()=>{
    const gameEnded = imageData.every(e=>e.opened);
    console.log(gameEnded)
    return gameEnded;
  }

  const resetGame = ()=>{
    setImageData(setRandomImages(Images));
    stopGame();
    store.addData(gameId,time)
    setTime([0,0]);
    setGameId(-1)
  }

  
  const Success = () => {
     api.open({
      type : "success",
      content: "The game history has been saved",
      style:{
        position:"relative",
        top:"130px"
      }
    });
  };


  return (
    <>
     {contextHolder}
      <div className="navbar-main h-24 py-5 bg-purple-50  flex items-center justify-between px-10 font-mono cursor-pointer">
        <div></div>
        <div className=" flex flex-col items-center gap-3">
          <Button onClick={gameStart?resetGame:startGame} className="w-32 h-10 bg-purple-800 text-white">
            {gameStart ? "Reset Game" : <span>Start</span>}{" "}
          </Button>
          <div className="timer">
            {time[0]}:{time[1]}
          </div>
        </div>
        <div className="">
          <h1 className="text-lg">Game Id : {gameId === -1 ? "----" : gameId}</h1>
        </div>
      </div>
      <div className="game-area bg-purple-50 h-[auto] grid place-items-center ">
        <div className="center w-[100%] h-[100%] grid grid-cols-6 grid-rows-6  gap-x-7 gap-y-5 place-items-center px-9 py-4">
          {imageData.map(({ item, opened }, index) => {
            return (
              <FlipCard image={item} gameStart={gameStart} opened={opened}  handleCardClick={()=>handleCardClick(index)}/>
            );
          })}
        </div>
      </div>

    </>
  );
};




