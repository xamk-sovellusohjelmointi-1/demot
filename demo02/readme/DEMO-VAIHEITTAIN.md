### Lähtötilanne

#### 1. Vite + React -projektin alustus

Demo alkaa siitä, että VS Codessa on alustettu uuteen demo02 -projektikansioon Vite + React -projekti, `react-ts` templatella ja käynnistetty sen kehityspalvelin:

<ul>
    <li style="list-style-type:square;"><code>npm create vite@latest . -- --template react-ts</code></li>
    <li style="list-style-type:square;"><code>npm run dev</code></li>
</ul>

Projektista voi myös vaihtaa halutessaan Vite:n kehityspalvelimen käyttämän portin ja poistaa tarpeettomat tiedostot. Sovelluksen toiminnan kannalta oleellisimmat tiedostot ovat src-kansion:

<ul>
    <li style="list-style-type:square;"><code>index.html</code></li>
    <li style="list-style-type:square;"><code>main.tsx</code></li>
    <li style="list-style-type:square;"><code>App.tsx</code></li>
</ul>

Tyylitiedostot voi jättää muotoilua varten. Demon tehtävälistalle tehdään muutamat muotoilut. Myöskään Vite:n luomia määrittelytiedostoja ja ympäristömuuttujia ei pidä lähteä poistamaan.

#### 2. App.tsx koodit demon alussa

Alussa App-komponentti on vain muotoiltu ja alustettu TypeScript-ohjelmoinnin kannalta parempaan muotoon, eli funktiokomponentti on määritelty nuolifunktiona ja rakenteet on tyypitetty TypeScriptin käytännön mukaan. Tämän lisäksi on luotu tilamuuttuja tehtävälistan tehtäviä varten ja määritelty komponentin tulostuksen rakenne.

```tsx
import React, { useState } from 'react';
import './App.css';

const App : React.FC = () : React.ReactElement => {
    const [tehtavat] = useState<any>();

    return (
        <>
            <h1>Demo 2: React-perusteita</h1>
            <h2>Tehtävälista</h2>

            {tehtavat}
        </>
    );
}

export default App;
```

### Vaihe 1. Tehtävälistan tilamuuttujan määrittäminen

Vielä tässä vaiheessa tyhjä `tehtavat`-tilamuuttuja on aluksi määritelty any-tyypillä. Tiedämme kuitenkin, että käytämme tilamuuttujaa tehtävien tallentamiseen listana, joten otetaan käyttöön merkkijonoja (string) tallentava array.

```tsx
const [tehtavat] = useState<string[]>([
                                        "Käy kaupassa",
                                        "Siivoa kämppä",
                                        "Ulkoiluta koiraa"
                                      ]);
```

Array voidaan muotoilla käyttäen hakasulkeita, johon vain listataan pilkulla eroteltuna merkkijonoja. Koska tiedämme, että tilamuuttuja on string-arvoja tallentava array, voidaan myös sen vahva tyyppi määritellä `string[]`. Arrayn voi myös muotoilla yllä olevalla tavalla jokainen alkio omalla rivillä helpottamaan lukemista. Tämä voi olla myös helpompi tapa hahmotella listamaisen tietorakenteen eri alkioita, koska esitys on samanlainen kuin objektissa tai json-tietueessa.

Tallenna ja katso, mitä selaimen näkymälle käy.

Tehtäville on toki nyt tulostus, mutta pelkän arrayn tulostamalla alkiot tulevat yhteen pötköön. Tämä ei tietenkään ole sitä, mitä tehtävälistan sovelluksella haetaan, vaan arrayn alkiot pitäisi nyt saada tulostettua jotenkin visuaalisesti tarkoituksenmukaisempaan, listamaiseen rakenteeseen. Tässä siis pitäisi käydä array jotenkin alkio kerrallaan läpi ja tulostaa nämä näkymään.

### Vaihe 2. Tehtävien tulostus näkymään rivi riviltä

Jos sitä ei edellisellä demolla tullut mainittua suullisesti tai muuten, niin sanotaan nyt vielä tässä; Kun toimitaan React-komponentissa palautuksen (return) sisällä ja kirjoitetaan jsx-koodia, niin tavallista ohjaus- tai toistorakennetta ei voida enää käyttää (tämä tapahtuisi hieman eri tavalla, joka lisäisi "liikkuvia osia"). Eli kuten demo 1:ssä, tervehdysviestin tulostuksen tila piti määrittää tavallisen if-lauseen sijasta ternary-operaattorilla (<code>(<i>ehto</i>) **?** <i>kun ehto on tosi</i> **:** <i>kun ehto on epätosi</i></code>), niin tässäkään demossa ei voida arrayn alkioita käytä läpi perinteisellä toistorakenteella (for, forEach, while, do...while).

Onneksemme tällaisia tilanteita varten arraylle on olemassa JavaScriptin omia käsittelymetodeja, joita voidaan käyttää sen sijaan, että kirjoitettaisiin itse ohjaus- tai toistorakenne arrayn käsittelylle.

#### `array.map()`-metodi

>`Array<string>.map()` -metodin kuvauksesta: <br> "Calls a defined callback function on each element of an array, and returns an array that contains the results"

