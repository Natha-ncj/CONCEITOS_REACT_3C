import { useState } from "react"

export default function Cadastro({navegar}){
const[email, setEmail] = useState('')
const[senha, setSenha] = useState('')
const[nome, setNome] = useState('')

const cadastrar = async() => {
    const resultado = await fetch('http://localhost:3000/usuario', {
    method: 'POST', 
    headers: { 'Content-type': 'application/json'},
    body: JSON.stringify({email, senha, nome})
        }
    )
    const data = await resultado.json()
    console.log(data);
    console.log(resultado.ok);
    if(!resultado.ok) {
        alert(data.error)
    } else {
        alert('Aceito!')
        navegar('login')
    }
}

    return (
        <div>
            <input type="text" 
            id="nome"
            value={nome}
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
            />
            <input type="text" 
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            />
            <input type="text" 
            id="senha"
            value={senha}
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
            />

            <h3>{email}</h3>
            <h3>{senha}</h3>
            <h3>{nome}</h3>

            <button onClick={() => cadastrar()}>cadastrar</button>

        </div>
    )
}