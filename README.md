# Dominó de Holguras

**Conecta las condiciones correctas.** Microjuego de Optimización I en HTML, CSS y JavaScript, sin compilación ni backend.

Producción: https://israeltiburcio-ai.github.io/domino-holguras/

## Partida

Seis conexiones, dos por fase: reconocer, simbolizar e interpretar. La mitad izquierda responde al extremo activo; la derecha abre la siguiente condición. Los errores permiten continuar la misma cadena. Incluye reloj sin límite, racha, repaso, replay, controles por toque/teclado y sonido opcional inicialmente apagado.

Banco: 24 retos (8 relaciones o no-implicaciones × 3 representaciones). Cada reto tiene una única respuesta; los que preguntan qué NO se puede asegurar invierten explícitamente el criterio de selección. Cada reto independiente supone un par óptimo primal-dual factible. No se afirma que todas las situaciones de una partida pertenezcan al mismo problema numérico.

## Fundamento

Primal max cᵀx, Ax ≤ b, x ≥ 0; dual min bᵀy, Aᵀy ≥ c, y ≥ 0.
Con s = b − Ax y t = Aᵀy − c, la complementariedad exige sᵢyᵢ = 0 y xⱼtⱼ = 0.

`bank.js` incluye un testigo óptimo escalar para cada reto: `[b, x, c, y]`, con A = 1. Las conclusiones son generales; los testigos no son datos adicionales visibles que permitan inferir valores no dados.

## Ejecutar

Servir esta carpeta con cualquier servidor estático, por ejemplo `python3 -m http.server 8000`. Abrir http://localhost:8000.

## Publicación

`.github/workflows/pages.yml` despliega automáticamente desde `main` mediante GitHub Actions y GitHub Pages.

## QA ejecutado — 20 de octubre de 2026

- Verificados los 24 testigos: factibilidad primal/dual, igualdad de objetivos y ambos productos complementarios.
- Enumeración de modelos escalares factibles óptimos para b de 0 a 5, x de 0 a b, c de −2 a 3 e y de 0 a 3: cada respuesta directa es obligatoria y cada distractor tiene contraejemplo; en preguntas NO, exactamente una conclusión tiene contraejemplo. Esta enumeración acompaña la comprobación algebraica por los productos complementarios.
- Playwright/Chromium: cinco partidas completas de seis conexiones, una por formato 375×812, 390×844, 820×1180, 1180×820 y 1440×1000.
- En cada partida: error deliberado sin reinicio, seis encajes, avance con Enter, resultado, replay, reinicio de marcadores e historial, alternancia del sonido y ausencia de desbordamiento horizontal en cada ronda. Sin errores JavaScript observados.
- Pruebas en navegador emulado, no en dispositivos físicos. La activación de audio se probó funcionalmente; no se evaluó auditivamente en dispositivos físicos.
- Duración objetivo: 60–120 segundos. No se ha medido con alumnos; el tiempo automatizado no equivale al tiempo humano.

**Pendiente académico documental:** el archivo `GYM 4_251208_083217.pdf` no estaba en el espacio de trabajo ni se localizó en la carpeta superior `Opti 1 juegos`. Falta cotejar las páginas 18–22 con el material de la profesora. El contenido implementado parte de las definiciones matemáticas del encargo.
