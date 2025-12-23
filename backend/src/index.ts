import express from 'express'
import { connectToDatabase } from './database/index.js'



await  connectToDatabase()

const app = express()

app.use(express.json())

let arr:string[]=[]

app.get('/', (req, res) => {
  res.json(arr)
})

app.post('/',(req,res)=>{

  const data=req.body

  arr.push(data.value)
  res.send("Success")
})

app.put('/',(req,res)=>{
  const data=req.body

  const value=data.value

  arr= arr.filter(item=>item!==value)

  res.send("Success")

})

app.listen(4000, () => {
  console.log(`Example app listening on port 4000`)
})