const fs = require('fs');
const path = require('path');
const uploadConfig = require('../config/upload');

class DiskStorage {

  async saveFile (file) {

    await fs.promises.rename(//Move o arquivo para outra pasta.
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile (file) {

    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {//Checa o status do arquivo.
      await fs.promises.stat(filePath);//Retorna o status do estado.
    }
    catch {
      return;
    }

    await fs.promises.unlink(filePath);//Deleta o arquivo.
  }
}

module.exports = DiskStorage;
