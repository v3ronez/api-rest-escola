class Home {
  index(req, res) {
    res.status(200).json({
      tudoCerto: true,
    });
  }
}
export default new Home();
