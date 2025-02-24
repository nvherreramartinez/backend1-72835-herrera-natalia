import { connect } from "mongoose";
import { config } from '../config/index.js'

export const initMongoDBAtlas = async () => {
    try {
        await connect(config.Db.connectionString)
        } catch (error) {
            console.error(
                `Error en la conexión a la base de datos, motivo: "${error.message}"`
        )
    }
}