JavaScriptillä on omia metodeja muun muassa array-tietorakenteiden käsittelyyn. Yksi tällainen metodi on `array.map()`, jolla arrayn sisältämä data voidaan käsitellä johonkin uuteen muotoon kopioimalla alkiot arraysta. `map()`-metodia käytetään niin, että sen parametriksi annetaan funktio, jonka sisältämä koodilohko suoritetaan jokaiselle käsiteltävän arrayn alkiolle ja nämä käsitellyt alkiot tallennetaan uuteen arrayhin. Näin voidaan for-loopin tyylisesti käydä arrayn jokainen alkio läpi ja tehdä sillä/sille jotain. `map()`-metodin sisällä kutsuttavan funktion parametriksi pitää vielä määritellä muuttujanimi aina senhetkiselle käsiteltävälle alkiolle, jotta siihen voidaan sitten viitata callback-funktion sisällä. Muistetaan määrittää käsiteltävän alkion muuttujalle myös tyyppi (string, koska alkiot tulevat string-muuttujia sisältävästä arraysta, eli silloin yksittäinen alkio on tyyppiä string).


```tsx
{tehtavat.map( (tehtava : string) => {

    return(
        <p>{tehtava}</p>
    );

} );}
```

Kun App-komponentin palautuksessa (return) olevan `{tehtavat}`-tilamuuttujan päivittää yllä olevaksi koodiksi, jossa array-muotoinen tilamuuttuja käsitellään `map()`-metodilla, jossa jokainen alkio tulostetaan omana \<p>-elementtinä, alkaa tapahtua oikeita asioita ja komponentin alussa määritetty tehtävälista tulostuu nyt allekkaisina riveinä.

`map()`-metodin callback-funktio voidaan määrittää myös nuolifunktiona, jolloin tehtävien tulostamista näkymään on suoraviivaisempaa. Myös jsx-merkinnän seassa olevia JavaScript-koodeja voi rivittää helpottamaan luettavuutta. Yllä olevan tulostuksen voi nyt myös muotoilla HTML-listaksi, joka onkin ehkä fiksumpi tapa rakenteen puolesta:

```tsx
<ul>

    {tehtavat.map( (tehtava : string) => {

        return(
            <li>{tehtava}</li>
        );

    } );}

</ul>
```

***

### Välivaihe: Nuolifunktio väännettynä vielä kertaalleen rautalangasta (voi ohittaa, jos selvää)

Opintojaksolla käytetään pääasiassa nuolifunktioita aina kun se on mahdollista ja niiden käyttö yksinkertaistaa koodin kirjoittamista. Toiminnallisesti nuolifunktio kuitenkin toimii aivan samalla tavalla, kuin erikseen koodissa muualla määritetty funktio.

Jos nyt vielä on jäänyt hieman hämäräksi, miksi demon koodissa kirjoitettiin nuolifunktio ja sen sisälle määritettiin tehtavat-arrayn alkion nimi ja tyyppi, niin tässä asia vielä käydään juurta jaksaen.

#### Mikä funktion/metodin rooli olikaan ohjelmoinnissa?

Funktion avulla voidaan määrittää jokin lohko koodia, jota halutaan kutsua mahdollisesti useammin kuin kerran. Periaatteessa demo-sovelluksen tehtävälistan tehtävät voisi tulostaa "kovakoodaamalla" jokainen alkio erikseen omalla html: \<p>-tagilla komponentin palautukseen. Tämä ei kuitenkaan käytännössä toimi, sillä tehtävälistalla ei ole ennalta määriteltyä kokoa. Listan ohjelmallinen tulostus on siis pakollinen vaatimus sovellukselle.

> Toisin sanoen meillä on tilanne, jossa halutaan suorittaa jokin ohjelmallinen toiminto useammin kuin kerran --> täydellinen paikka määrittää funktio.

Funktion voi määrittää perinteiseen tyyliin muualla koodissa ja sitten vain kutsua sitä tarvittaessa. Näin voisi tehdä myös demossa tehtävälistan mappauksessa kutsuttavalle callback-funktiollekin. Funktio voidaan kuitenkin kirjoittaa myös nuolifunktiona suoraan callbackiin, jonka takia toimimme niin.

#### Mitä jos funktio ei ota vastaan tietoa?

Funktio ei välttämättä aina ota vastaan tietoa, vaan se voi tehdä jotain muuta ohjelmallisesti, esim. vain tulostaa yleisen ilmoituksen. Tällaisissa tilanteissa funktiolle ei määritellä parametrejä, eli funktion sulkeisiin ei tule mitään.

```tsx
// Funktion määritys
function tervehdys() {
    console.log("Heippa maailma!");
}

tervehdys(); // Funktion kutsu
```

Koska nyt demon tilanteessa kuitenkin funktiolla käsitellään jotain erillistä tietoa (**tehtävät-array**), pitää metodille määrittää parametri. Parametrin määrittäminen funktiolle tehdään kirjoittamalla funktion määrittelyn yhteydessä sulkeisiin parametrin käsittelynimi ja tyyppi. Käsittelynimi on vain parametrin viittaamiseen funktion toiminnallisuuden määrittelevässä lohkossa. Samaa nimeä ei tarvitse käyttää parametrina funktiota myöhemmin kutsuttaessa.

```tsx
const tervehdysViesti = "Heippa maailma!";
const ilmoitusViesti = "Tänään on hyvä päivä";

function tulostaViesti(viesti : string) {
    console.log(viesti);
}

tulostaViesti(tervehdysViesti);
tulostaViesti(ilmoitusviesti);
```

Tavallisesti metodia kutsuttaessa pitäisi kutsuun kirjoittaa mukaan sulkeet ja parametri. Nyt kuitenkin, kun `map()` oletuksena antaa parametriksi käsiteltävän arrayn alkion (tässä yhteydessä **tehtava-string**), ei metodin kutsussa tarvitse antaa parametria erikseen, vaan se oletetaan kontekstista. **Tämä on siis tilanteen aiheuttama poikkeus**, eikä tätä pidä sekoittaa normaaliin metodin kutsuun, jossa sulkeet ja parametri kirjoitetaan aina, esimerkkinä:

