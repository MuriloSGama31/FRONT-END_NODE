import {useEffect, useState, useRef} from 'react'
import './style.css'
import Fundo from '../../assets/fundo.jpg'
import Lixeira from '../../assets/lixeira.png'
import Editar from '../../assets/editar.png'
import api from '../../services/api'

function Home() {
  const [usuarios, setUsuarios] = useState([])
  const [editandoUsuario, setEditandoUsuario] = useState(null)

  const inputNome = useRef()
  const inputEmail = useRef()
  const inputIdade = useRef()

  async function getUsuarios(){
    const usuariosDaApi = await api.get('/cadastro')
    setUsuarios(usuariosDaApi.data)
    console.log(usuarios)
  }

  async function createUsuarios(){
    await api.post('/cadastro',{
      email: inputEmail.current.value,
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
    })
    getUsuarios()
  }
  
  async function updateUsuario(){
    if(!editandoUsuario) return

    await api.put(`/cadastro/${editandoUsuario.id}`, {
      email: inputEmail.current.value,
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
    })
    
    setEditandoUsuario(null) // Limpa o estado de edição
    getUsuarios()
  }

  async function deleteUsuarios(id){
    await api.delete(`/cadastro/${id}`)
    getUsuarios() // Chama a função para atualizar a lista após a exclusão
  }
  
  function abrirModalEdicao(usuario){
    setEditandoUsuario(usuario)
    inputNome.current.value = usuario.nome
    inputIdade.current.value = usuario.idade
    inputEmail.current.value = usuario.email
  }

  useEffect(()=>{
    getUsuarios()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="container"
    style={{
      backgroundImage: `url(${Fundo})`, 
    }}>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder='Digite seu nome' name="nome" type='text' ref={inputNome}/>
        <input placeholder='Digite sua idade' name="idade" type='number' ref={inputIdade}/>
        <input placeholder='Digite seu email' name="email" type='email' ref={inputEmail}/>
        {editandoUsuario ? (
            <button type='button' onClick={updateUsuario}>Atualizar</button>
        ) : (
            <button type='button' onClick={createUsuarios}>Cadastrar</button>
        )}
      </form>

      {usuarios.map(usuario => (
      <div key={usuario.id} className='card'>
        <div>
          <p>Nome: <span>{usuario.nome}</span></p>
          <p>Idade: <span>{usuario.idade}</span></p>
          <p>Email: <span>{usuario.email}</span></p>
        </div>
        <button onClick={() => abrirModalEdicao(usuario)}>
          <img className='editar' src={Editar} alt="Ícone de edição"/>
        </button>
        <button onClick={ () => deleteUsuarios(usuario.id)}>
          <img className='lixo' src={Lixeira} alt="Ícone de lixeira"/>
        </button>
      </div>
      ))}  
    </div>
  )
}
export default Home