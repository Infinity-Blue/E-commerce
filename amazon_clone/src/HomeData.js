import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  collectionGroup,
  connectFirestoreEmulator,
} from "firebase/firestore";
// import db from './firebase/index'
import { db } from "./firebase";
import Home from "./Home";

/**
 * @returns The items on the main page
 */
function HomeData() {
  const [docs, setDocs] = useState([]);
  const product = ["Electronics", "Cosmetics"];
  const homepageItem = [
    "Computer mice",
    "Headsets",
    "Keyboards",
    "Laptop",
    "Mascara",
    "Lipstick",
    "Moisturizer",
    "Skin Serum",
  ];

  let j = 0;
  const data_read = async () => {
    let itemsDetails = [];
    let promises = [];
    try {
      for (var i = 0; i < product.length; i++) {
        while (j < homepageItem.length) {
          //Get the "0"collection under the document named 'homepageItem[j]'
          const docRef = collection(db, product[i], homepageItem[j++], "0");
          //Save the documents under the collection above into promises array.
          promises.push(getDocs(docRef));
          //break once 'Laptop' is reached.
          if (j == 4) break;
        }
      }

      const allSnapshots = await Promise.all(promises);
      //Paste the details of document above into itemsDetails array.
      allSnapshots.forEach((snapshot) => {
        snapshot.forEach((doc) => {
          itemsDetails.push(doc.data());
        });
      });
      console.log("[HomeData]itemsDetails: ", itemsDetails);
    } catch (error) {
      console.log(error);
    }
    return itemsDetails;
  };

  const data = data_read().then(function (res) {
    //return promise object of Firebase DB
    return res;
  });

  return <Home homeProduct={data} />;
}

/**
 * @param {string} subCat sub-category of product
 * @param {string} id Top-category of product
 */
export function productList(id, subCategory) {
  console.log(id, subCategory);
  const data_read = async () => {
    let document = [];
    let itemsDetails = [];
    let i;
    try {
      // Check if collection is empty or non exist by fetching its documents and checking the length.
      for (i = 0; i < 10; i++) {
        const docCollection = collection(db, id, subCategory, String(i));
        console.log(docCollection);
        const q = query(docCollection);
        const querySnapshot = await getDocs(q);
        //if empty, collection exists until 'i-1'.
        if (querySnapshot.empty) {
          console.log("empty" + i);
          break;
        }
      }
      //Now, there are 'i-1' documents. Iterate over and return all of them.
      for (let j = 0; j < i; j++) {
        const docRef = collection(db, id, subCategory, String(j));
        document.push(getDocs(docRef));
      }
      //Fetch multiple documents concurrently using 'promise.all.'
      const allSnapshots = await Promise.all(document);
      //Paste the details of document above into itemsDetails array.
      allSnapshots.forEach((snapshot) => {
        snapshot.forEach((doc) => {
          itemsDetails.push(doc.data());
        });
      });
    } catch (error) {
      console.log(error);
    }
    return itemsDetails;
  };

  const data = data_read(id, subCategory).then(function (res) {
    //return promise object of Firebase DB
    return res;
  });
  return data;
}

/**
 * @param {string} subCat sub-category of product
 * @param {string} id Top-category of product
 * @param {number} index Index of documents in the Firestore database.
 * @return The details of Single product.
 */
export function productDetail(id, subCategory, index) {
  console.log(id, subCategory, index);
  const data_read = async () => {
    let productDetail = [];
    try {
      const docRef = collection(db, id, subCategory, String(index));
      console.log("[productDetail] docRef", docRef);
      const docSnapshot = await getDocs(docRef);
      console.log(docSnapshot);
      docSnapshot.forEach((snapshot) => {
        console.log(snapshot.data());
        productDetail = snapshot.data();
      });
    } catch (error) {
      console.log(error);
      return null;
    }
    return productDetail;
  };

  const data = data_read(id, subCategory, index).then(function (res) {
    //return promise object of Firebase DB
    console.log(res);
    return res;
  });
  return data;
}

export default HomeData;
