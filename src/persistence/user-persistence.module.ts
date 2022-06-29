import { DataTypes, Sequelize } from "sequelize";
import { genderEnum, UserOrmEntity } from "./user.orm-entity";

const UserPersistenceModule = () => 
{
    const sequelize = new Sequelize(
        {
            database: "test_sb",
            dialect: "mysql",
            host: "192.168.88.251",
            username: "test_sb_user",
            password: "0000"
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