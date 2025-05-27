// apps/app_ug/dev-middleware.js
import { spawn } from 'child_process'
import path from 'path'
import { resolve } from 'path';
import fs from 'fs';
import serveStatic from 'serve-static';

/**
 * Vrátí Connect middleware, která na POST /run-root-script
 * čte JSON body, vytáhne `script` a `args` a spustí
 * `npm run <script> ...args` ve složce rootDir.
 */
export function runRootScriptMiddleware(rootDir) {
  return async (req, res, next) => {
    if (req.url === '/debug/run' && req.method === 'POST') {
      // 1) načti tělo
      let body = ''
      for await (const chunk of req) {
        body += chunk
      }
      let data
      try {
        data = JSON.parse(body)
      } catch {
        res.statusCode = 400
        return res.end(JSON.stringify({ error: 'Invalid JSON' }))
      }

      // 2) parametry
      const script = typeof data.script === 'string' ? data.script : 'my:script'
      const args   = Array.isArray(data.args) ? data.args : []

      // 3) spawn
      const child = spawn('npm', ['run', script, ...args], {
        cwd: rootDir,
        shell: true,
      })

      let stdout = '', stderr = ''
      child.stdout.on('data', d => { stdout += d })
      child.stderr.on('data', d => { stderr += d })

      child.once('close', code => {
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ code, stdout, stderr }))
      })
      child.once('error', err => {
        res.statusCode = 500
        res.end(JSON.stringify({ error: err.message }))
      })
      return
    }
    next()
  }
}

export function getPage(GQLENDPOINT) {
    return async (req, res, next) => {
        if (req.url === '/debug' && req.method === 'GET') {
            const htmlPath = resolve(__dirname, 'debug/index.html');
            // 1) read your on‑disk HTML
            let html = fs.readFileSync(htmlPath, 'utf-8');
            // 2) give it to Vite so it can inject ESM/HMR, rewrite <script src> paths, etc.
            html = await viteServer.transformIndexHtml(req.url, html);
            // 3) send it
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
            return;
        }
        next()
    }
}

export const gqldevelopment = () => {
    return (
        {
            name: 'interactive-dev',
            enforce: 'pre',      // ← run before Vite's own handlers
            configureServer(viteServer) {
                const projectRoot = path.resolve(__dirname, '..', '..')  // your monorepo root
                const debugDir    = path.resolve(__dirname, 'debug')     // apps/app_ug/debug

                // 1) Mount your POST /debug/run-root-script (or whatever URL you want)
                viteServer.middlewares.use(
                    runRootScriptMiddleware(projectRoot)
                )                

                viteServer.middlewares.use(async (req, res, next) => {
                  if (req.url === '/sdl' && req.method === 'POST') {
                    // 1) Nastavíme encoding a načteme celé tělo requestu
                    let body = '';
                    for await (const chunk of req) {
                      body += chunk;
                    }
                    res.setHeader('Content-Type', 'application/json');
                    // 2) Zkusíme parsovat JSON
                    let sdlDoc;
                    try {
                      sdlDoc = JSON.parse(body);
                    } catch (err) {
                      res.statusCode = 400;
                      return res.end(JSON.stringify({"errors": ['Invalid JSON', JSON.stringify(err)]}));
                    }

                    // 3) Uložíme do souboru
                    const outPath = path.resolve(projectRoot, 'debug-sdl.json');
                    try {
                      await fs.promises.writeFile(
                        outPath,
                        JSON.stringify(sdlDoc, null, 2),
                        'utf-8'
                      );
                    } catch (err) {
                      res.statusCode = 500;
                      return res.end(JSON.stringify({"errors": ['Failed to write file', JSON.stringify(err)]}));
                    }

                    // 4) Odpovíme klientovi a ukončíme middleware
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ "data": {path: outPath} }));
                  } else {
                    next()
                  }
                })

                viteServer.middlewares.use(async (req, res, next) => {
                  if (req.url === '/debug' && req.method === 'GET') {
                      const htmlPath = resolve(__dirname, 'debug/index.html');
                      // 1) read your on‑disk HTML
                      let html = fs.readFileSync(htmlPath, 'utf-8');
                      // 2) give it to Vite so it can inject ESM/HMR, rewrite <script src> paths, etc.
                      html = await viteServer.transformIndexHtml(req.url, html);
                      // 3) send it
                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'text/html');
                      res.end(html);
                      return;
                  }
                  next()
              })              
            }
        }
    )
}