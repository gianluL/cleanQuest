import React from "react";
import { useCookies } from "react-cookie";
// import Notification from "../../Components/common/Notification/Notification";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import ErrorContainer from "../../Components/common/ErrorContainer/ErrorContainer";
import LabeledInput from "../../Components/common/LabeledInput/LabeledInput";
import axios from "axios";

const empty_userData = {
	email: "",
	username: "",
	password: "",
	confirmPassword: "",
};

const AuthPage = () => {
	const navigate = useNavigate();
	const [cookies, setCookie] = useCookies(null);
	const [isLogin, setIsLogin] = React.useState(true);
	const [errors, setErrors] = React.useState(new Set());
	const [userData, setUserData] = React.useState(empty_userData);

	React.useEffect(() => {
		if (cookies["AuthToken"] != undefined) navigate("/");
	}, []);

	function handleInput(e) {
		const identifier = e.target.id;
		const value = e.target.value;
		setUserData((prevData) => {
			return { ...prevData, [identifier]: value };
		});
	}

	function validateFields() {
		const { username, password } = userData;
		const errorMessages = new Set();
		const alphanumericRegex = /^[a-zA-Z0-9]+$/;
		const minUsernameLength = 5;
		const minPasswordLength = 5;

		if (!username) {
			errorMessages.add("Username is required.");
		} else {
			if (username.length < minUsernameLength) {
				errorMessages.add(
					`Username must be at least ${minUsernameLength} characters long`
				);
			} else if (!alphanumericRegex.test(username)) {
				errorMessages.add("Username must be alphanumeric.");
			}
		}

		if (!password) {
			errorMessages.add("Password is required.");
		} else if (password.length < minPasswordLength)
			errorMessages.add(
				`Password must be at least ${minPasswordLength} characters long`
			);

		if (errorMessages.size > 0) {
			setErrors(errorMessages);
			return false;
		}

		setErrors(new Set());
		return true;
	}

	async function handleLogin() {
		try {
			const url = `/login`;

			if (userData.password === undefined && userData.username === undefined)
				return setErrors({ title: "Error", message: "Invalid inputs" });

			const res = await axios.post(url, { ...userData });

      console.log(res.data);

			let hr = 60 * 60 * 1;
			setCookie("AuthToken", res.data.token, {
				maxAge: hr,
			});

			localStorage.setItem("uid", `${res.data.uid}`);

			window.location.reload();
		} catch (error) {
			setErrors(new Set([error]));
		}
	}

	async function handleRegister() {
		// if (!validateFields()) return;

		try {
			await axios.post("/register", { ...userData });
			window.location.reload();
		} catch (error) {
			console.log(error.response.data.error);
			setErrors(new Set([error.response.data.error]));
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();

		if (isLogin) {
			handleLogin();
		} else {
			handleRegister();
		}
	}

	const Error = () => {
		return (
			errors.size > 0 && (
				<ErrorContainer
					title="Warning"
					errors={errors}
					onClose={() => setErrors(new Set())}
				/>
			)
		);
	};

	return (
		<div className={styles["auth-page"]}>
			<form onSubmit={handleSubmit} className={styles["auth-form"]}>
				<h1>{isLogin ? "LOGIN" : "REGISTER"}</h1>

				<LabeledInput
					label={"Email"}
					id="email"
					name="email"
					type="email"
					onChange={handleInput}
					required="required"
				/>

				{!isLogin && (
					<>
						<LabeledInput
							label={"Name"}
							id="name"
							name="name"
							type="text"
							onChange={handleInput}
							required="required"
						/>

						<LabeledInput
							label={"Surname"}
							id="surname"
							name="surname"
							type="text"
							onChange={handleInput}
							required="required"
						/>
					</>
				)}

				<LabeledInput
					label={"Password"}
					id="password"
					name="password"
					type="password"
					onChange={handleInput}
					required="required"
				/>

				{!isLogin && (
					<LabeledInput
						label={"Confirm password"}
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						onChange={handleInput}
						required={"required"}
					/>
				)}

				<div className={styles["button-container"]}>
					<button
						className={`border-btn`}
						onClick={(e) => {
							e.preventDefault();
							setIsLogin(!isLogin);
						}}
					>
						{isLogin ? "Register" : "Login"}
					</button>

					<button type="submit">Submit</button>
				</div>

				<Error />
			</form>
		</div>
	);
};

export default AuthPage;