```tsx
const App : React.FC = () : React.ReactElement => {

// ...

    // Määritellään metodi, joka ottaa vastaa string-arvon ja tulostaa sen komponenttiin <p>-tagilla
    function palautaTehtava(tehtava : string) {
        return(
                <p>
                    {tehtava}
                </p>
            );
    }

    return (
        <>
            // Kutsutaan tehtavat-tilamuuttujalla arrayn map-metodia, jonka callback-funktioksi annetaan aiemmin määritetty funktio
            {tehtavat.map(palautaTehtava)}

        </>
    );
};
```

#### Okei, taidan nyt ymmärtää funktion/metodin ja parametrin käytön paremmin. Mutta entä nuolifunktio? Mikä siinä on ideana?

Nuolifunktio yhdistää funktion määrittelyn ja kutsun yhteen komentoon ja koodilohkoon. Nuolifunktion muoto `() => {}` sisältää funktion sulkeet, joihin parametrit voidaan määrittää/syöttää, nuolifunktion nimi tulee sulkeiden ja aaltosulkeiden välissä olevasta nuolesta, aaltosulkeet määrittävät normaaliin tapaan funktion sisältämien komentojen lohkon.

Eli nyt jos määritellään nuolifunktio `(tehtava : string) => {...}`, tehdään siinä samanaikaisesti määrittely "funktio ottaa vastaan string-tyyppisen arvon nimeltä tehtava" ja samalla voidaan tällä nimellä käsitellä nuolifunktion vastaanottamaa parametria suoraan lohkossa.

Demon esimerkissä kutsutaan tehtavat-arraylla `map()`-metodia, joka automaattisesti antaa sen kutsumalle callback-funktiolle parametrina tehtavat-arrayn alkion (string). Voimme siis määrittää callback-funktion nuolifunktiona ja ottamaan vastaan tällainen string arvo jollain nimellä, johon voidaan suoraan viitata callback-funktion lohkossa.

```tsx
{tehtavat.map( (tehtava : string) => {

        return(
            <li>{tehtava}</li>
        );

} );}
```

Toivottavasti tämä avasi funktion ja nuolifunktion toimintaa, määrittelyä ja kutsumista paremmin. Näistä kannattaa etsiä itse lisää tietoa netistä tarvittaessa.

***

### Vaihe 3. Lista-alkioiden avaimet-prop

Tehtävälistan tulostus toimii nyt, mutta tästä vielä puuttuu yksi suhteellisen tärkeä määritys. Demotaan ensin nykytilannetta. Jos avataan selaimen kehittäjätyökalut `F12` ja katsotaan console-välilehteä, pitäisi siellä näkyä virheilmoitus, joka on muodoltaan jotain seuraavaa:

> Warning: Each child in a list should have a unique "key" prop.

Kaikissa iteroitavissa ja mapattavissa asioissa pitäisi myös määritellä jokaisen alkion "key"-ominaisuus React-komponentille. Tämä tarvitaan Reactin sisäisen toiminnallisuuden vuoksi. Määritellään siis alkiolle myös "key" prop. Key auttaa viittaamaan johonkin tiettyyn ohjelmallisesti luotuun elementtiin. Esimerkiksi tehtävälistan tehtävien käsittelyssä meillä tulisi olla jokin erittelevä tunniste jokaiselle eri tehtävälle, jotta Reactiin ei tule ristiriitoja siitä, mihin elementtiin viitataan tällaista käsiteltäessä.

`map()` funktiosta voidaan käsiteltävän alkion lisäksi poimia myös toinen parametri, joka laskee senhetkisen iteraation alkion indeksin ja tämä voidaan asettaa listattavan tehtävän "key":ksi.

```tsx
{tehtavat.map( (tehtava : string, idx : number) => {
    return (
        <li key={idx}>{tehtava}</li>
    );
} )}
```
Eli ensimmäiselle alkiolle idx on 0, toiselle 1 jne. kuten arrayssa yleensäkin. Nyt tyhjentämällä vanha ilmoitus selaimen dev-consolesta ja päivittämällä sivu, ei kyseistä virhettä pitäisi enää tulla.

### Vaihe 4. Tekstikentän lisääminen käyttöliittymään

Toteutetaan seuraavaksi tehtävälistan toinen tärkeä ominaisuus, eli uusien tehtävien syöttökenttä.

Aloitetaan luomalla input-kenttä komponenttiin ja lisätään tässä vaiheessa myös vähän valmista css-muotoilua syöttökentälle.

```tsx
// ...
return (
    <>
        <h1>Demo 2: React-perusteita</h1>

        <h2>Tehtävälista</h2>

        <input type="text" placeholder="Kirjoita tehtävä ja paina enter..." />

        // ...
    </>
);
```

Muotoilut voi luonnollisesti määrittää myös itse, mutta tässä nyt esimerkki

```css 
ul {
    padding: 0px;
}

li {
    border: solid 1px #ccc;
    padding: 15px;
    list-style-type: none;
    margin-bottom: 3px;
    width: 400px;
}

input {
    border: solid 1px #ccc;
    padding: 15px;
    width: 400px;
}
```

Kuten tekstikentän placeholderissa lukee, tehtävän voi lisätä painamalla enter. Tehdään tähän siis hieman erilainen tapa vahvistaa tehtävän lisääminen näppäimistöä käyttämällä, jotta tämäkin tapa tulee tutuksi.

