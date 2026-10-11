# Scania med ståltrailer

Öppna `truck.blend` i Blender. Scania-modellen är skapad av PAndras; se
[LICENSE.md](LICENSE.md) för källa, CC BY 4.0 och gjorda bearbetningar.
Scenen innehåller en modellerad 13,6-meters flaktrailer, plåtpaket, två coils,
material, studiobelysning, kamera och animerade axlar. Lacken har klarlack,
stålet och aluminiumet har riktad ytstruktur, och en transparent skuggfångare
ger kontakt mot marken. Den stora provbilden använder 96 Cycles-samples och
webbens bildrutor använder 48, båda med denoising.

Webbplatsen flyttar lastbilen mellan flödeskartans steg. Hjulbilderna spelas framåt
vid körning och baklänges vid backning; hytten spegelvänds inte. Vid ankomst visas
första bildrutan. Bilderna är renderade i Blender Cycles och packade som en
transparent WebP-bildremsa. Ingen 3D-motor körs hos besökaren.

## Återskapa renderingen

Från repots rot, med Blender 5.2 och webbprojektets npm-beroenden installerade:

```sh
blender --factory-startup -b -t 8 --python assets/blender/render_truck.py -- /tmp/magnus-scania-frames
cd portfolio-svelte
node scripts/pack-truck.mjs /tmp/magnus-scania-frames
npm run build
```

Lägg till `--preview` sist i Blender-kommandot för att endast rendera en stor
stillbild. Renderingsskriptet skriver annars om `truck.blend`; spara manuella
modelländringar i en egen fil innan du kör det. Originalets FBX finns kvar i
`scania-source/Export.fbx`. Dess saknade Windows-textursökvägar ersätts av
fristående material, så inga externa texturer behövs.

Packningen kontrollerar 24 bildrutor med 720 × 240 pixlar, transparens och att
bildrutorna skiljer sig åt. En kopia av första bildrutan läggs sist så att även
baklänges uppspelning får en obruten loop. CSS använder 25 rutor och 24 steg;
ändra dessa tillsammans om antalet renderade bildrutor ändras.

- `static/images/truck/scania-drive.webp`: bildremsan som används av hemsidan.
- `static/images/truck/scania-preview.webp`: stor stillbild för granskning.

Mobilens befintliga beteende behålls: under 821 px visas endast bildspelet.
Reducerad rörelse ger en stillastående lastbil. Hjulanimationen pausas när
sektionen eller fliken inte visas. Modellens attribution finns i sidfoten.

## Asfaltvägen

`road.blend` använder lastbilens kamera och ljus. En sex meter lång period med
mittstreck renderas som en transparent bild som upprepas längs flödet.
Återskapa från repots rot:

```sh
blender -b -t 8 --python assets/blender/render_road.py
cd portfolio-svelte
node scripts/pack-road.mjs
```

Skriptet skriver om `road.blend` och `/tmp/magnus-road.png`. Webbversionerna
är `road.webp` och den roterade `road-vertical.webp` för surfplattor.
