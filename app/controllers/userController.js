const allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

const adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

const userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

module.exports = {
    allAccess,
    adminBoard,
    userBoard
}