Kirjoitetaan input-kentälle tapahtumakäsittelijä. Nytkin voi yksi rivi käydä kirjoittamiselle ahtaaksi, joten hyödynnetään rivitettyä muotoilua, joka on jsx:ssä mahdollista.

Aiemmassa demossa syöttökentän tapahtumakäsittelijä oli `onChange`, jolla seurattiin vain tekstin muuttumista kentässä. Nyt kuitenkin kun lisäys halutaan tehdä myös näppäimistön kautta enter-painikkeella, on parempi käyttää toista tapahtumakäsittelijää `onKeyDown`, joka suoritetaan joka kerta, kun syöttökentän ollessa aktiivinen painetaan näppäimistöstä jotain painiketta.

```tsx
    <input 
        type="text"
        placeholder="Kirjoita tehtävä ja paina enter..."
        onKeyDown={(e : any) => {

            console.log(e);

        }}
    />
```

Tapahtumakäsittelijän callback tehdään taas nuolifunktiona ja täällä otetaan vastaan kyseisen `onKeyDown`-tapahtuman tiedot, jonka voi merkitä esimerkin mukaan e-kirjaimelle ja sen tyypiksi kannattaa tässä vaiheessa laittaa any tai jättää pois, koska tapahtumakäsittelijän tapahtuma voi olla montaa erilaista tyyppiä, emmekä vielä tässä vaiheessa tiedä, mitä tapahtumaa otetaan vastaan. Nyt on muutenkin hyvä testauksen takia tulostaa aluksi tapahtuma itsessään consoleen, josta voidaan käydä tutkimassa, minkälaista tietoa tällainen näppäimistön painalluksen tapahtuma sisältääkään.

Eli nyt kun koodin tallentaa ja selainikkunan päivittää, voi kehittäjätyökaluista `F12` nähdä syöttökentässä tapahtuvien `onKeyDown`-tapahtumien tietoja. Näin on hyvä tutkia ihan ymmärryksenkin kannalta, mitä tietoja Reactin tapahtumat lähettävät ja oppia sitä kautta lisää. Nyt kun syöttökentän tapahtumia tutkii, niin voi huomata niiden sisältävän todella paljon erilaisia tietoja ja täältä pitäisi nyt poimia sellainen, josta saadaan painetun näppäimen tieto, jota voidaan hyödyntää tarkistamaan, painoiko käyttäjä enter-näppäintä.

`onKeyDown`-tapahtuma sisältää kaksi mielenkiintoista tietoa:

- `key`: painettu näppäin
- `keyCode`: painetun näppäimen koodi

Voit testata tekstin kirjoittamista syöttökenttään ja tarkastelemalla painettujen näppäimien `key` ja `keyCode` -arvoja. Täältä voidaan myös poimia enter-näppäimen tiedot (`key`: "Enter" ja `keyCode` : 13). Nyt voidaan esimerkiksi päivittää tulostusta tulostamaan vain eventin (e) key-arvo. Samalla voidaankin jo luoda ohjausrakenne tapahtumalle, jossa tehdään jotain, jos käyttäjän painama näppäin on Enter.

```tsx
<input
    type="text"
    placeholder="Kirjoita tehtävä ja paina enter..."
    onKeyDown={ (e : any) => {

        if (e.key === "Enter") {
            console.log("Lisätään...");
        }

    }}
/>
```

Tällä voidaan nyt vielä testata syöttökentän toimintaa. Eli nyt kenttään voi kirjoittaa mitä vain tekstiä ja kun painetaan Enter, consoleen logataan teksti "Lisätään...". Tämä voidaan nyt seuraavaksi muuttaa syöttökentän arvon tallentamiseksi `tehtavat`-arrayhin.

### Vaihe 5. Kirjoitetun tehtävän tallentaminen

Tehdään tässä vaiheessa uusi metodin kutsu syöttökentän Enter-painalluksen lohkoon, joka määritellään erikseen komponentin palautuksen (return) yläpuolelle. Päivitetään myös tilamuuttujaa lisäämällä siihen arrayn päivittävä set-metodi.


```tsx
...
// Lisätään tilamuuttujalle päivityksen set-metodi
const [tehtavat, setTehtavat] = useState<string[]>([
    "Käy kaupassa",
    "Siivoa kämppä",
    "Ulkoiluta koiraa"
]);

// Määritellään funktio lisaaTehtava
const lisaaTehtava = (uusiTehtava : string) : void => {
    setTehtavat([...tehtavat, uusiTehtava]);
}

return (
    <>
        ...

        <input
            type="text"
            placeholder="Kirjoita tehtävä ja paina enter..."
            onKeyDown={ (e : any) => {

                if (e.key === "Enter") {
                    lisaaTehtava(e.target.value);
                    // Arvo saatiin tapahtuman kohteen arvosta. Kohde on se elementti, jossa tapahtumaa kutsutaan
                }

            }}
        />

        ...

    </>
);
...
```

Tässä nyt on huomattava, että ei voida toimia tyypilliseen tapaan JavaScript arrayn kanssa ja käyttää `array.push`-metodia uuden tehtävän lisäämiseen. Koska toimitaan Reactin tilamuuttujien kanssa, niin koko array pitää päivittää, jonka takia se pitää ensiksi kopioida. Tähän kopioon tallennetaan uusi tehtävä ja sitten tämä kopioitu array asetetaan uudeksi `tehtavat`-tilamuuttujan arvoksi.

