import { MongoHelper } from "../infra/db/mongodb/account-repository/helper/mongo-helper";
import env from "./config/env";

MongoHelper.connect(env.MONGO_URL)
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(env.PORT, () =>
      console.log(`Server Running ✅ at http://localhost:${env.PORT}`),
    );
  })
  .catch(console.error);
