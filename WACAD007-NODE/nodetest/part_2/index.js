const fs = require('fs')

fs.rename('test1.txt', 'test1_nm_modificade.txt',function(err){ // Função chamada depois de executar a tarefa. (callback)
    if (err) throw new Error(err);
});