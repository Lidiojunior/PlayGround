# PlayGround

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Created using [OMGithub.com](https://omgithub.com).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://omgithub.com/Lidiojunior/PlayGround)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/Lidiojunior/PlayGround)

- 🎮 [Open the project](https://omgithub.com/Lidiojunior/PlayGround).
- ✨ [Remix this project](https://omgithub.com/?remix=Lidiojunior%2FPlayGround).
- 💻 [Explore the source](https://github.com/Lidiojunior/PlayGround).
- 🛠️ [Check build runs](https://github.com/Lidiojunior/PlayGround/actions).
- 🐛 [Report an issue](https://github.com/Lidiojunior/PlayGround/issues).
- 👤 [Explore the creator's projects](https://omgithub.com/Lidiojunior).
- 🌍 [Create with OMGithub](https://omgithub.com).
<!-- omgithub:readme:end -->

## Lidiol Mojo FM

Rádio brasileira ao vivo, feita como PWA. Reúne emissoras de todo o país em uma interface escura com toque tropical, tocador fixo, favoritos, busca, histórico e temporizador para dormir.

### Recursos

- Catálogo ao vivo com centenas de estações brasileiras via [Radio Browser](https://www.radio-browser.info/), com seleção fixa de emergência.
- Player com play/pause, volume, mudo, estação anterior/próxima e integração com Media Session (tela de bloqueio).
- Categorias por estilo: pop, rock, sertanejo, MPB e samba, notícias, eletrônica, gospel, flashback e jazz.
- Busca por nome, cidade, estado ou estilo.
- Favoritas e histórico de audição persistidos no navegador.
- Temporizador de sono, compartilhamento e interface responsiva com mini player.
- Instalável como app, com manifest, ícones e service worker.

### Como rodar

Com o runtime do projeto:

```sh
./start.sh
```

Ou com qualquer servidor de arquivos estáticos:

```sh
python3 -m http.server 3002
```

Acesse `http://localhost:3002`.

### Estrutura

- `index.html`: estrutura da interface e ícones SVG.
- `assets/styles.css`: tema, layout e animações.
- `assets/app.js`: catálogo, player, favoritos, busca, timer e PWA.
- `manifest.webmanifest` e `sw.js`: instalação e funcionamento offline da interface.
- `icons/`: ícones do app.

As transmissões são de responsabilidade das respectivas emissoras. O catálogo é fornecido pela API pública do Radio Browser.
