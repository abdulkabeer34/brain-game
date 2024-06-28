import {Instance, types as t} from "mobx-state-tree"

const GameData = t.model("game-data",{
    GameId : t.number,
    TimeTaken : t.array(t.number) 
})



const RootStore  = t.model("store",{
    history : t.array(GameData)
})
.actions((self)=>({
    addData(GameId:number,TimeTaken:number[]){
        self.history.push({GameId,TimeTaken})
    }
}))

const store = RootStore.create({
    history : []
})

export  type GameDataType = Instance<typeof GameData> 
export default store;