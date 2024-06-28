import React  from 'react';
import { motion } from 'framer-motion';
import { MdQuestionMark } from "react-icons/md";
import { FlipCardTypes } from '../../../Entities/game-data';


const FlipCard:React.FC<FlipCardTypes> = ({image,gameStart,opened,handleCardClick}) => {


  return (
    <div
      onClick={handleCardClick} 
      className="perspective-1000 relative  w-40 cursor-pointer h-36 grid place-items-center"
    >
      <motion.div
        initial={{ rotateY: 0}}
        animate={{ rotateY: gameStart ? (opened ? 0 : 180) : 0 }}
        transition={{duration:.25}}
        className="w-full h-full absolute  [transform-style:preserve-3d] [transition:transform_0.6s]"
      >
         <div  className="w-full h-full absolute p-5 bg-purple-100 flex items-center justify-center text-black [backface-visibility:hidden]">
        <img width={80} src={image} />

         </div>
        <div className="w-full h-full absolute bg-purple-400 text-white flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <MdQuestionMark className='text-4xl'/>
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard;
