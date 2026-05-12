import createApplication from './app'

const app = createApplication ();

const porta = 3333;


 app.listen(porta, () => {console.log(`✅ Backend Rodando na porta ${porta}.`)})



