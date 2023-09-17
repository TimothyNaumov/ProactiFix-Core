import express from "express";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import bodyParser from "body-parser";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const server = express();
server.use(cors());
server.use(bodyParser.json());
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

const configuration = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI(configuration);

const params = {
  prompt: "Once upon a time",
  max_tokens: 10,
};

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
    const appliance = snapshot.val();
    res.json(appliance);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/service/reactive", async (req, res) => {
  const db = getDatabase();
  const reactiveRef = ref(db, `reactive/`);

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

server.post("/recommended-action", async (req, res) => {
  // getting prompt question from request
  const appliance = req.body.appliance;

  try {
    if (appliance == null) {
      res.status(400).send("No Appliance defined");
    }
    const choices = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "You are a appliance technicial who is responsible for determining the recommended maintenance for various appliances. You have been given an appliance in the form of a json, are you must respond with your assessment and recommendation for maintenance. If you consider the appliance to be in good shape, recommend that no maintenance is done to save money. The most significant factor for a recommendation is the risk, which ranges from 1-5. A level of 5 requires immediate attention. Please only provide your recommendation and your reasoning: \n " +
            JSON.stringify(appliance),
        },
      ],
      model: "gpt-3.5-turbo",
    });
    const recommendation = choices.choices[0].message.content;
    res.status(200).send(recommendation);
  } catch (error) {
    console.log(error.message);
  }
});

server.get("/work-orders", async (req, res) => {
  const db = getDatabase();
  const workOrdersRef = ref(db, `work-orders/`);

  try {
    const snapshot = await get(workOrdersRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.get("/work-orders/:id", async (req, res) => {
  const id = req.params.id;
  const db = getDatabase();
  const workOrdersRef = ref(db, `work-orders/${id}`);

  try {
    const snapshot = await get(workOrdersRef);
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
