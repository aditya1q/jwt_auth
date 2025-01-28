export const errorhandler = (req, res, err, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
}