import { DataTypes, Sequelize } from "sequelize";
import { genderEnum, UserOrmEntity } from "./user.orm-entity";

const UserPersistenceModule = () => 
{
    const sequelize = new Sequelize(
        {
            database: process.env.DB_NAME || "test_sb",
            dialect: "mysql",
            host: process.env.DB_HOST || "192.168.88.251",
            username: process.env.DB_USER || "test_sb_user",
            password: process.env.DB_PASS || "0000"
        });

        UserOrmEntity.init(
        {
            id: 
            {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstName:
            {
                type: DataTypes.STRING(128),
                allowNull: false,
            },
            lastName:
            {
                type: DataTypes.STRING(128),
                allowNull: true,
            },
            email:
            {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            secret:
            {
                type: DataTypes.STRING(),
                allowNull: false,
            },
            gender:
            {
                type: DataTypes.ENUM(genderEnum.male, genderEnum.female),
                allowNull: true,
            },
            photo:
            {
                type: DataTypes.STRING(),
                allowNull: true,
            },
            createdAt:
            {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }, { sequelize });
        
        UserOrmEntity.sync({alter: true});
        
    return sequelize;
} 

export default UserPersistenceModule;