# Prima
Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

[Pages-Version](https://benediktgrether.github.io/run_bene_run/)

- [Quellcode](https://github.com/benediktgrether/run_bene_run/tree/master/assets/src/js)
- [Design Dokument](https://github.com/benediktgrether/run_bene_run/blob/master/information/benedikt_grether_prima.pdf)
- [zip](https://github.com/benediktgrether/run_bene_run/blob/master/run-bene-run.zip)


## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Run Bene Run |
|    | Name                  | Grether Benedikt |
|    | Matrikelnummer        | 254061 |
|  1 | Nutzerinteraktion     | Die Nutzer kann mittels Benutzereingabe mit der Applikation interagieren. Dabei besteht die Interaktion aus der Bewegung des Spielers mit A und D, sowie Springen mit der Leertaste und kämpfen über die Eingabe Taste. Zusätzlich kann der Spieler noch mit E sein Item droppen und mit M das Spiel Muten/Unmuten. |
|  2 | Objektinteraktion     | Mit Hilfe der Kollisionsprüfung wurde zum einen die Abfrage realisiert ob sich der Spieler entweder auf dem Boden oder auf einer Plattform befindet. Falls ja, wird der Fallvektor auf 0 gesetzt. Befindet der Spieler sich in der Luft, so wird auf ihn der Fallvektor angewendet bis sich der Spieler wieder am Boden oder auf einer Plattform befindet. Des weiteren wird für den Spieler noch abgefragt ob er gegen die Spielbegrenzung läuft. Trifft das zu, wird sein Beschleunigungsvektor auf 0 gesetzt. Eine weitere Abfrage ist ob der Spieler über ein Item gelaufen ist. Wenn ja und er noch kein Item aufgenommen hat, nimmt er dieses Item automatisch auf. Und dann gibt es noch die Kollisionsabfrage mit dem Gegner. Der Gegner hat Grundsätzlich auch die Abfrage ob er mit dem Boden Kollidiert und ob er den Spieler berührt. Wenn ja dann wird vom Spieler ein Lebenspunkt abgezogen. Falls der Spieler den Gegner angreift, wird beim Gegner ein Lebenspunkt abgezogen. Falls der Spieler im Kampf von hinten Angegriffen wird, wird auch dem Spieler ein Lebenspunkt abgezogen|
|  3 | Objektanzahl variabel | Während der Laufzeit werden neue Objekte erzeugt, diese sind einmal Holzgräber für die verstorbenen Zombies. Dabei werden diese Holzgräber an die aktuelle Position des Zombies gesetzt und an den Knoten level gehängt. Dann gibt es noch eine Wahrscheinlichkeit das ein Gegner ein Item droppen lässt. Passiert dieses so wird das Item auch an den Knoten level gehängt und wird bei der Aufnahme aus dem Knoten Level entfernt. Des Weiteren wird für jeden toten Gegner ein neuer Gegner gesetzt. Dabei wird dieser an den Knoten des Games gehängt                                                                                                                                                      |
|  4 | Szenenhierarchie      | Der Elternknoten ist der Knoten Game. Davon sind seine Unterknoten Plattform, Level, Hero und Gegner. In Plattform findet sich dann als Unterknoten der Knoten Floor. Die Unterknoten davon sind dann FloorSprite und Item. <br> Im Knoten Level gibt es auch wieder die Unterknoten Floor und davon sind die Unterknoten FloorSprite und der Knoten Tree mit TreeSprite und der Knoten Mountains mit MountainSprite <br> Zusätzlich wird im laufenden Spiel Items und die Holzkreuze dem Knoten Floor hinzugefügt. Der Knoten Hero hat als Unterknoten alle ACTIONS und PlayerHitbox. Zusätzlich wird während dem Spiel die Knoten PlayerSwordHitbox sowie Item hinzugefügt. <br> Der Knoten Enemy hat als Unterknoten auch ACTIONS und Hitbox. <br> Siehe Link für Grafische Darstellung des Szenenbaums                                                                                                                                                          |
|  5 | Sound                 | Als Musik läuft im Hintergrund das Lied Zombie von Cranberries als 8 bit Sound. Wenn sich der Spieler bewegt macht dieser Laufgeräusche. Beim Springen gibt es ein Sprung Geräusch. Wenn er kämpft gibt es ein Geräusch das den Luftstoß des Schwertes Symbolisieren soll. Wenn der Gegner dabei getroffen wird, macht der Gegner ein Geräusch. Für den Gegner gibt es auch ein Sterbe Geräusch. Wenn der Spieler getroffen wird, gibt es für ihn auch ein Hit geräusch. Wenn das Item aufgebraucht ist, wird das durch ein Gong Symbolisiert.                                                            |
|  6 | GUI                   | Im GUI kann der Spieler die vorhanden Tastaturbelegung anschauen. Zusätzlich kann er dort auch die Musik vom Spielstart aus Stumm schalten. Und es gibt einen Button mit dem der Spieler das Spiel starten kann. Während dem Spiel gibt es im oberen Bereich eine Anzeige die den aktuellen Score wie die Lebensanzeige und den verschleißgrads des Items anzeigen. Wenn das Spiel zu Ende ist, wird wieder eine GUI angezeigt in dem man das Spiel dann Reseten kann                                                                                   |
|  7 | Externe Daten         | Über die Externe Datei wird im Spiel die Länge des Levels generieren. Zusätzlich wird in der Externen Datei noch definiert wo sich die Plattformen befinden und ob diese Plattformen ein Item besitzen oder nicht. In dieser Externen Datei sind auch die Koordinaten der einzelnen Sprites hinterlegt. |
|  8 | Verhaltensklassen     | Die Klassen, Level, Plattform, Floor, Tree und Mountains sind dafür zuständig das die Welt generiert wird. Dabei ruft die Methode Generate Level einmal eine Methode setTree und setMountain auf. In der Klasse Floor werden dann die Klassen Level und Plattform übergeben und dort dann mit weiteren Eigenschaften versehen. Die Klasse Hero ist dafür da das der Spieler einen Charakter bekommt mit verschiedenen Eigenschaften. Die Klasse Enemy erstellt den Gegner. Beide Klassen - Hero und Enemy bekommen dazu noch eine Hitbox die in der Klasse Hitbox überprüft ob verschiedene Bedingungen zutreffen. In der Klasse Enemy gibt es des weiteren Methoden die nach dem Tod des Gegners an seiner aktuelle Position einen Holzkreuz platziert. Des weiteren Spawned über eine Funktion ein neuer Gegner und es besteht die Möglichkeit das der tote Gegner ein Item droppen lässt. Um alles mit Sounds zu belegen gibt es noch die Sound Klasse die von verschiedenen anderen Klassen aufgerufen wird. Über die Klasse SpriteGenerator werden alle Sprites (außer die für Floor) generiert.  [siehe Klassendiagramm](https://github.com/benediktgrether/run_bene_run/blob/master/information/class/run-bene-run.svg)                                                                                             |
|  9 | Subklassen            | Alle Klassen - außer der Sound und Highscore Klasse - Erben von ƒ.Node. <br> Die Klassen Hero und Enemy, erben von der Klasse Character. Diese beinhaltet alle variablen die beide Klassen brauchen. Zusätzlich bekommen beide Klassen hier auch die Methode checkCollision() vererbt. In den Klassen gibt es weiterhin unterschiedliche Methoden die nicht in der Klasse Character hinterlegt sind.[Siehe Klassendiagramm](https://github.com/benediktgrether/run_bene_run/blob/master/information/extends/extends.svg)|
| 10 | Maße & Positionen     | Die Welt Ursprungskoordinaten liegen mittig im Viewport. Von dort aus geht die Welt in positive wie negative Richtung. Das Spiel ist nach unten verschoben. <br> Ein Level Element ist 1 Einheit groß. Dadurch wird der Spieler und die Gegner 2 ½  Einheiten groß. Die Items und das Holzkreuz sind auch 1 Einheit groß. Die Bäume sind 5 Einheiten groß und die Berge 6 ½ Einheiten groß. Die Plattform ist 3 Einheiten Lang.                                                                |
| 11 | Event-System          | Die Events werden durch die Benutzerinteraktion keydown und keyup ausgelöst. Dabei ist es auch möglich für das Springen und gleichzeitige Bewegen, zwei Tasten abfragen. Zusätzlich verwendet das Spiel noch ƒ.EVENT.LOOP_FRAME event um das Spiel zu Starten und durchgehend neu zu berechnen. |

