import app from './app';
import { connectDB} from './db/connection';


connectDB();

app.listen(3000, () => {
    console.log('Server v2 is running on port 3000');
    console.log('v1: http://localhost:3000/api/v1/');
    console.log('v2: http://localhost:3000/api/v2/');
});