Tämä kopiointi tapahtuu spread-operaattorin avulla `...`. Tällä operaattorilla voidaan levittää array sen sisältämistä alkioista erillisiksi string-arvoiksi. Koska array-tilamuuttujan "setteri" päivittää koko arrayn, tarvitsee se parametriksi arrayn. Spread operaattorin avulla voidaan jo olemassa olevat tehtävät "avata" alkioiksi itsekseen ja tähän perään voidaan nyt lisätä vielä uusi tehtävä. Yllä oleva `setTehtavat()`-kutsun voisi ajatella myös näin:

```tsx
setTehtavat(["Käy kaupassa", "Siivoa kämppä", "Ulkoiluta koiraa", uusiTehtava]);
```

`uusiTehtava` oli nyt vain muuttuja uuden tehtävän string-arvolle. **Eli kertauksena**: array-tilamuuttuja ottaa vastaan vain kokonaisen arrayn, joka korvaa edellisen arrayn kokonaan. Jos haluamme päivittää olemassa olevan array-tilamuuttujan tietoja poistamatta aiempia tietoja, voimme uudeksi arvoksi asetettavassa arrayssa ensiksi spreadata `...tehtavat` arrayn, jonka jälkeen vain lisäämme loput uusista tiedoista. Tästä sitten muodostuu uusi array (huomaa, että setterin parametri on array-muotoilu, joka sisältää yksittäiset string-arvot alkioina).

Uuden tehtävän voisi myös laittaa eteen: `setTehtavat([uusiTehtava, ...tehtavat]);` tai uusia tehtäviä voisi olla useampiakin: `setTehtavat([...tehtavat, ...uudetTehtavat]);`.

### Vaihe 6. Tehtävä-stringeistä tehtävä-objekteiksi

Tehtävälista ei toki ole mitään ilman, että tehtyjä tehtäviä voidaan merkitä tehdyiksi. Tässä on myös oiva tilaisuus harjoitella vähän monimuotoisempien tietorakenteiden, kuin arrayden käyttöä Reactin tilamuuttujissa. Tehdään koodiin seuraavaksi sellainen muutos, että pelkän string-arrayn sijaan tallennetaan tehtävistä sekä nimi, että tieto sen tilasta (onko tehty vai ei).

```tsx
const [tehtavat, setTehtavat] = useState<string[]>([
    {
        nimi: "Käy kaupassa",
        tehty: false
    },
    {
        nimi: "Siivoa kämppä",
        tehty: false
    },
    {
        nimi: "Ulkoiluta koiraa",
        tehty: false
    }
]);
```

Kyseisen muutoksen kun tekee, niin huomaa seuraavaksi, että koko pätkä alleviivataan punaisella ja tulee virheitä. Tämä johtuu tietenkin siitä, että nyt arrayn sisältämät alkiot ovat merkkijonojen (string) sijaan olioita/objekteja (kummin haluaa sanoa). Oliot ovat tietorakenteita, jotka voivat sisältää useampaa tietotyyppiä ja näitä käytetään yleisesti tallentamaan jotain tietokokonaisuuksia. Eli nyt array-tilamuuttujan tyyppi on väärin.

Tästä tietysti pääsisi eroon vaihtamalla tyypin `any`:ksi, mutta virhe siirtyy tehtävän tulostukseen `tehtavat`-arrayn mappauksessa. Ensinnäkin, `map()`-metodin callback-funktioon annettava parametri `tehtava` ei ole enää string, vaan olio. Toisekseen, palautuksessa tehtävään viittaus on väärin, koska tällaista kokonaista oliota ei voida tulostaa. Tässäkin asian voi nyt alkuun korjata vaihtamalla `tehtava`-parametrin tyypiksi any ja palautuksessa tarkentaa, että tulostetaan tehtävä-olion nimi-arvo `tehtava.nimi`.

### Vaihe 7. Tehtävä-olio

Vaikka `any`-tyypin käyttö nyt toimiikin, niin tämä ei ole kovin hyvä tapa toteuttaa tehtävä-olion määrittelyä ja tulostusta. Ensinnäkin, jos joku muu kehittäjä työskentelisi kanssamme, hän ei suoraan näkisi tehtävän kutsusta callback-funktiossa, minkälaista tietoa tehtävä sisältää, koska tyyppi voi olla mitä vain. Toisekseen, kun tehtävä-olion tyypiksi asettaa any, on riski, että tehtävät-arrayhin tallennetaan jotain muitakin olioita, kuin pelkkiä tehtäviä.

Muun muassa tällaisista syistä johtuen aina, kun se on mahdollista, itse tehdyt tietorakenteet ja tietomallit luodaan omiksi tyypeikseen vahvoilla määrittelyillä. Tätä varten voidaan hyödyntää TypeScriptin interfacea, eli "käyttöliittymää". Luodaan siis tehtävästä oma tietomalli, joka sisältää kaksi tietoa: tehtävän `nimi` (string) ja `tehty` (boolean).

Interface määritellään komponentin ulkopuolelle koodissa. Tehtävä-interfacen määrittely tapahtuu näin:

```tsx
// importit...

interface Tehtava {
    nimi : string,
    tehty : boolean
}

// const App : React.FC = () : React.ReactElement => {...}
```

Nyt meillä on itse määritelty tietotyyppi, jolla voidaan tallentaa haluttua tietoa, tässä tilanteessa tehtävälistan tehtävä. Rajapintojen ja yleisesti omien tietomallien nimeämisen käytäntö on usein se, että jos on vaikka array `tehtavat`, niin yksittäisen alkion olio on määritelty samaan asiaan viittaavalla nimellä `Tehtava` (huom. iso kirjain).

Nyt voidaan vaihtaa `tehtavat` arrayn tyyppi ja tehtävien mappauksessa tulostettavan tehtävän parametri.

