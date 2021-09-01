import { Redirect } from "react-router";

const API = process.env.REACT_APP_API;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            currentUser: null,
						currentUserMail: null,
            isToken: false,
            token: null,
			message: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
            // For refresh pages
            syncTokenFromSessionStore: () => {
                const token = sessionStorage.getItem("token");
                console.log("Application just loaded, synching the session");
                if (token && token !="" && token != undefined)
                    setStore({token : token});
            },
            logout: () => {
                sessionStorage.removeItem("token");
                console.log("Log Out");
                setStore({token : null});
            },
            login: async (email, password) => {
                try {
                    const res = await fetch(`${API}/login`, {
                        method: "POST",
                        headers: {
                        "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                        email,
                        password,
                        }),
                    });

                    if (res.status !== 200) {
                        console.log("There has been some errors");
                        return false;
                    }
                    const data = await res.json();
                    sessionStorage.setItem('token', data.access_token);
                    setStore({ token : data.access_token});
                    //history.push("/");
                    return true;
                } catch (error) {
                    console.error("There is has been an error login in", error);
                }
            },
            protectedRoute: async () => {
                const token = sessionStorage.getItem("token");
                try {
                    const res = await fetch(`${API}/protected`, {
                        method: "GET",
                        headers: { 'Authorization': 'Bearer '+ token} ,
                    });

                    if (res.status !== 200) {
                        console.error("There has been some errors");

                        return false;
                    }
                    res.json();
                    console.log('@@@@@@@@@@@@@@@@@@@@ The Data come from this user:  ');
                    return true;
                } catch (error) {
                    console.error("There is has been an error login in", error);
                }
            },

		}
	};
};
export default getState;
