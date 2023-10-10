import React, { createContext, useContext, useReducer } from "react";
//Preparing the data layer
export const StateContext = createContext();

//Build the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
	//Setting up the value of Context using 'useReducer'
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

//Custom hook to use the state value wherever we need it
export const useStateValue = () => useContext(StateContext);