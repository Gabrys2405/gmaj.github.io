# Gabriel Maj — portfolio (PL / EN)

Statyczna strona w HTML, CSS i JavaScript. Działa bez frameworków oraz bez procesu budowania.

## Jak uruchomić

Otwórz `index.html` w przeglądarce. W prawym górnym rogu znajdziesz przełącznik `EN / PL`.

- Wersja angielska: główne pliki HTML w katalogu projektu.
- Wersja polska: odpowiadające im pliki w folderze `pl/`.
- Strony poszczególnych projektów znajdują się w folderach `projects/` i `pl/projects/`.
- Grafiki, CSS, JS i CV są współdzielone przez obie wersje.
- CV do pobrania to niezmieniony oryginał w języku angielskim (`assets/Gabriel_Maj_CV(1).pdf`).

## Publikacja na GitHub Pages

Wgraj zawartość katalogu `gabriel-maj-portfolio` (nie sam nadrzędny folder) do głównego katalogu repozytorium GitHub Pages, w którym jest obecnie `index.html`. Zachowaj foldery `pl`, `projects` i `assets`.

Domyślną wersją strony jest angielska. Przełącznik przenosi do tej samej podstrony w drugim języku.


## Interactive 3D model / Interaktywny model 3D

The **Waveform Generator** project now includes the optimized exported KiCad GLB model in both English and Polish pages. Click **Load 3D model / Wczytaj model 3D** to load it, then drag to rotate, scroll to zoom, right-drag to pan. Reset and full-screen buttons are available. The model is loaded **on demand**, so other pages remain lightweight.

The 3D viewer is powered by [model-viewer](https://modelviewer.dev/), loaded from its official CDN at runtime. **Internet access is required to download the viewer library.**

**IMPORTANT:** To test the interactive 3D view locally, do **not** open `index.html` using `file://` (browser security restrictions may prevent 3D assets from loading). Run a local server instead, e.g. from the `gabriel-maj-portfolio` folder:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000/projects/waveform-generator.html` (EN) or `http://localhost:8000/pl/projects/waveform-generator.html` (PL). On GitHub Pages, the 3D viewer runs over HTTPS as part of the static website.

The file `assets/models/pcb-generator.glb` is publicly accessible once the site is published. Only deploy 3D geometry you are comfortable disclosing.


**Optimized 3D version:** Geometry merged by material (39 render primitives instead of 12,530 in the simplified KiCad export). Colors, component meshes and all triangles are preserved. The GLB is 5.35 MB, and the viewer shows an error/retry option instead of an endless loading state.
