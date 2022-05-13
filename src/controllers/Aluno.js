import AlunoModel from '../models/Aluno';
import Foto from '../models/Foto';

class Aluno {
  async index(req, res) {
    try {
      const alunos = await AlunoModel.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // ASC - crescente | DESC - decrescente
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });
      return res.status(200).json(alunos);
    } catch (e) {
      return res.status(400).json({ errors: ['Alunos não encontrados'] });
    }
  }

  async store(req, res) {
    try {
      const aluno = await AlunoModel.create(req.body);
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Id do aluno não enviado'] });

      const aluno = await AlunoModel.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']], // ASC - crescente | DESC - decrescente
        include: {
          model: Foto,
          attributes: ['filename', 'url'],
        },
      });
      if (!aluno) return res.status(400).json({ errors: ['Aluno não existe'] });
      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const aluno = await AlunoModel.findByPk(id);
      if (!aluno) return res.status(400).json({ errors: ['Aluno não existe'] });

      const novoAluno = await aluno.update(req.body);
      return res.json(novoAluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Id do aluno não enviado'] });

      const aluno = await AlunoModel.findByPk(id);
      if (!aluno) return res.status(400).json({ errors: ['Aluno não existe'] });
      await aluno.destroy();
      return res.json({ 'Aluno deletado': [aluno] });
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}

export default new Aluno();
