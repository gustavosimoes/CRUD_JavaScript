
async function connect() {
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection;
        console.log("Conectado ao Banco");
    }
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection("mysql://root:gustavo16@localhost:3306/escola");
    console.log("Conectado ao Banco");
    global.connection = connection;
    return connection;
}

async function insertAlunos(aluno){
    const conn = await connect();
    const sql = 'INSERT INTO alunos (nome, matricula, curso) VALUES (?,?,?)';
    const values = [aluno.nome, aluno.matricula, aluno.curso];
    await conn.query(sql, values);
}

async function insertProfessores(professor){
    const conn = await connect();
    const sql = 'INSERT INTO professores (nome, salario, tempoDeServico) VALUES (?,?,?)';
    const values = [professor.nome, professor.salario, professor.tempoDeServico];
    await conn.query(sql, values);
}

async function selectAllAlunos(){
    const conn = await connect();
    const sql = 'SELECT * FROM alunos';
    const [rows] = await conn.query(sql);
    return rows;
}

async function selectAllProfessores(){
    const conn = await connect();
    const sql = 'SELECT * FROM professores';
    const [rows] = await conn.query(sql);
    return rows;
}

async function selectAlunoById(id){
    const conn = await connect();
    const sql = 'SELECT * FROM alunos WHERE idAluno = (?)';
    const [rows] = await conn.query(sql, id);
    return rows;
}

async function selectProfessorById(id){
    const conn = await connect();
    const sql = 'SELECT * FROM professores WHERE idProfessor = (?)';
    const [rows] = await conn.query(sql, id);
    return rows;
}

async function updateSalario(salarioNovo, id){
    const conn = await connect();
    const sql = 'UPDATE professores SET salario = (?) WHERE idProfessor = (?)';
    const values = [salarioNovo, id];
    await conn.query(sql, values);
    return 'Salario Atualizado'
}

async function deleteAluno(id){
    const conn = await connect();
    const sql = 'DELETE FROM alunos WHERE idAluno = (?)';
    await conn.query(sql, id);
}

async function deleteProfessor(id){
    const conn = await connect();
    const sql = 'DELETE FROM professores WHERE idProfessor = (?)';
    await conn.query(sql, id);
}

module.exports = {
    insertAlunos, 
    insertProfessores,
    selectAllAlunos,
    selectAllProfessores,
    selectAlunoById,
    selectProfessorById,
    updateSalario,
    deleteAluno,
    deleteProfessor
};