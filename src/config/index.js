import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Db } from 'mongodb'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = join(dirname(__filename) + '../../../')

export const config = {
    dirname: __dirname,
    PORT: 8080,
    /*Db: {
        connectionString: `mongodb+srv://nvherreramartinez:MbbnffoUAiAXLDVD@cluster0.t1su7.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Cluster0`,
    },*/
}