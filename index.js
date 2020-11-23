(async () => {
    const db = require("./db");
    console.log("Começando a conexão");
    console.log('Inserindo Alunos');
    aluno = {
        nome: 'Gustavo', matricula: 2018, curso: 'Eng. de Computação'
    }
    aluno2 = {
        nome: 'Carlos', matricula: 2017, curso: 'Eng. Elétrica'
    }
    await db.insertAlunos(aluno);
    await db.insertAlunos(aluno2);

    console.log('Inserindo Professores');
    professor = {
        nome: 'José', salario: 3500, tempoDeServico: 2
    }
    professor2 = {
        nome: 'Luiz', salario: 3550, tempoDeServico: 3
    }
    await db.insertProfessores(professor);
    await db.insertProfessores(professor2);

    console.log('Listando todos os Alunos')
    const alunos = await db.selectAllAlunos();
    console.log(alunos);

    console.log('Encontrando professor pelo Id')
    const professorX = db.selectProfessorById(1);
    console.log(professorX);

    console.log("Atualizando Salario Professor");
    console.log(await db.updateSalario(4100, 1));

    console.log("Apagando um aluno pelo Id")
    await db.deleteAluno(2);

})();