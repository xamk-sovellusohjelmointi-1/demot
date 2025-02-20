# Komponentti kulkuneuvojen laskemiseen, Laskurinappi

### [<- Takaisin](../README.md)

Käydään läpi Laskurinappi-komponentti. Tämä komponentti sisältää sekä omaa tilatietoa, että kommunikoi ylemmän tason komponentin kanssa. Komponentti käyttää omaa `useState`-hookia yksittäisen laskurinapin tilamuuttujan määrittelyyn. Kun laskurinapista luodaan ilmentymä App-komponentissa, jokaiselle painikkeelle toteutetaan oma versio laskurista. Eli laskurinapit eivät käytä keskenään samaa tilamuuttujaa, vaan jokaisella ilmentymällä on oma.

## 1. Komponentin Props-rajapinnan määrittely

```typescript
interface Props {
    children : string
    paivitaSumma : () => void    
}
```

Tässä määritellään kaksi props-ominaisuutta:
1. `children : string`: Napin tekstisisällön täytyy olla merkkijono. App-komponentissa tämä on kulkuneuvon nimi (esim. "Henkilöauto").
2. `paivitaSumma : () => void`: Komponentissa on props, joka on nuolifunktio. Tämä mahdollistaa kommunikaation ylöspäin App-komponentin kanssa. Funktion määrittely `() => void` tarkoittaa, että funktio ei ota vastaan parametreja eikä palauta mitään.

## 2. Komponentin määrittely

Komponentti määritellään kuten kaikki muutkin komponentit, eli se ottaa vastaan propseja. Käydään tässä läpi vain komponentin toiminnallisuus.

```typescript
const [laskuri, setLaskuri] = useState<number>(0);

return (
    <button
        style={{
                width: "460px",
                padding: "20px",
                marginBottom: "5px"
        }}
        onClick={() : void => { 
            props.paivitaSumma();
            setLaskuri(laskuri + 1); 
        }}
    >{props.children} ({laskuri})</button>
); 
```

1. Jokainen laskurinappi sisältää oman laskurin, joka seuraa napin klikkausten määrää
2. Komponentti palauttaa \<button>-elementin, jolle on määritelty inline-merkinnällä tyylejä.
3. Komponentti sisältää `onClick`-tapahtumakäsittelijän, joka suoritetaan joka klikkauksella.
    - Tapahtumakäsittelijä kutsuu metodia, joka on App-komponentissa asetettu `paivitaSumma`-propsiksi. Laskurinapissa siis määritettiin, että nappi sisältää propsina funktion, joka suoritetaan `onClick`-tapahtumassa. Se, mitä tämä kutsuttava funktio tekee, ei määritellä Laskurinappi-komponentissa, vaan App-komponentissa ja tämä toiminnallisuus vain välitetään "alaspäin" Laskurinapille.
    - `onClick`-tapahtumassa myös kutsutaan painikkeen omaa `setLaskuri`-metodia, joka päivittää napin omaa laskuria lisäämällä siihen yhden lisää.
4. Lopuksi \<button>-elementtiin välitetään propsin kautta laskurin nimi (kulkuneuvo App-komponentissa) ja painikkeen oman laskurin arvo

## 3. Kun tätä komponenttia käytetään App-komponentissa

```typescript
{kulkuneuvot.map((kulkuneuvo : string, idx : number) => {
    return(
        <Laskurinappi paivitaSumma={lisaaYksi} key={idx}>{kulkuneuvo}</Laskurinappi>
    );
})}
```

`kulkuneuvot`-arrayn mappauksessa jokaiselle kulkuneuvolle luodaan oma nappi, joka:
1. Saa tekstikseen kulkuneuvon nimen (props.children \<button>-tagien välissä)
2. Välittää App-komponentin `yhteensä`-tilamuuttujaa kasvattavan metodin `lisaaYksi` propsina Laskurinappi-komponentille, jotta tämän `onClick`-käsittelijässä metodi suoritetaan ja kokonaislaskuria kasvatetaan painikkeen oman laskurin päivityksen yhteydessä.
3. Ottaa vastaan `key`-propsin, joka on senhetkisellä arrayn map-iteraatiolla kulkuneuvon indeksi. Tätä `key`-propsia ei ole määritelty erikseen, vaan se on "oletuksena" React-komponenteissa.

Tämä komponentti on hyvä esimerkki React-komponentin toiminnasta ja käyttömahdollisuuksista, koska se:
1. Hallitsee omaa tilaansa (nappikohtainen laskuri)
2. Kommunikoi ylöspäin (kokonaissumman päivitys)
3. Käyttää propseja sekä dataan (children) että toiminnallisuuteen (paivitaSumma)
4. Yhdistää visuaalisen tyylin ja toiminnallisuuden selkeäksi kokonaisuudeksi