```tsx
const [tehtavat, setTehtava] = useState<Tehtava[]>([...])

...

{tehtavat.map( (tehtava : Tehtava, idx : number) => {...})}
```

Nyt viimeiseksi ongelmaksi jää `lisaaTehtava`-metodissa `setTehtava()`-metodin parametrit. Spreadattu `...tehtavat` on nyt oikein, mutta nyt metodissa yritetään asettaa `uusiTehtava`, joka on tyyppiä string, arrayhin `Tehtava[]`, eli ristiriita tulee. Tässä on kaksi vaihtoehtoa toimia. Voimme suoraan "inline" tyylisesti määrittää uuden tehtävän `Tehtava`-oliona tuohon `setTehtava()`-metodin jälkimmäiseksi parametriksi, mutta havainnollistuksen ja seuraamisen helpottamisen vuoksi tehdään uudesta tehtävästä apumuuttuja, joka asetetaan sitten setteriin.

Muokataan `lisaaTehtava()`-metodin lohkoa siten, että vaihdetaan nyt stringinä saatavan parametrin nimeksi `tehtavaNimi` ja apumuuttujaksi asetetaan nyt tuo `uusiTehtava`, tyyppinään `Tehtava`-olio. Tämä siksi, että nyt tuo lisättävä tehtävä on tullessaan vain tehtävän nimi, eikä enää kokonainen uusi tehtävä ja uusi tehtävä kokonaisuudessaan määritellään vasta alla apumuuttujassa.

```tsx
const lisaaTehtava = (tehtavaNimi : string) : void => {
    
    let uusiTehtava : Tehtava = {
        nimi : tehtavaNimi,
        tehty : false
    }

    setTehtavat([...tehtavat, uusiTehtava]);

}
```

Nyt tehtävien tietotyyppi on määritelty omana `Tehtava`-tietomallinaan. Nyt aletaan olla jo pitkällä demon valmistumisessa. Seuraavaksi pitäisi vielä jotenkin saada tuo boolean `tehty` osaksi tehtävälistan toiminnallisuutta.

### Vaihe 8. Tehtävien merkitseminen tehdyksi

Eli kuten tehtävälistan toimintaan kuuluu, tehtävän voi merkitä tehdyksi. Hoidetaan se nyt tässä demossa niin, että jos tehtävä on tehty, sen teksti yliviivataan. Tähän voidaan nyt hyödyntää `Tehtava`-olion `tehty`-booleania, joka kertoo, onko tehtävä tehty vai ei. Tätä tietoa hyödyntämällä voidaan muokata yksittäisen tehtävän tulostus ehdolliseksi riippuen `tehty` tilasta. Käydään testauksen helpottamiseksi vaihtamassa vielä yhden tehtävän `tehty` trueksi.

```tsx
const [tehtavat, setTehtavat] = useState<string[]>([
    {
        nimi: "Käy kaupassa",
        tehty: false
    },
    {
        nimi: "Siivoa kämppä",
        tehty: true // Vaihdettiin tehtävä tehdyksi
    },
    {
        nimi: "Ulkoiluta koiraa",
        tehty: false
    }
]);
```

Aiemmassa demossa tervehdyksen tulostus määriteltiin ternary-operaattorin avulla. Hyödynnetään samaa tässä, eli tehtävien mappauksessa palautettavan tehtävä-elementin muotoilu riippuu nyt tehtävän `tehty`-arvosta. Nyt, kun html-elementin tulostus alkaa sisältämään paljon määrittelyjä, kannattaa eri osat sisentää omille riveilleen lukemisen helpottamiseksi.

```tsx
{tehtavat.map( (tehtava : Tehtava, idx : number) => {

    return (
        <li key={idx}>
            { (tehtava.tehty === true)
                ? <del>{tehtava.nimi}</del>
                : tehtava.nimi
            }
        </li>
    );

})}

```

Html:n \<del>-tagilla voidaan muotoilla yliviivauksen merkintä.

Eli nyt tehtävän tulostus on muotoiltu ternary-operaattoria hyödyntäen siten, että jos kyseisen tehtävän tila on tehty, tulostetaan tehtävän nimi yliviivattuna merkiksi tästä. Jos tehtävä on vielä tekemättä, se merkitään normaalisti. Jos nyt muutokset tallentaa, pitäisi "Siivoa kämppä"-tehtävä lukea listassa yliviivattuna.

Seuraavaksi pitää vielä luoda ohjelmallisuus tehtävän tilan muuttamiselle.

### Vaihe 9. Tehtävän tilan muuttaminen ohjelmallisesti

Tehtävän merkitseminen tehdyksi on helpoin tässä toteuttaa esimerkiksi niin, että kun tehtävän listaelementtiä klikkaa, sen `tehty` tila vaihtuu päinvastaiseksi. Tämä onkin helppoa edellisellä demolla jo opitun `onClick`-tapahtumakäsittelijän avulla ja kun vielä olemme aiemmin määritelleet jokaiselle tehtävälle myös oman `key`-propsin `idx`:n avulla, on oikean tehtävän ohjelmallinen käsittely mahdollista.

```tsx
// ...

const lisaaTehtava = (tehtavaNimi : string) : void => {...}

const merkitseTehdyksi = (indeksi : number) : void => {

    let tehtavatApu : Tehtava[] = [...tehtavat];

    tehtavatApu[indeksi].tehty = !tehtavatApu[indeksi].tehty;

    setTehtavat(tehtavatApu);

}

const App : React.FC = () : React.ReactElement{
    
    // ...

    {tehtavat.map( (tehtava : Tehtava, idx : number) => {
        
        return (
            <li
                key={idx}
                onClick={() => { merkitseTehdyksi(idx); }}
            >
                { (tehtava.tehty === true)
                    ? <del>{tehtava.nimi}</del>
                    : tehtava.nimi
                }
            </li>
        );

    })}

    // ...

}

// ...
```

