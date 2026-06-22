import AlunosModel from '../models/AlunoModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { nome, turma, materia, foto } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'O campo "nome" é obrigatório!' });
        }
        if (turma === undefined || turma === null) {
            return res.status(400).json({ error: 'O campo "turma" é obrigatório!' });
        }
        if (materia === undefined || materia === null) {
            return res.status(400).json({ error: 'O campo "materia" é obrigatório!' });
        }

        const alunos = new AlunosModel({ nome, materia, turma, foto });
        const data = await alunos.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {
        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await AlunosModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const alunos = await AlunosModel.buscarPorId(parseInt(id));

        if (!alunos) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: alunos });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.', error });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const alunos = await AlunosModel.buscarPorId(parseInt(id));

        if (!alunos) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.nome !== undefined) {
            alunos.nome = req.body.nome;
        }
        if (req.body.materia !== undefined) {
            alunos.materia = req.body.materia;
        }
        if (req.body.turma !== undefined) {
            alunos.turma = req.body.turma;
        }

        const data = await alunos.atualizar();

        return res
            .status(200)
            .json({ message: `O registro "${data.nome}" foi atualizado com sucesso!`, data });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.', error });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const alunos = await AlunosModel.buscarPorId(parseInt(id));

        if (!alunos) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await alunos.deletar();

        return res
            .status(200)
            .json({
                message: `O registro "${alunos.nome}" foi deletado com sucesso!`,
                deletado: alunos,
            });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};
