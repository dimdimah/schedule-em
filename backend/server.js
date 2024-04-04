const express = require("express");
const supabase = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = 3211;

const SUPABASE_URL = process.env.SUPABASE_BASE_URL;
const SUPABASE__SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

const db = supabase.createClient(SUPABASE_URL, SUPABASE__SERVICE_ROLE);

app.get("/", async (request, response) => {
  const getData = await db.from("blog").select();
  console.log(getData);
  response.json({ getData });
});

app.post("/", async (request, response) => {
  const { title, description } = request.body;
  const createPost = await db.from("blog").insert({ title, description });
  console.log("🚀 success creating-post", title, description);

  response.json({ createPost });
});

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
