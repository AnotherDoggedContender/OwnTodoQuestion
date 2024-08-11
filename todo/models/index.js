import { Sequelize } from "sequelize";
import Users from "./user.model.js";
import Todo from "./todo.model.js";
import dbConfig from "../config/config.js";
const database = dbConfig["development"]; //config 파일의 development 요소를 가져온다.
const db = {};

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    database
);
db.Users = Users;
db.Todo = Todo;
Object.keys(db).forEach((model) => {
    db[model].init(sequelize);
});
Object.keys(db).forEach((model) => {
    if (db[model].associate) {
        db[model].associate(db);
    }
});
db.Users.init(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
