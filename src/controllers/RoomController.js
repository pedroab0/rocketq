const Database = require("../db/config");

module.exports = {
    async create(req, res) {
        const db = await Database();
        const pass = req.body.password;
        let roomID;
        let isRoom = true;

        // ENQUANTO isRoom FOR TRUE
        while (isRoom) {
            // GERA O NÚMERO DA SALA
            for (var i = 0; i < 6; i++) {
                i == 0 ? (roomID = Math.floor(Math.random() * 10).toString()) : (roomID += Math.floor(Math.random() * 10).toString());
            }

            // VERIFICA SE O NÚMERO DA SALA JÁ EXISTE
            // isRoom RECEBE FALSE CASO NÃO EXISTA UM ID IDÊNTICO NO BD
            const roomsExistIDs = await db.all(`SELECT id FROM rooms`);
            isRoom = roomsExistIDs.some((roomExistID) => roomExistID === roomID);

            // SE isRoom FOR FALSE ENTRA NO IF, SE FOR TRUE, RODA O WHILE NOVAMENTE
            if (!isRoom) {
                // INSERE A SALA E A SENHA NO BANCO
                await db.run(`INSERT INTO rooms (id, pass) VALUES (${parseInt(roomID)}, ${pass})`);
            }
        }

        await db.close();

        res.redirect(`/room/${roomID}`);
    },

    async open(req, res) {
        const db = await Database();
        const roomID = req.params.room;

        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 0`);
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomID} and read = 1`);

        let isQuestions;
        if (questions.length == 0) {
            if (questionsRead.length == 0) {
                isQuestions = true;
            }
        }

        res.render("room", { roomID: roomID, questions: questions, questionsRead: questionsRead, isQuestions: isQuestions });
    },

    enter(req, res) {
        const roomID = req.body.roomID;

        res.redirect(`/room/${roomID}`);
    },
};
