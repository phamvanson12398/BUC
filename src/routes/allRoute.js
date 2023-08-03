import { userRouter } from "./userRoute";
import { authRoute } from "./authRoute";
import { deviceRoute } from "./deviceRoute";
import { fileRoute } from "./fileRoute";
import { permissionRoute } from "./permissionRoute";
import { versionRoute } from "./versionRoute";
import { mailRoute } from "./mailSenderRoute";
import { mailServerRoute } from "./mailServerRoute";

export const allRoute = (app)=>{
userRouter(app)
authRoute(app)
deviceRoute(app)
fileRoute(app)
mailRoute(app)
mailServerRoute(app)
permissionRoute(app)
versionRoute(app)
}