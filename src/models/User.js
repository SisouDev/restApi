import { Sequelize, Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: '"Name" field cannot be empty and must contain more than 3 characters.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Invalid email.',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'The password must have more than 6 characters.',
          },
        },
      },
    }, {
      sequelize,
    });
    this.addHook('beforeSave', async (user) => {
      user.password_hash = await bcryptjs.hash(user.password, 8);
    });
    return this;
  }
}
