import { Model, Sequelize } from "sequelize";

class Todo extends Model {
    static init(sequelize) {
        super.init(
            {
                title: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
                content: {
                    type: Sequelize.TEXT(),
                    allowNull: false,
                },
                state: {
                    type: Sequelize.BOOLEAN(),
                    defaultValue: false,
                },
            },
            {
                modelName: "Todos", //sequelize에서 구분을 위해 쓰는 값
                tableName: "todos",
                charset: "utf8mb4",
                timestamps: true, //이게 true이면 생성, 수정한 시각이 기록됨
                sequelize: sequelize,
            }
        );
    }
    static associate(db) {
        db.Todo.belongsTo(db.Users, {
            foreignKey: { name: "userId", allowNull: false },
            onDelete: "CASECADE",
        });
    }
}
export default Todo;
