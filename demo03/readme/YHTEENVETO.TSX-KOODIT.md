# Kulkuneuvot yhteenlaskeva komponentti, Yhteenveto

### [<- Takaisin](../README.md)

Yhteenveto-komponentti on Liikennelaskuri-sovelluksen komponenteista yksinkertaisin. Oikeastaan voisi sanoa, että se on täysin turha, sillä se palauttaa yhden p-tason elementin, joka ottaa vastaan yhden tiedon. Yhteenvedon voisi siis toteuttaa suoraan myös App-komponentissa sellaisenaan, mutta tässä ainakin havainnollistetaan se, mikä on komponentin määrittelyssä käytännössä minimi, millä voidaan toimia.

## 1. Komponentin Props-rajapinnan määrittely

Komponentin Props-rajapinta määritellään, kuten muissakin komponenteissa. Tässä komponentin lapsina voi olla React-elementit ja merkkijonot. Komponentti sisältää myös yhteensa-propsin.

```ts
interface Props {
    children? : React.ReactElement | React.ReactElement[] | string
    yhteensa : number
}
```

## 2. Komponentin määrittely

Komponentissa palautetaan yksi \<p>-elementti, joka sisältää tekstin "Kulkuneuvoja yhteensä: " ja viittauksen yhteensa-propsiin, joka tulostetaan tekstin perään. Kun komponenttia kutsutaan App-komponentissa ja sille annetaan yhteensa-props, joka on numero, se tulostetaan tämän tekstin perään.

```tsx
const Yhteenveto : React.FC<Props> = (props : Props) : React.ReactElement => {

    return (
        <>
            <p>Kulkuneuvoja yhteensä: {props.yhteensa}</p>
        </>
    );

}

export default Yhteenveto;
```

## 3. Kun tätä komponenttia käytetään App-komponentissa
```typescript
<Yhteenveto yhteensa={yhteensa}/>
```

App-komponentti välittää useState-hookilla ylläpidetyn `yhteensa`-muuttujan arvon Yhteenveto-komponentille. Tämä arvo kasvaa aina, kun käyttäjä painaa jotakin laskurinappia (`lisaaYksi`-metodi).

Jos esimerkiksi käyttäjä on painanut laskurinappeja kolme kertaa, komponentti renderöityy muotoon:

```html
<p>Kulkuneuvoja yhteensä: 3</p>
```