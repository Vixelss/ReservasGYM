const srv = require('../services/clases.service');

exports.list   = async (_ , res, next) => { try { res.json(await srv.getAll()); } catch (e){ next(e);} };
exports.create = async (req, res, next) => { try { res.status(201).json(await srv.create(req.body)); } catch (e){ next(e);} };
exports.update = async (req, res, next) => { try { res.json(await srv.update(req.params.id, req.body)); } catch (e){ next(e);} };
exports.remove = async (req, res, next) => { try { await srv.delete(req.params.id); res.sendStatus(204);} catch (e){ next(e);} };
