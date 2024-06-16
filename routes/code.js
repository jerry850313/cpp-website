var express = require('express');
var router = express.Router();
var fs = require('fs');
var { exec } = require('child_process');
var path = require('path');

/* GET code editor page. */
router.get('/', function(req, res, next) {
  res.render('code', { title: 'C++ Code Editor' });
});

/* POST to compile and run C++ code */
router.post('/run', function(req, res, next) {
  const { code } = req.body;

  const codeFilePath = path.join(__dirname, '../temp.cpp');
  const exeFilePath = path.join(__dirname, '../temp.exe');
  const mingwPath = path.join(__dirname, '../public/mingw/bin/g++');

  fs.writeFileSync(codeFilePath, code);

  exec(`"${mingwPath}" ${codeFilePath} -o ${exeFilePath}`, (compileErr, compileStdout, compileStderr) => {
    if (compileErr) {
      return res.json({ output: compileStderr });
    }

    exec(exeFilePath, (runErr, runStdout, runStderr) => {
      if (runErr) {
        return res.json({ output: runStderr });
      }
      res.json({ output: runStdout });
      fs.unlinkSync(codeFilePath);
      fs.unlinkSync(exeFilePath);
    });
  });
});

module.exports = router;
