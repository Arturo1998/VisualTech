import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC63uD9Xpq_H7H23ruLmHrZr9APsrOE3Uk",

  authDomain: "sencutarapp.firebaseapp.com",

  projectId: "sencutarapp",

  storageBucket: "sencutarapp.appspot.com",

  messagingSenderId: "639649261787",

  appId: "1:639649261787:web:975d504ac0642e84cd84fe",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//Obtenemos los talleres de manera estática
export const dameDocs = (ref) => getDocs(collection(db, ref));

//Obtenemos docs filtrados por campo y valor
export const dameDocsFiltro = (ref, campo, valor) =>
  getDocs(query(collection(db, ref), where(campo, "==", valor)));

//Qué pasa si la referencia de talleres cambia...
export const onDameDoc = (ref, callback) =>
  onSnapshot(collection(db, ref), callback);

//Añadimos una nueva reserva
export const anadeReserva = (ref, reserva) =>
  addDoc(collection(db, ref), reserva);

//Eliminamos una reserva
export const borraDoc = (ref, id) => deleteDoc(doc(db, ref, id));

//Buscamos un documento para su posterior modificación
export const dameDoc = (ref, id) => getDoc(doc(db, ref, id));

//Actualizamos la reserva
export const actualizaDoc = (ref, id, objeto) =>
  setDoc(doc(db, ref, id), objeto);

//Cambios de un documento
export const onCambioDoc = (ref, id, callback) =>
  onSnapshot(doc(db, ref, id), callback);
