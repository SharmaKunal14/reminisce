import { createContext, useReducer, useContext } from "react";

const FakeAuthContext = createContext();
const initialState = {
	user: null,
	isAuthenticated: false,
};
const FAKE_USER = {
	name: "Jack",
	email: "jack@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=zz",
};
const reducer = (state, action) => {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuthenticated: true };
		case "logout":
			return { ...state, user: null, isAuthenticated: false };
		default:
			throw new Error("Unknown type of action");
	}
};
const FakeAuthProvider = ({ children }) => {
	const [{ user, isAuthenticated }, dispatch] = useReducer(
		reducer,
		initialState
	);

	const login = (email, password) => {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: "login", payload: FAKE_USER });
		}
	};
	const logout = () => {
		dispatch({ type: "logout" });
	};

	return (
		<FakeAuthContext.Provider
			value={{
				login,
				logout,
				user,
				isAuthenticated,
			}}
		>
			{children}
		</FakeAuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(FakeAuthContext);
	if (!context) throw new Error("Context is not scoped for this component");
	return context;
};

export { FakeAuthProvider, useAuth };
