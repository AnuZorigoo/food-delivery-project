import {connect} from 'mongoose'

export const connectToDatabase = async () => {
    await connect('mongodb+srv://Anu:aZa3lbIS93FZda79@cluster0.hjiwg2n.mongodb.net/?appName=Cluster0')
}  