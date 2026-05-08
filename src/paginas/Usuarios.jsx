import { use, useEffect, useState } from "react"

export default function Usuarios(){
    const [cont, setCont] = useState(0)

    const aumenta = () => {
        setCont(cont + 1)
    }

    const diminui = () => {
        setCont(cont - 1)
    }

    useEffect(() => {
        document.title = `count: ${cont}`
        if(cont === -10){
            alert("DEU MAN CHEGA!")
        } else if(cont === 10){
            alert("MAN TU É BURRO!?")
        }
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