Eli yllä luotiin nyt toinen itse määritelty funktio, joka ottaa parametrikseen numeerisen indeksin klikatusta tehtävästä. Jokainen tehtävä-elementti saa `array.map()`-metodissa automaattisesti oman indeksin `idx`, jota voidaan hyödyntää oikean tehtävän tiedon poimimiseen. Nyt vielä pitää huomioida, että Reactissa tapahtumakäsittelijöissä ei voida suoraan kutsua metodia, joka ottaa vastaan parametrin, vaan se pitää kutsua erillisen nuolifunktion ympäröimänä.

Ero on pieni, mutta merkittävä. Teknisesti syy on siinä, että tapahtumat, kuten painallus eivät oikeastaan kutsu metodia perinteisesti, vaan tapahtumien käsittelymetodeina. Toisin sanoen metodit, joita tapahtumien seurauksina kutsutaan, ovat reaktioita tapahtumaan ja ne kirjoitetaan erilaisella syntaksilla ilman sulkeita metodin nimen perässä. Jos sulkeet lisää metodin kutsun perään, se muuttaa koodin toimintaa ja tapahtumaan reagoinnin sijaan metodi suoritetaan saman tien renderöinnin aikana. Kirjoittamalla parametria käyttävän metodin ympäröivän nuolifunktion sisään, käytännössä ympäröimme metodin toisella metodilla, jolle ei tule parametria ja näin samaa ongelmaa ei synny.

Katsotaan vielä tarkemmin tuota `merkitseTehdyksi()`-metodia, mitä siinä tehdään.

```tsx
const merkitseTehdyksi = (indeksi : number) : void => {

    let tehtavatApu : Tehtava[] = [...tehtavat];

    tehtavatApu[indeksi].tehty = !tehtavatApu[indeksi].tehty;

    setTehtavat(tehtavatApu);

}
```

`merkitseTehdyksi` ottaa vastaan parametrina klikatusta tehtävästä saadun indeksin, joka on numero. Samalla tavalla kuin uuden tehtävän luonnissa, tässäkin voidaan hyödyntää apumuuttujaa helpottamaan toiminnan seuraamista. Määritellään `tehtavatApu`-apumuuttuja, joka tulee sisältämään arrayn kaikista jo olevista tehtävistä. Apumuuttujan arvoksi asetetaan spread-operaattorin avulla kopio `tehtavat`-arraysta, jotta tietoja voidaan käsitellä. Nyt voidaan viitata arrayssa sijaitsevaan `Tehtava`-olioon parametrina saadun indeksin avulla, ja valitun tehtävän `tehty`-tilaa voidaan vaihtaa.

Booleanin vaihtamiseen päinvastaiseksi onkin olemassa yleisesti ohjelmoinnissa käytetty kikka, jossa huutomerkillä `!` (not-operaattori/negaatio), voidaan viitata tietoon itseensä päinvastaisessa muodossa. Eli toisin sanoa asetetaan indeksillä valitun tehtävän `tehty`-tila päinvastaiseksi sen nykyisestä tilasta.

Lopuksi apumuuttujassa oleva alkuperäisen `tehtavat`-arrayn kopio (jossa nyt tietoja on muokattu) voidaan asettaa alkuperäisen tilamuuttujan uudeksi arvoksi.

Tässä siis joutuu hieman kikkailemaan tuon uuden arvon asettamisen kanssa, kun käytetään monimuotoisempia tietorakenteita osana tilamuuttujaa. Arrayn spreadauksella voidaan siis luoda uusi "väliaikainen" kopio alkuperäisestä tiedosta, jota voidaan vasta muokata. Koska alkuperäinen `tehtavat`-tilamuuttuja on vakio, sitä ei suoraan voida muokata itsessään, mutta sen koko arvo voidaan päivittää setterillä.

### Vaihe 10. Syöttökentän tyhjentäminen uuden tehtävän lisäämisen jälkeen (viimeinen vaihe!!!)

Lopuksi tehdään vielä ostoslistaan ominaisuus, joka tyhjentää kirjoituskentän, kun uusi ostos lisätään. Näin käyttäjä ei voi vahingossa tehdä tuplalisäyksiä ja useamman tehtävän kirjoittaminen putkeen on miellyttävämpää, kun tekstikenttää ei tarvitse aina itse manuaalisesti tyhjentää.

```tsx
    <input
        type="text"
        placeholder="Kirjoita tehtävä ja paina enter..."
        onKeyDown={ (e : any) => {

            if (e.key === "Enter") {
                lisaaTehtava(e.target.value);
                e.target.value = null;
            }

        }}
    />
```

Tässä riittää ihan vain se, että laittaa tuohon tekstikentän tapahtumaan `lisaaTehtava()`-metodin jälkeen toisen komennon, jossa tekstikentän arvon asettaa `null`iksi. Tämä toimii kyllä hyvin Enter-näppäimen kanssa, mutta mitä jos käytössä on nyt se erillinen painike, josta lisäys tehdään? Kyseessä on täysin eri elementti, joten miten toisesta elementistä voidaan kutsua toisen elementin arvon nollaantuminen? Jos napille tehtäisiin klikkikäsittelijä ja sen kautta kutsuttaisiin tapahtumaa parametrilla `e`, niin kyse ei ole enää samasta tiedosta, mitä input-kenttä sisältää.

