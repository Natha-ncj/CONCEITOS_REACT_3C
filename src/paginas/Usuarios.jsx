import { use, useEffect, useState } from "react"

export default function Usuarios(){
    const [cont, setCont] = useState(0)
    const [usuarios, setUsuarios] = useState([])

    const aumenta = () => {
        setCont(cont + 1)
    }

    useEffect(() => {
        document.title = `count: ${cont}`

        const buscarUsuarios = async  () => {
            const resposta = await fetch('http://localhost:3000/usuario')
            const usuarios = await resposta.json()
            console.log(usuarios);
        }
        buscarUsuarios()

    }, [cont])

    return (
        <div>
            <h1>USUARIOS</h1>
            {cont}
            <button onClick={() => aumenta()}>Aumenta</button>
            <button onClick={() => diminui()}>Diminui</button>
        </div>
    )
}

