"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class User {
  async store(req, res) {
    try {
      const user = await _User2.default.create(req.body);
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
      const user = await _User2.default.findByPk(req.params.id);
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
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
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
      const user = await _User2.default.findByPk(req.userId);

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
      const user = await _User2.default.findByPk(req.userId);

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
exports. default = new User();
