# Liikennelaskurin komponentit yhdistävä pääkomponentti, App

### [<- Takaisin](../README.md)

Aloitetaan App-komponentista, joka toimii sovelluksen päätasona. App-komponentti rakentaa liikennelaskurin muilla komponenteilla, jolla voidaan laskea eri kulkuneuvojen määriä.

## 1. Muiden komponenttien tuonti App-komponenttiin

Jotta muita luotuja komponentteja voidaan käyttää App-komponentissa, ne pitää tuoda. Koska kyseessä on sovelluksen [lähdekoodeista](../src/) tuleva importaus, tehdään tuonti suhteellisilla poluilla suorittavasta tiedostosta.

```typescript
import Otsikko from './components/Otsikko';
import Yhteenveto from './components/Yhteenveto';
import Laskurinappi from './components/Laskurinappi';
import Sivu from './components/Sivu';
```

## 2. Määritellään tilamuuttujat kulkuneuvoille ja yhteenvedolle

Sovelluksen [päänäkymässä](../src/App.tsx) rakennetaan mallikomponenteista varsinainen sisältörakenne sovellukselle. Mallikomponentit ovat käytännössä tyhjiä pohjia, joihin tiedot pitää vielä erikseen määrittää ja tämä tapahtuu nyt App-komponentissa. Liikennelaskuri tarvitsee tiedot laskettavista kulkuneuvoista ja tiedon kulkuneuvojen kokonaismäärästä. Luodaan siis näille tilamuuttujat.

```typescript
const kulkuneuvot : string[] = ["Henkilöauto", "Pakettiauto", ...]
const [yhteensa, setYhteensa] = useState<number>(0);
```

Sovelluksessa [Laskurinappi-komponentti](../src/components/Laskurinappi.tsx) määrittää laskurin napin muotoilun, mutta ei määritä tälle mitään tietoa. Tiedot, kuten kulkuneuvon nimi tulee App-komponentissa, kun käyttöliittymä rakennetaan. Kulkuneuvojen tietorakenne on string-alkioita tallentava array. Laskuri tallentaa pelkän lukeman kulkuneuvojen kokonaismäärästä.

## 3. Metodi kulkuneuvojen kokonaismäärän kasvattamiseen

Laskuripainikkeissa on itsessään toiminnallisuus jokaisen napin oman laskurin kasvattamiselle. App-komponentissa määritellään erikseen vielä `yhteensa`-tilamuuttujaa päivittävä laskurimetodi.

```typescript
const lisaaYksi = () : void => {
    setYhteensa(yhteensa + 1);
}
```

Tässä ei tapahdu mitään erityisen ihmeellistä. Kun `lisaaYksi`-metodia kutsutaan, päivitetään `yhteensä`-tilamuuttujan arvo yhdeksi enemmän edellisestä arvostaan.

## 4. Käyttöliittymän rakentaminen komponenteista

Sovelluksen käyttöliittymä voidaan rakentaa nyt luotuja komponentteja käyttäen. Komponentteja käytetään, kuten tavallisia HTML-elementtejä. Jos komponentti ottaa sisäänsä tietoa, jota esimerkiksi muotoillaan, on sillä sekä avaava, että sulkeva tagi, jonka väliin tieto tulee, kuten Otsikko-komponentilla. Otsikoilla on myös props/ominaisuus, jolla voidaan määrittää otsikon tyyliä. Yhteenveto-komponentissa on esimerkki komponentista, joka ottaa vastaan yhteensä-tiedon propsina ja tulostaa sen sellaisenaan, eli se ei tarvitse sulkevaa tagia erikseen (huomioi `/` sinkkutagin lopussa).

```tsx
return (
    <Sivu>
    <Otsikko>Demo 3: React-komponentit</Otsikko>

    <Otsikko tyyli="pieni">Liikennelaskuri</Otsikko>

    <Yhteenveto yhteensa={yhteensa}/>

    <>
        {kulkuneuvot.map((kulkuneuvo : string, idx : number) => {
        return(
            <Laskurinappi paivitaSumma={lisaaYksi} key={idx}>{kulkuneuvo}</Laskurinappi>
        );
        })}
    </>

    </Sivu>
)
```

Huomaa, että App-komponentin palautuksessa (JSX-elementti) [Sivu-komponentti](../src/components/Sivu.tsx) toimii juurielementtinä React.Fragment-tagin sijasta. Tämä on täysin sallittua, sillä kaikki rakenne tapahtuu sivun sisällä, jolloin komponenttiin tulee suunnitelmallisesti vain yksi juurielementti.

Kulkuneuvojen mappaus on laitettu kuitenkin React.Fragment-tagien sisään. Näin tehdään siksi, että Sivu-komponentissa on erikseen määritetty, minkälaisia lapsikomponentteja sen sisälle voidaan asettaa. Komponentissa on määritetty, että sen sisällä voi olla merkkijono, yksittäinen ReactElement tai ReactElementtien array. Kulkuneuvojen mappauksen koodiblokki on kuitenkin TypeScript-koodia, joka ei ole ReactElement ja jos fragmentin poistaa, tulee virheitä. Tätä voi vaikka kokeilla itse ja katsoa, minkälaisen virheen VS Code tulostaa.

On siis tärkeä huomioida komponentteja rakentaessa, millaista dataa niiden lapsielementteinä voi olla. Tämä on tärkeää toiminnallisuuden kannalta, sillä määrittämällä tarkat tyypit lapsielementeille vältetään liian löysä tyypitys, jolloin virheitä tulee vähemmän ja tiedetään aina tarkkaan, mitä komponenteilla voidaan tehdä.

## 5. Kulkuneuvoista luodaan omat laskurinapit array.map()-metodilla

Jokaiselle kulkuneuvolle halutaan luoda samanlainen laskurinappi, jolloin tätä varten on luotu oma mallikomponentti. Komponentti ottaa vastaan tarvittavat tiedot kulkuneuvojen määrän kasvattamiseksi napin omalla tasolla (jokaiselle napille on oma laskuri ja tilamuuttuja). `kulkuneuvot` voidaan mapata ja jokaisessa iteraatiossa palautetaan käyttöliittymän tulostukseen [Laskurinappi](../src/components/Laskurinappi.tsx)-komponentti, joka sisältää arrayn iteraation tiedot, eli nimen ja indeksin.

```typescript
{kulkuneuvot.map((kulkuneuvo : string, idx : number) => {
    return(
        <Laskurinappi paivitaSumma={lisaaYksi} key={idx}>{kulkuneuvo}</Laskurinappi>
    );
})}
```