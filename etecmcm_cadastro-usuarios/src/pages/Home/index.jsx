import './style.css'
import Fundo from '../../assets/fundo.jpg';
import Lixeira from '../../assets/lixeira.png';

function Home() {
  const usuarios = [{
    id: '7839202',
    nome: 'Fulano Moura',
    idade: 27,
    email: 'fulanomoura@gmail.com'
  }, {
    id: '0152945',
    nome: 'Carlos Freitas',
    idade: 61,
    email: 'freitascarlos@gmail.com'
  }]
  return (
    <div className="container"
    style={{
      backgroundImage: `url(${Fundo})`, 
    }}>
      <form>
        <h1>Olá Etec MCM</h1>
        <input name="nome" type='text'/>
        <input name="idade" type='number'/>
        <input name="email" type='email'/>
        <button type='button'>Cadastrar</button>
      </form>

      {usuarios.map(usuario => (
      <div key={usuario.id} className='card'>
        <div>
          <p>Nome: {usuario.nome}</p>
          <p>Idade: {usuario.idade}</p>
          <p>Email: {usuario.email}</p>
        </div>
        <button>
          <img className='lixo' src={Lixeira}/>
        </button>
        </div>
      ))}  
    </div>
  )
}
export default Home
