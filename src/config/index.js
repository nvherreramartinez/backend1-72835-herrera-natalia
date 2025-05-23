import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url)
export const __dirname = join(dirname(__filename) + '../../../')

export const config = {
    dirname: __dirname,
    PORT: 8080,
    db: {
        connectionString: `mongodb+srv://@cluster0.t1su7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    },
}