import http from "node:http";
import { DatabaseSync } from "node:sqlite";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT || 3002);
const ADMIN_SENHA = process.env.ADMIN_SENHA || "admin123";
const SESSAO_MS = 1000 * 60 * 60 * 8;

const db = new DatabaseSync(join(__dirname, "dados.sqlite"));
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL,
    senha_hash TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

const sessoes = new Map();

function hashSenha(senha) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(senha, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function conferirSenha(senha, armazenada) {
  const [salt, hash] = armazenada.split(":");
  const atual = scryptSync(senha, salt, 64);
  const esperada = Buffer.from(hash, "hex");
  return atual.length === esperada.length && timingSafeEqual(atual, esperada);
}

function json(res, status, corpo) {
  const dados = JSON.stringify(corpo);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(dados)
  });
  res.end(dados);
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let dados = "";
    req.on("data", (parte) => {
      dados += parte;
      if (dados.length > 1_000_000) {
        reject(new Error("Corpo muito grande"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!dados) return resolve({});
      try {
        resolve(JSON.parse(dados));
      } catch {
        reject(new Error("JSON inválido"));
      }
    });
    req.on("error", reject);
  });
}

function cookies(req) {
  const bruto = req.headers.cookie || "";
  return Object.fromEntries(
    bruto
      .split(";")
      .map((item) => item.trim().split("="))
      .filter((par) => par[0])
  );
}

function criarSessaoAdmin() {
  const token = randomBytes(24).toString("hex");
  sessoes.set(token, Date.now() + SESSAO_MS);
  return token;
}

function sessaoValida(token) {
  if (!token) return false;
  const expira = sessoes.get(token);
  if (!expira || expira < Date.now()) {
    sessoes.delete(token);
    return false;
  }
  return true;
}

function pagina(nome) {
  return readFileSync(join(__dirname, "public", nome));
}

function validarCadastro({ nome, email, telefone, senha }) {
  if (typeof nome !== "string" || nome.trim().length < 3) {
    return "Informe o nome completo (mínimo 3 caracteres).";
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return "Informe um e-mail válido.";
  }
  if (typeof telefone !== "string" || telefone.replace(/\D/g, "").length < 10) {
    return "Informe um telefone válido com DDD.";
  }
  if (typeof senha !== "string" || senha.length < 6) {
    return "A senha deve ter no mínimo 6 caracteres.";
  }
  return null;
}

const servidor = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const rota = url.pathname;

  try {
    if (req.method === "GET" && (rota === "/" || rota === "/index.html")) {
      const html = pagina("index.html");
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      return res.end(html);
    }

    if (req.method === "GET" && (rota === "/clientes" || rota === "/clientes.html")) {
      const html = pagina("clientes.html");
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      return res.end(html);
    }

    if (req.method === "GET" && rota === "/estilo.css") {
      const css = pagina("estilo.css");
      res.writeHead(200, { "content-type": "text/css; charset=utf-8" });
      return res.end(css);
    }

    if (req.method === "POST" && rota === "/api/cadastro") {
      const corpo = await lerCorpo(req);
      const erro = validarCadastro(corpo);
      if (erro) return json(res, 400, { erro });

      const nome = corpo.nome.trim();
      const email = corpo.email.trim().toLowerCase();
      const telefone = corpo.telefone.trim();
      const senha_hash = hashSenha(corpo.senha);

      try {
        db.prepare(
          "INSERT INTO usuarios (nome, email, telefone, senha_hash) VALUES (?, ?, ?, ?)"
        ).run(nome, email, telefone, senha_hash);
      } catch (e) {
        if (String(e.message).includes("UNIQUE")) {
          return json(res, 409, { erro: "Este e-mail já está cadastrado." });
        }
        throw e;
      }
      return json(res, 201, { ok: true, mensagem: "Cadastro realizado com sucesso." });
    }

    if (req.method === "POST" && rota === "/api/login") {
      const corpo = await lerCorpo(req);
      const email = String(corpo.email || "").trim().toLowerCase();
      const usuario = db
        .prepare("SELECT nome, senha_hash FROM usuarios WHERE email = ?")
        .get(email);

      if (!usuario || !conferirSenha(String(corpo.senha || ""), usuario.senha_hash)) {
        return json(res, 401, { erro: "E-mail ou senha incorretos." });
      }
      return json(res, 200, { ok: true, nome: usuario.nome });
    }

    if (req.method === "POST" && rota === "/api/admin/login") {
      const corpo = await lerCorpo(req);
      if (String(corpo.senha || "") !== ADMIN_SENHA) {
        return json(res, 401, { erro: "Senha de administrador incorreta." });
      }
      const token = criarSessaoAdmin();
      res.setHeader(
        "set-cookie",
        `admin=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSAO_MS / 1000}`
      );
      return json(res, 200, { ok: true });
    }

    if (req.method === "POST" && rota === "/api/admin/logout") {
      const token = cookies(req).admin;
      if (token) sessoes.delete(token);
      res.setHeader("set-cookie", "admin=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0");
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && rota === "/api/clientes") {
      if (!sessaoValida(cookies(req).admin)) {
        return json(res, 401, { erro: "Acesso restrito ao administrador." });
      }
      const clientes = db
        .prepare("SELECT id, nome, email, telefone, criado_em FROM usuarios ORDER BY id DESC")
        .all();
      return json(res, 200, { total: clientes.length, clientes });
    }

    const exclusao = rota.match(/^\/api\/clientes\/(\d+)$/);
    if (req.method === "DELETE" && exclusao) {
      if (!sessaoValida(cookies(req).admin)) {
        return json(res, 401, { erro: "Acesso restrito ao administrador." });
      }
      const resultado = db
        .prepare("DELETE FROM usuarios WHERE id = ?")
        .run(Number(exclusao[1]));
      if (resultado.changes === 0) {
        return json(res, 404, { erro: "Cliente não encontrado." });
      }
      return json(res, 200, { ok: true });
    }

    json(res, 404, { erro: "Rota não encontrada." });
  } catch (e) {
    console.error(e);
    json(res, 500, { erro: "Erro interno do servidor." });
  }
});

servidor.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Painel de clientes em http://localhost:${PORT}/clientes`);
  console.log(
    `Senha do administrador: ${process.env.ADMIN_SENHA ? "definida por ADMIN_SENHA" : ADMIN_SENHA}`
  );
});
