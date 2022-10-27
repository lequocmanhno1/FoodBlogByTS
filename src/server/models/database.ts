import mongoose, {ConnectOptions} from 'mongoose';
import "dotenv/config";

//(mongoose as any).Promise = global.Promise

mongoose
      .connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then((res) => {
        console.log(
          'Connected to Database - Initial Connection'
        );
      })
      .catch((err) => {
        console.log(
          `Initial Database connection error occured -`,
          err
        );
      });
// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true,useUnifiedTopology:true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function(){
    console.log('Connected')
});

export {mongoose};

// Models
require('./Category');
require('./Recipe');