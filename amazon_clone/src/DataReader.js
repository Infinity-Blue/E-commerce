import { collection, query, where, getDoc, setDoc, doc, collectionGroup, connectFirestoreEmulator } from "firebase/firestore";
// import db from './firebase/index'
import { db } from './firebase';
import Home from './Home'
import React from 'react'

function DataReader({ data_field }) {
	var arr = new Array();
	console.log(data_field);
	const data_read = async () => {
		try {
			//Get DocName document contained in "Electronics" collection.
			const docRef = doc(db, "Electronics", "Computer mice");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log("Document data:", docSnap.data());
				console.log(docSnap.data().item0[0]);
				arr.push(docSnap.data().item0[0]);
				console.log(arr[0])
				// setState({ img_mouse: "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Mouse_1x._SY116_CB667159063_.jpg" })
				// const q = query("Computer mice", where("img", " == ", "https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_Quad_Mouse_1x._SY116_CB667159063_.jpg"));
			} else {
				// 	// doc.data() will be undefined in this case
				console.log("No such document!");
			}
			console.log(arr[0] + arr.length);
		}
		catch (error) {
			// <Home img={arr} />
			console.log(error);
		}
		return arr;
	}
	// data_read()
	//store Product title,
	const docName = {

	}
	if (data_field == "home") {
		const data = data_read().then(function (res) {
			console.log(res);
			return res;
		});
		console.log(data);
		var co = "h"
		let homeItem_img = Promise.resolve(data);
		//resolve the promise from inside the callback
		homeItem_img.then(function (homeItem_img) {
			console.log("data field is: ", data_field, " homeItem_img: ", homeItem_img);
			if (homeItem_img == undefined) {
				console.log("None");
			}
			else {
				console.log("exist", homeItem_img);
			}
		})
		// return < Home img={co} />
	}
}

export default DataReader;
