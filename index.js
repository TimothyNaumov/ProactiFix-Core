import express from "express";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import cors from "cors";

const server = express();
server.use(cors());
const port = 3000;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdb4ZPRwqHUmhiP-4EqiXKdQ9pZPfe7x4",
  authDomain: "node-server-data.firebaseapp.com",
  databaseURL: "https://node-server-data-default-rtdb.firebaseio.com",
  projectId: "node-server-data",
  storageBucket: "node-server-data.appspot.com",
  messagingSenderId: "1088832821315",
  appId: "1:1088832821315:web:692baab80f7bc05d9e5cf6",
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

server.get("/appliances", async (req, res) => {
  const db = getDatabase();
  const appliancesRef = ref(db, "appliances");

  try {
    const snapshot = await get(appliancesRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/appliances/:id", async (req, res) => {
  const id = req.params.id;

  const db = getDatabase();
  const appliancesRef = ref(db, `appliances/${id}`);

  try {
    const snapshot = await get(appliancesRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/service/reactive", async (req, res) => {
  const db = getDatabase();
  const reactiveRef = ref(db, `reactive`);

  try {
    const snapshot = await get(reactiveRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/service/reactive/:id", async (req, res) => {
  const id = req.params.id;
  const db = getDatabase();
  const reactiveRef = ref(db, `reactive/${id}`);

  try {
    const snapshot = await get(reactiveRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/service/reactive", async (req, res) => {
  const db = getDatabase();
  const reactiveRef = ref(db, `reactive`);

  try {
    const snapshot = await get(reactiveRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/service/proactive/:id", async (req, res) => {
  const id = req.params.id;
  const db = getDatabase();
  const proactiveRef = ref(db, `proactive/${id}`);

  try {
    const snapshot = await get(proactiveRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/service/proactive", async (req, res) => {
  const db = getDatabase();
  const proactiveRef = ref(db, `proactive/`);

  try {
    const snapshot = await get(proactiveRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
