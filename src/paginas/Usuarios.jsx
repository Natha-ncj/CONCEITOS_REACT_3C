import { useEffect, useState } from "react";

export default function Usuarios() {
    const [cont, setCont] = useState(0);
    const [usuarios, setUsuarios] = useState([]);
    const [modal, setModal] = useState(false);

    const [id, setId] = useState(null);
    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const aumenta = () => {
        setCont(cont + 1);
    };

    const buscarUsuarios = async () => {
        try {
            const resultado = await fetch("http://localhost:3000/usuario");
            const data = await resultado.json();
            setUsuarios(data);
        } catch (erro) {
            console.error(erro);
        }
    };

    useEffect(() => {
        document.title = `count: ${cont}`;
        buscarUsuarios();
    }, []);

    const editar = (usuario) => {
        console.log("editando", usuario);

        setId(usuario.id);
        setEmail(usuario.email);
        setNome(usuario.nome);
        setSenha(usuario.senha);

        setModal(true);
    };

    const confirmarEdicao = async () => {
        try {
            const resultado = await fetch(
                `http://localhost:3000/usuario/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome,
                        senha,
                    }),
                }
            );

            const data = await resultado.json();
            console.log(data);
            await buscarUsuarios();

            setModal(false);
        } catch (erro) {
            console.error(erro);
        }
    };

    const deletar = async (usuario) => {
        const resultado = await fetch(`http://localhost:3000/usuario/${usuario.id}`,{
            method: 'DELETE'
        })
    }

    return (
        <div>
            <h1>Usuarios</h1>

            {cont}

            <button onClick={aumenta}>aumenta</button>

            <br />
            <br />

            <ul>
                {usuarios.map((usuario) => (
                    <li key={usuario.id}>
                        {usuario.email}
                        <br />
                        STATUS: {usuario.ativo ? "Ativo" : "Desativo"}
                        <br />
                        <button onClick={() => editar(usuario)}>
                            Editar
                        </button>
                    </li>
                ))}
            </ul>

            {modal && (
                <div
                    className="fundo-modal"
                    onClick={() => setModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1>Editar</h1>

                        <input
                            type="text"
                            id="email"
                            value={email}
                            disabled
                        />

                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            placeholder="Digite seu nome"
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            type="text"
                            id="senha"
                            value={senha}
                            placeholder="Digite sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button onClick={() => setModal(false)}>
                            Fechar
                        </button>

                        <button onClick={confirmarEdicao}>
                            Confirmar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}