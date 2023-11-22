import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // read all/get/index
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // read one/get/show
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  // update one/ put
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json.status(400).send({
          errors: ['Id not found.'],
        });
      }
      const user = await User.findByPk(id);
      if (!user) {
        return res.json.status(400).send({
          errors: ['User not found.'],
        });
      }
      const newData = await user.update(req.body);
      return res.json(newData);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // delete one/ delete
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.json.status(400).send({
          errors: ['Id not found.'],
        });
      }
      const user = await User.findByPk(id);
      if (!user) {
        return res.json.status(400).send({
          errors: ['User not found.'],
        });
      }
      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
