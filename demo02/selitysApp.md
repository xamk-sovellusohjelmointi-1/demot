#  Demo 2: Tehtävälista - App.tsx koodit

> Pohjautuu tekoälyn (Claude.ai, 2025) kuvaukseen koodien toiminnasta. Lue ohjeistusta lähdekoodin kanssa vierekkäin.

Käydään läpi tämä React-sovelluksen koodi yksityiskohtaisesti. Kyseessä on tehtävälista-sovellus, jossa voi lisätä tehtäviä ja merkitä niitä tehdyiksi.

Aloitetaan tuontilausekkeista:
```typescript
import React, { useState, useRef, MutableRefObject } from 'react';
import './App.css';
```
Tässä tuodaan React ja tarvittavat hookit (useState tehtävälistan hallintaan ja useRef input-kentän käsittelyyn) sekä tyylitiedosto.

Seuraavaksi määritellään Tehtava-rajapinta:
```typescript
interface Tehtava {
  nimi : string,
  tehty : boolean
}
```
Tämä TypeScript-rajapinta määrittelee tehtävän rakenteen: jokaisella tehtävällä on nimi (merkkijono) ja tieto siitä, onko se tehty (totuusarvo).

App-komponentin määrittely:
```typescript
const App : React.FC = () : React.ReactElement => {
```
Tämä on funktionaalinen React-komponentti, joka palauttaa React-elementin. FC tarkoittaa "Function Component".

useRef-hookin käyttö:
```typescript
const uusiTehtava : MutableRefObject<any> = useRef<HTMLInputElement>();
```
useRef luo viittauksen input-elementtiin, jonka avulla voidaan käsitellä input-kentän arvoa. MutableRefObject kertoo, että viittaus voi muuttua.

useState-hookin käyttö:
```typescript
const [tehtavat, setTehtavat] = useState<Tehtava[]>([...]);
```
Tässä luodaan tehtävälista ja sen päivitysfunktio. Alkutilassa on kolme esimerkkitehtävää. useState-hook mahdollistaa tilan hallinnan funktionaalisessa komponentissa.

Tehtävän lisäysfunktio:
```typescript
const lisaaTehtava = (tehtavanNimi : string) : void => {
  let uusiTehtava : Tehtava = {
    nimi : tehtavanNimi,
    tehty : false
  }
  setTehtavat([...tehtavat, uusiTehtava]);
}
```
Tämä funktio luo uuden tehtävän annetulla nimellä ja lisää sen tehtävälistaan. Spread-operaattoria (...) käytetään luomaan uusi lista, joka sisältää vanhat tehtävät ja uuden tehtävän.

Tehtävän merkitseminen tehdyksi:
```typescript
const merkitseTehdyksi = (indeksi : number) : void => {
  let tehtavatApu : Tehtava[] = [...tehtavat];
  tehtavatApu[indeksi].tehty = !tehtavatApu[indeksi].tehty;
  setTehtavat(tehtavatApu);
}
```
Tämä funktio vaihtaa tehtävän tehty-tilan päinvastaiseksi. Huomaa, että luodaan uusi apulista välttämään suoraa tilan muuttamista.

Käyttöliittymän renderöinti:
```typescript
return (
  <>
    <h1>Demo 2: React-perusteita</h1>
    <h2>Tehtävälista</h2>
```
React Fragment (<>) mahdollistaa usean elementin palauttamisen ilman ylimääräistä div-elementtiä.

Input-kentän toteutus:
```typescript
<input 
  ref={uusiTehtava}
  type="text" 
  placeholder="Kirjoita tehtävä ja paina enter..."
  onKeyDown={(e : any) => {
    if (e.key === "Enter") {
      lisaaTehtava(e.target.value);
      e.target.value = null;
    }
  }}
/>
```
Input-kenttä on yhdistetty useRef-hookiin. Se reagoi Enter-näppäimen painallukseen lisäämällä uuden tehtävän ja tyhjentämällä kentän.

Tehtävälistan renderöinti:
```typescript
<ul>
{tehtavat.map((tehtava : Tehtava, idx : number) => {
  return (
    <li key={idx} onClick={() => { merkitseTehdyksi(idx); }}>
      { (tehtava.tehty === true) 
        ? <del>{tehtava.nimi}</del> 
        : tehtava.nimi 
      }
    </li>
  );
})}
</ul>
```
Tässä käytetään map-funktiota tehtävälistan renderöintiin. Jokainen tehtävä näytetään li-elementtinä, jota klikkaamalla tehtävä voidaan merkitä tehdyksi. Tehdyt tehtävät näytetään yliviivattuna del-elementillä.

Sovellus on hyvä esimerkki React-komponentin perusrakenteesta ja yleisimpien React-hookien (useState, useRef) käytöstä. Se demonstroi myös TypeScriptin käyttöä React-sovelluksessa rajapintojen ja tyyppimäärittelyjen avulla.