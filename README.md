# Ruhrline GTA Data Explorer

GitHub-Pages-fertiger GTA V / FiveM Datenkatalog im **Dark Graphite + Orange** Stil.

## Features

- feste Sidebar mit Creator-relevanten GTA-V-Datensätzen
- globale Suche innerhalb des geöffneten Datensatzes
- Kategorien / Filterchips / Sortierung
- Grid- und Listenansicht
- Detail-Drawer
- Copy-Buttons für Modelnamen, Hashes, IDs, Scenarios und Code
- Favoriten via `localStorage`
- Creator Basket mit FiveM/Lua-Codegenerator
- Ped- und Vehicle-Previews über das FiveM Documentation CDN
- elegante Placeholder, falls kein Preview vorhanden ist
- große Datensätze werden lazy geladen
- responsive Desktop/Mobile-UI

## Datenstand

Die Webseite ist auf den derzeitigen DurtyFree GTA V Data Dumps ausgelegt:

**GTA V v3717.0 / GTA Online 1.72 · DLC mp2025_02_g9ec**

Die Rohdaten werden beim Öffnen einer Kategorie direkt vom öffentlichen Repository geladen:

`DurtyFree/gta-v-data-dumps`

Dadurch muss das ZIP nicht mehrere hundert Megabyte an GTA-Dumps enthalten und neue Upstream-Daten können ohne Frontend-Umbau übernommen werden.

## GitHub Pages

1. Inhalt dieses Ordners in ein GitHub Repository hochladen.
2. Repository → **Settings → Pages**.
3. Bei **Build and deployment** `Deploy from a branch` auswählen.
4. Branch `main`, Ordner `/ (root)` auswählen.
5. Speichern.
6. Nach kurzer Zeit ist die Seite über GitHub Pages erreichbar.

## Lokal testen

Die Seite kann grundsätzlich direkt geöffnet werden. Für browserabhängige Einschränkungen ist ein kleiner lokaler HTTP-Server besser:

```bash
python -m http.server 8080
```

Danach `http://localhost:8080` öffnen.

## Preview-Bilder

Für Peds und Vehicles verwendet die UI die URL-Struktur des FiveM Documentation CDN:

- `https://docs-backend.fivem.net/peds/<model>.webp`
- `https://docs-backend.fivem.net/vehicles/<model>.webp`

Fehlt dort ein Bild, wird automatisch ein lokaler Design-Placeholder angezeigt.

## Datenquellen / Attribution

- DurtyFree GTA V Data Dumps: öffentliche GTA-V-Modding-/Scripting-Dumps
- Cfx.re / FiveM Documentation: Ped- und Vehicle-Preview-CDN und Game References

Dieses Projekt enthält keine Rockstar-Spielassets im ZIP. Preview-Bilder und Datendumps werden extern geladen.

GTA V, Grand Theft Auto V und Rockstar Games sind Marken ihrer jeweiligen Rechteinhaber. Dieses Projekt ist nicht von Rockstar Games, Take-Two oder Cfx.re autorisiert oder unterstützt.

## Lokale echte Previews, ohne Placeholder

Diese Ausgabe ist auf **lokale Render-Assets** vorbereitet. Das Frontend lädt keine externen Ped-/Vehicle-/Object-/Weapon-Bilder mehr. Fehlt ein noch nicht erzeugtes Renderbild, wird kein Fakebild eingeblendet.

Für einen vollständig bebilderten Katalog liegt unter `tools/rl-preview-generator/` ein FiveM-Generator bei. Er rendert Peds, Vehicles, Props/Objects und Weapons direkt aus deinem tatsächlich installierten GTA-V/FiveM-Build und schreibt WebP-Dateien. Siehe `tools/README-PREVIEWS.md`.

Das ist absichtlich so gelöst: Eine vollständig aktuelle und frei redistributable 2026er Preview-Sammlung für sämtliche 20.000+ GTA-Objects existiert öffentlich nicht als offizieller Komplettdownload. Mit dem Generator stammen die Vorschauen stattdessen garantiert aus deinem eigenen Game-Build.


## Integrierte Blips / Spritefarben / Marker
Die Sidebar enthält nun echte Kategorien für **966 Blip-Sprites**, **86 Blip-Farb-IDs** und **44 Marker-Typen**. Sprite-/Type-/Color-ID, Name, Vorschau, Details, Quick-Code und Copy-Buttons sind direkt in der Oberfläche verfügbar. Die Blip-Farben verwenden die Hex-Werte aus der offiziellen FiveM-Dokumentation.

`tools/vendor-fivem-ui-assets.ps1` lädt die offiziellen Blip- und Marker-Bilder in die lokalen Asset-Ordner. Lokale Dateien werden bevorzugt; bis dahin nutzt die Oberfläche die offiziellen FiveM-Preview-Assets als Fallback.


## v4 · Creator References + Asset Library

Neu integriert:

- Blips / Sprites inkl. Sprite-ID, Preview, Copy und Quick-Code
- Blip Colors inkl. Color-ID, Hex-Swatch und Copy
- Marker inkl. Type-ID und Preview
- Checkpoints inkl. Type-ID, Spezialtypen 44-46 und Reserved-Varianten
- HUD Colors inkl. Index, Name, RGBA/Hex bzw. Alias
- Controls inkl. Control-ID, Name und Standardbelegung
- Pickup Hashes
- Weapon Models
- Asset Library als eigener Explorer-Bereich

`tools/vendor-all-fivem-assets.ps1` spiegelt Cfx-UI-Bildassets lokal.
Die GTA-Modellpreviews für Peds, Vehicles, Objects und Weapons werden weiterhin mit
`tools/rl-preview-generator` aus dem tatsächlich installierten GTA/FiveM-Build gerendert.
