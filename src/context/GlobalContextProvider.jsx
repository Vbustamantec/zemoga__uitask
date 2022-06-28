import React, { createContext, useContext, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import db from '../firebase/firebaseConfig';

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [display, setDisplay] = useState('grid');
  const [candidates, setCandidates] = useState([]);

  const colRef = collection(db, 'candidates');

  const getData = async () => {
    const completeData = await getDocs(colRef);
    let products = [];
    completeData.docs.forEach((data) => {
      products.push({ ...data.data(), id: data.id });
    });

    return products;
  };

  return (
    <GlobalContext.Provider
      value={{ display, setDisplay, getData, candidates, setCandidates }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
