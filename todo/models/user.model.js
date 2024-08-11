import { Model, Sequelize } from "sequelize";

class Users extends Model {
    static init(sequelize) {
        super.init(
            {
                email: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                modelName: "Users", //sequelize에서 구분을 위해 쓰는 값
                tableName: "users",
                charset: "utf8",
                timestamps: true, //이게 true이면 생성, 수정한 시각이 기록됨
                sequelize: sequelize,
            }
        );
    }
    static associate(db) {
        db.Users.hasMany(db.Todo, {
            foreignKey: { name: "userId", allowNull: false }, //foreignKey 자리에 id가 들어간 거 같은데, id는 어디서 나왔지?
        });
    }
}
export default Users;
