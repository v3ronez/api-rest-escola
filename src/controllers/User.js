import UserModel from '../models/User';

class User {
  async store(req, res) {
    try {
      const user = await UserModel.create(req.body);
      const { id, nome, email } = user;
      return res.status(201).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // SHOW
  async show(req, res) {
    try {
      const user = await UserModel.findByPk(req.params.id);
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: [null],
      });
    }
  }

  // INDEX
  async index(req, res) {
    try {
      const users = await UserModel.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        errors: ['Falha ao encontrar usuarios'],
      });
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const user = await UserModel.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      const userEdit = await user.update(req.body);
      return res.json(userEdit);
    } catch (e) {
      return res.status(400).json({
        errors: ['Falha ao encontrar users'],
      });
    }
  }
  // DELETE

  async delete(req, res) {
    try {
      const user = await UserModel.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const { id, nome, email } = user;
      await user.destroy();
      return res.json({ 'Usuario deletado': { id, nome, email } });
    } catch (e) {
      return res.status(400).json({
        errors: ['Falha ao encontrar users'],
      });
    }
  }
}
export default new User();
