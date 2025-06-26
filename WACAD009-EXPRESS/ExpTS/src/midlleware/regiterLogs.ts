import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path"


const registerLogs = (req: Request, res: Response, next: NextFunction) => {

    const logPath = process.env.LOG_PATH || "./log";
    const logFormat = process.env.LOG_FORMAT || "simples";

    if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

    const logFile = path.join(logPath, 'access.log');

    const acessTime = new Date().toISOString();

    const dataAcess = generateInfoAcess(req, acessTime, logFormat);

    fs.appendFile(logFile, dataAcess + '\n', (err) => {
    if (err) {
      console.error('Erro ao gravar no arquivo de log:', err);
    }
  });

    next();
}


const generateInfoAcess = (
  req: Request,
  timestamp: string,
  format: string,
) => {
  const method = req.method;
  const url = req.url;
  const httpVersion = req.httpVersion;
  const userAgent = req.get('User-Agent');


  if (format === 'completo') {
    return `${timestamp} - ${method} ${url} HTTP/${httpVersion} ${userAgent} ${format}`;
  } else {
    return `${timestamp} - ${method} ${url} ${format}`;
  }
};

export default registerLogs;