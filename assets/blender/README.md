# Scania med ståltrailer

Öppna `truck.blend` i Blender. Scania-modellen är skapad av PAndras; se
[LICENSE.md](LICENSE.md) för källa, CC BY 4.0 och gjorda bearbetningar.
Scenen innehåller en modellerad 13,6-meters flaktrailer, plåtpaket, två coils,
material, studiobelysning, kamera och animerade axlar. Lacken har klarlack,
stålet och aluminiumet har riktad ytstruktur, och en transparent skuggfångare
ger kontakt mot marken. Den stora provbilden använder 96 Cycles-samples och
webbens bildrutor använder 48, båda med denoising.

Webbplatsen flyttar lastbilen mellan flödeskartans steg. Hjulbilderna spelas framåt
vid körning. Lastbilen backar aldrig längs vägen: ligger målet bakom den gör den en
trepunktssväng (se nedan) och kör sedan vidare åt andra hållet. Vid ankomst visas
första bildrutan. Bilderna är renderade i Blender Cycles och packade som en
transparent WebP-bildremsa. Ingen 3D-motor körs hos besökaren.

## Återskapa renderingen

Från repots rot, med Blender 5.2 och webbprojektets npm-beroenden installerade.
`render_truck.py` bygger scenen i `truck.blend` och den stora stillbilden;
`render_turn.py` renderar webbens bildrutor från scenen (se Trepunktssvängen):

```sh
blender --factory-startup -b -t 8 --python assets/blender/render_truck.py -- /tmp/magnus-scania
cd portfolio-svelte
node scripts/pack-truck.mjs /tmp/magnus-scania
```

Lägg till `--preview` sist i Blender-kommandot för att endast rendera den stora
stillbilden. Renderingsskriptet skriver annars om `truck.blend`; spara manuella
modelländringar i en egen fil innan du kör det. Originalets FBX finns kvar i
`scania-source/Export.fbx`. Dess saknade Windows-textursökvägar ersätts av
fristående material, så inga externa texturer behövs.

- `static/images/truck/scania-drive.webp` och `scania-drive-left.webp`:
  bildremsorna som används av hemsidan, 24 hjulbilder plus den första igen.
  CSS använder 25 rutor och 24 steg; ändra dessa tillsammans om antalet
  renderade bildrutor ändras.
- `static/images/truck/scania-preview.webp`: stor stillbild för granskning.

Lastbilen och vägen visas bara från 1100 px. Mellan 821 och 1099 px står
flödet som en lista bredvid skärmbilden, och under 821 px blir bildspelet en
karusell som går att svepa.
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

Skriptet skriver om `road.blend` och `/tmp/magnus-road.png`. Webbversionen
är `road.webp`.

## Trepunktssvängen

`render_turn.py` öppnar `truck.blend` utan att ändra filen och renderar med
samma kamera, ljus och skala:

- svängen i 70 bildrutor: hela ekipaget backar in på en sidoväg bakom sig och kör
  ut åt andra hållet,
- sidovägen ensam,
- lastbilen vänd åt vänster, 24 hjulbilder.

Banan planeras för trailerns hjulaxlar med raksträckor, klotoider och cirkelbågar.
Vändskivan och båda vinklarna följer utan sidoglidning, så ekipaget rör sig som en
riktig semitrailer. Studioljusen följer lastbilen, och det låga fyllnadsljuset
lyser inte på marken, så att ingen lång skugga dras över vägen.

```sh
blender --factory-startup -b -t 16 --python assets/blender/render_turn.py -- /tmp/magnus-turn
cd portfolio-svelte
node scripts/pack-turn.mjs /tmp/magnus-turn
npm run build
```

Lägg till `--test` sist i Blender-kommandot för var sjätte bildruta med få samples.
Packningen kontrollerar att svängens första och sista bildruta ligger exakt på
körbilderna. Den skriver `scania-turn.webp` (halv storlek, fyra rutor i bredd),
`side-road.webp` i vägrutans asfaltsfärg, `scania-drive-left.webp` och måtten i
`src/lib/truck-turn.json`.

Svängen flyttar lastbilen ungefär ett steg åt det håll den ska. Ligger målet
närmare kör den först fram en bit. Tillbaka åt höger spelas svängen baklänges.
