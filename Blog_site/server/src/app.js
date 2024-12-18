import express from "express";

import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import passport from "./config/passport.config.js";
import authRouter from "./routes/auth.routes.js";
import blogRouter from "./routes/blogs.routes.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://prom-blog.vercel.app/"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    name: "wtf",
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);

export default app;