Luodaan input-kentän alle uusi nappi ja annetaan sille vähän muotoilua. Nappi tietenkin ajaa samaa asiaa, kuin Enter, eli tehtävän lisääminen, joten voidaan hyödyntää jo olemassa olevaa metodia `lisaaTehtava`.

```tsx
<button onClick={() => { lisaaTehtava() }}>Lisää</button>
```

```css
input {
    border: solid 1px black;
    padding: 15px;
    width: 300px;
}

button {
    border: solid 1px black;
    padding: 15px;
    width: 100px;
}
```

Eli kysymys oli, miten voidaan Reactissa yhdessä elementissä, mikä on toisen elementin tila, ja miten elementtien välistä toimintaa voidaan ohjata ohjelmallisesti? Tähän pitää nyt ottaa käyttöön uusi React hook, joka on toinen todella yleinen ominaisuus jokaisessa React-sovelluksessa.

#### `useRef`

`useRef`-hookia käytetään viittaamaan (refer) jsx-elementteihin React-komponenteissa. Tuodaan `useRef` osaksi App-komponenttia ja määritellään se oman referenssimuuttujan kautta. Määritellään tarkat tyypit lopuksi, kun toiminta on saatu toteutettua.

```tsx
import React, { useState, useRef } from 'react';

...

const App : React.FC = () : void => {

    const tehtavaKentta : any = useRef<any>();

    ...

}
...
```

`ref` on nyt määritetty omana muuttujana, ja tämä pitää nyt kytkeä haluttuun elementtiin. Tässä tapauksessa haluttiin viitata input-kenttään ja sen sisältämiin tietoihin. Luomalla referenssimuuttuja ja kytkemällä se elementtiin, kyseisen elementin tieto voidaan tallentaa ulkopuolella sijaitsevaan muuttujaan ja sitten tähän tietoon voidaan viitata muualla. Se on eräänlainen kirjanmerkki tai linkki johonkin tiettyyn osaan komponentissa.

```tsx
...
    <input
        ref={tehtavaSyote}
        type="text"
        placeholder="Kirjoita tehtävä ja paina enter..."
        ...
    >
...
```

Nyt tekstikenttään ja sen sisältäämiin tietoihin voidaan viitata painikkeen `onClick()`-käsittelijässä. Tässäkin voisi aluksi nyt tehdä referenssin tulostuksen consoleen ja käytä sieltä tutkimassa, miten tekstikentän arvoon viitataan, mutta tehdään lopullinen viittaus tähän suoraan.

```tsx
<button onClick={() => {
    lisaaTehtava(tehtavaSyote.current.value);
    tehtavaSyote.current.value = null;
}}>Lisää</button>
```

Eli kutsutaan `lisaaTehtava()`-metodia ja annetaan sille parametriksi tekstikentän merkkijono, joka saadaan viittaamalla tekstikenttään referenssimuuttujan kautta ja viittaamalla kentän nykyiseen (current) arvoon (value). Samoin tekstikenttä voidaan tyhjentää lisäämisen jälkeen asettamalla kentän arvoksi `null`.

Palataan vielä `ref`-muuttujan tyyppeihin. Tämä on hieman monimutkainen merkitä varsinkin itse muuttujan tyypin osalta, mutta useRef-hookin tyyppi on nyt suoraan tuo HTML:n input-elementti, johon viittaus kohdistuu. 

```tsx
const tehtavaSyote : MutableRefObject<any> = useRef<HTMLInputElement>(); 
```

Tuo muuttuja itsessään on nyt tällainen `MutableRefObject`, jolle on vielä oma tyyppiparametrinsa, mutta nyt annetaan suosiolla `any`, jotta ei hämmennytä liikaa uudesta informaatiosta.

Huomioi vielä, että kun tehdään viittauksia erilaisiin HTML-elementteihin React-sovelluksissa, niin tuo useRef-hookin tyyppiparametri on asia, joka vaihtelee. Nyt kun viitataan input-kenttään, se on HTMLInputElement, mutta esim. h1-tason otsikolla on eri nimi jne.
***

### Lopuksi

Tässä oli nyt hieman pidempi demo, jossa käytiin useampi Reactin perusasia juurta jaksaen. Tässä demossa otettiin haltuun:

- Rakenteellisesti moninaisempien tilamuuttujien käyttö React-sovelluksessa (array, olio)
- Array-tilamuuttujan tietojen ohjelmallinen tulostus React-komponenttiin hyödyntäen `map()`-metodia
    - Bonuksena funktioiden/metodien ja nuolifunktioiden perusteita
- Key-propsin poiminta arrayn mappauksessa ja käyttö arraysta tulostettavien html-elementtien yksilöinnissä
- Tietojen kerääminen käyttäjältä tekstikentästä ja lisääminen tietorakenteeseen (array, olio)
    - Bonuksena myös tiedon tallentaminen Enteriä painamalla(`onKeyDown`-tapahtuma)
- Oman tietorakenteen määrittäminen TypeScriptin interfacena (olio)
- jsx-elementtien, eli komponentin rakenteen ja muotoilun hallinta JavaScript-ohjausrakenteilla (ternary operaattori ja ehdollinen tulostus)
- Arrayssa olevan olion sisältämän tieton muokkaaminen tapahtumakäsittelijän kautta (`onClick`-tapahtuma ja tehtävä-boolean)
    - Miten poimia oikea olio listasta?
    - Miten päivittää olion sisältämä tieto? (päivittämällä koko array-tilamuuttuja)
- Syöttökentän tyhjentäminen ohjelmallisesti ja html-elementteihin viittaaminen `useRef`-hookilla
