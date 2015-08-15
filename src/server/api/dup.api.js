'use strict';

/*
 * Defines an API for grabbing information
 * about @njdup
 */

import yamljs from 'yamljs';
import { Router } from 'express';

const data = yamljs.load('assets/data/data.yaml');
let router = new Router();

router.get('/projects', function(req, res) {
  res.json(data.projects);
});

router.get('/jokes', function(req, res) {
  res.json(data.jokes);
});

export default router;
