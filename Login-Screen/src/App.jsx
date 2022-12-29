import { login } from "./utils";
import "./index.css";
import { useState } from "react";

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs controlar os inputs (useRef)
//
// Tarefas:
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
	const [isRequesting, setIsRequesting] = useState(false);

	const [statusErr, setStatusErr] = useState(false);
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	function changeEmail(event) {
		let tempEmail = event.target.value;

		setStatusErr(false);
		setEmail(tempEmail);
	}

	function changePass(event) {
		let tempPass = event.target.value;

		setStatusErr(false);
		setPass(tempPass);
	}

	const handleSubmit = () => {
		const values = { email: email, password: pass };
		setIsRequesting(true);

		login(values)
			.then(() => {
				alert("login efetuado com sucesso.");
				console.log("sucesso");
			})
			.catch((error) => {
				setError(error);
				setStatusErr(true);
			})
			.finally(() => setIsRequesting(false));
	};

	return (
		<div className="wrapper">
			<div className="login-form">
				<h1>Login Form 🐞</h1>
				{statusErr && <div className="errorMessage">{error.message}</div>}
				<div className="row">
					<label htmlFor={"email"}>Email</label>
					<input
						id={"email"}
						type={"email"}
						autoComplete="off"
						onChange={changeEmail}
					/>
				</div>
				<div className="row">
					<label htmlFor={"password"}>Password</label>
					<input id={"password"} type={"password"} onChange={changePass} />
				</div>

				<div className="button">
					<button
						onClick={handleSubmit}
						disabled={
							isRequesting ||
							email == "" ||
							!email.includes("@") ||
							pass.length < 6
						}
					>
						Login
					</button>
				</div>
			</div>
		</div>
	);
}
