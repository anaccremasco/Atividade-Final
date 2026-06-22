import prisma from '../lib/services/prismaClient.js';

export default class AlunoModel {
    constructor({ id = null, nome, turma, materia, foto = null} = {}) {
        this.id = id;
        this.nome = nome;
        this.turma = turma;
        this.materia = materia;
        this.foto = foto;
    }

    async criar() {
        return prisma.aluno.create({
            data: {
                nome: this.nome,
                turma: this.turma,
                materia: this.materia,
                foto: this.foto
            },
        });
    }

    async atualizar() {
        return prisma.aluno.update({
            where: { id: this.id },
            data: { nome: this.nome, turma: this.turma, materia: this.materia, foto: this.foto},
        });
    }

    async deletar() {
        return prisma.aluno.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = { contains: filtros.nome, mode: 'insensitive' };
        }
        if (filtros.turma) {
            where.turma = { contains: filtros.turma, mode: 'insensitive' };
        }
        if (filtros.materia) {
            where.materia = { contains: filtros.materia, mode: 'insensitive' };
        }

        return prisma.aluno.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.aluno.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new AlunoModel(data);
    }
}
