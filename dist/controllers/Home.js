"use strict";Object.defineProperty(exports, "__esModule", {value: true});class Home {
  index(req, res) {
    res.status(200).json({
      tudoCerto: true,
    });
  }
}
exports. default = new Home();
