import express from "express";
import cors from "cors";
import authRoutes from "./6-routes/auth-routes"
import infoTopicRoutes from "./6-routes/infotopic-routes";
import teamMemberRoutes from "./6-routes/teammember-routes";
import publicationRoutes from "./6-routes/publication-routes";
import imageRoutes from "./6-routes/image-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import expressFileUpload from "express-fileupload";

const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());

server.use("/api", authRoutes);
server.use("/api", imageRoutes);
server.use("/api", infoTopicRoutes);
server.use("/api", teamMemberRoutes);
server.use("/api", publicationRoutes);

server.use(routeNotFound);
server.use(catchAll);

server.listen(process.env.PORT, () => console.log("Server up"));
