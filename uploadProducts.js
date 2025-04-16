import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import productsData from "./products.json" assert { type: "json" }; 


const firebaseConfig = {
    apiKey: "AIzaSyDWq7ADdhDjpR7SS-k_hWX6l8ve7-hfU8M",
    authDomain: "miapp-5c67f.firebaseapp.com",
    projectId: "miapp-5c67f",
    storageBucket: "miapp-5c67f.firebasestorage.app",
    messagingSenderId: "510644690116",
    appId: "1:510644690116:web:9c2ddd9a84591f5c50bd91",
    measurementId: "G-TRHPFJT9QX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadProducts = async () => {
    const productsCollection = collection(db, "products");

    for (let product of productsData) {
        try {
            await addDoc(productsCollection, product);
            console.log(`✔ Producto "${product.title}" agregado`);
        } catch (error) {
            console.error("❌ Error al agregar producto:", error);
        }
    }
};

uploadProducts();

