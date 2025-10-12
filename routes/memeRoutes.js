updateMemeById,
deleteMemeById,} from "../controllers/memeControllers.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const authenticate = (request,response,next) => {
    const authHeader = request.headers.authorization;
    const token = authHeader.split( " ") [1];
    jwt.verify (token,"secret" function (err, decoded) {
        if (err) 
            response.status(401.json({error: "invalid credentials. JWT missing"}))
    })
    request.user = decoded;
    next ();
}
router.get("/:id", getMemeById);
router.post("/", authenticate, addMeme);
router.put("/:id", updateMemeById);
