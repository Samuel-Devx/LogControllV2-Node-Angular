import createApplication from './app'
import dotenv from 'dotenv';
dotenv.config()

const app = createApplication ();

const porta = process.env.PORT;


 app.listen(porta, () => {console.log(`✅ Backend Rodando na porta ${process.env.PORT}.`)})



