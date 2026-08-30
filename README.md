# Aprendizado — Alfabetizando

Jogo educativo de treino de letras e leitura para crianças (Flashcards, Quiz,
Grade de letras e modo Aprenda), com ícone e configuração completa de
**PWA (Progressive Web App)** para ser instalado como um app real no Android.

## Instalar no Android

1. Ative o GitHub Pages do repositório: **Settings → Pages → Deploy from a
   branch → `main` / (root)** — ou aguarde o workflow
   `.github/workflows/deploy.yml`, que já publica o site automaticamente a
   cada push em `main`.
2. Abra o link publicado (`https://<usuario>.github.io/<repo>/`) no Chrome do
   celular Android.
3. Toque no botão **"⬇️ Instalar aplicativo"** que aparece no topo da tela,
   ou no menu do Chrome (⋮) → **"Instalar aplicativo"** / **"Adicionar à
   tela inicial"**.
4. O app é instalado com o ícone do My Little Pony, abre em tela cheia (sem
   barra de endereço) e funciona **offline** depois do primeiro acesso.

## Arquivos do app (PWA)

| Arquivo | Função |
|---|---|
| `index.html` | Aplicativo (interface + lógica do jogo) |
| `manifest.webmanifest` | Metadados de instalação: nome, ícones, cor do tema, modo tela cheia |
| `sw.js` | Service Worker — cacheia os arquivos para uso offline e carregamento instantâneo |
| `icons/` | Ícone do app (imagem enviada) em todos os tamanhos exigidos pelo Android/Chrome, incluindo versão *maskable* (adaptativa) |
| `favicon.ico` | Ícone da aba do navegador |
| `.github/workflows/deploy.yml` | Publica o site automaticamente no GitHub Pages a cada push |

## Rodar localmente

Não precisa de instalação — é só abrir `index.html` num servidor local
(o Service Worker exige `http://` ou `https://`, não funciona com `file://`):

```bash
python3 -m http.server 8080
# depois abra http://localhost:8080
```
