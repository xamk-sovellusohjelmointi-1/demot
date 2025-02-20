# Liikennelaskurin rakenne ja muotoilut, Sivu

### [<- Takaisin](../README.md)

[Sivu-komponentti](../src/components/Sivu.tsx) toimii "kehyksenä" koko sovellukselle. Se on App-komponentin palautuksessa ylin taso, jonka sisälle kaikki muu sisältö tulostetaan. Selitetään alla Sivu-komponentin toimintaa.

## 1. Komponentin Props-rajapinnan määrittely

Komponenteille voidaan määritellä propseja/ominaisuuksia kuten tavallisissakin HTML-elementeissä on. Propsit määrittelevät elementin toimintaa. Sivun tapauksessa määritellään, millaisia lapsielementtejä Sivu-komponentti voi sisältää, eli mitä `<Sivu>...</Sivu>`-tagien välissä voi olla.

```ts
interface Props {
    children : React.ReactElement | React.ReactElement[] | string
}
```

Sivu-komponentin lapsielementeiksi on määritelty

- `React.ReactElement`: Yksittäinen elementti. Voi olla React-komponentti tai HTML-elementti.
- `React.ReactElement[]`: Elementtien array, eli Sivun sisällä on useampi rinnakkainen elementti.
- `string`: Sivu voi myös sisältää yksinkertaisia merkkijonoja.

Pystyviivalla erotellaan kaikki mahdolliset tyypit. Jos sitä ei aiemmin ole käsitelty, niin TypeScriptissä muuttuja, ominaisuus, parametri jne. voi olla myös useampaa, kuin yhtä tyyppiä. Tyypit voidaan erotella `|`-merkillä.

## 2. Komponentin määrittely

Komponentti määritellään samalla tavalla kuin App-komponentti. Koska komponentti käyttää yllä luotua Props-rajapintaa, se määritetään funktiokomponentin tyyppiparametrina `<Props>`. Myös itse funktion parametri pitää määrittää Propsiksi `(props : Props)`.

```ts
const Sivu : React.FC<Props> = (props : Props) : React.ReactElement => {...}

export default Sivu;
```

## 3. Komponentin runko

Komponentin palautuksessa määritellään komponentin runko. Sivu-komponentti toimii liikennelaskurin containerina ja määrittää koko sivun muotoilun. Komponentin rakenne on pelkkä \<div>-elementti, jonka sisälle tagien väliin välitetään propsien avulla lapsielementit, joita sivu voi sisältää. Jos katsotaan [App-komponentin](../src/App.tsx) koodia, nähdään, että Sivu sisältää useamman komponentin. Nämä määrittyvät automaattisesti Liikennelaskurin Sivu-komponentin propseiksi.

```tsx
return (
    <div
        style={{
            maxWidth : "500px",
            margin: "10px",
            fontFamily: "'Arial', sans-serif"                
        }}
    >
        {props.children}
    </div>
);
```

## 4. Kun Sivu-komponenttia käytetään App-komponentissa

```tx
<Sivu>
    <Otsikko>Demo 3: React-komponentit</Otsikko>
    <Otsikko tyyli="pieni">Liikennelaskuri</Otsikko>
    <Yhteenveto yhteensa={yhteensa}/>
    // ... laskurinapit
</Sivu>
```
Kaikki Sivu-komponentin sisältämät elementit menevät `props.children`-ominaisuuteen ja renderöityvät Sivun div-elementin sisään. Ne perivät Sivu-komponentin määrittelemät muotoilut.