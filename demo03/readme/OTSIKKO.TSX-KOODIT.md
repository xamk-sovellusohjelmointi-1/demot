# Liikennelaskurin tekstikomponentit, Otsikko

### [<- Takaisin](../README.md)

## Otsikko.tsx

Otsikko-komponenttia käytetään määrittämään sellaiset tekstit sivulta, jotka toimivat sivun otsikkoina. Käytetään yleistä otsikon komponenttia, jolle voidaan luoda erilaisia määrityksiä erilaisille tyyleille.

## 1. Komponentin Props-rajapinnan määrittely

Kuten [Sivu-komponentissakin](./SIVU.TSX-KOODIT.md), määritellään [Otsikko-komponentille](../src/components/Otsikko.tsx) omat propsit, joita hyödynnetään komponentin määrittelyyn ja tulostamiseen.

```typescript
interface Props {
    children : string,
    tyyli? : string
}
```

Tässä komponentille on määritetty ominaisuudet:
- `children : string` määrittelee, että komponentin lapsen (children), eli sisällön on oltava merkkijonoa.
- `tyyli? : string` määrittelee vaihtoehtoisen (`?`-merkki) tyyli-ominaisuuden. Tyyliä ei siis ole pakko määrittää komponenttia käytettäessä.

## 2. Komponentin määrittely

Komponentti sisältää täysin samat määrittelyt kuin [Sivu](./SIVU.TSX-KOODIT.md), joten ei käydä niitä uudestaan läpi. Komponentti ottaa vastaan Props-rajapinnan mukaisia propseja (children ja tyyli).

```tsx
const Otsikko : React.FC<Props> = (props : Props) : React.ReactElement => {

    return (
        <>
            {(props.tyyli === "pieni")
                ? <h2>{props.children}</h2>
                : <h1>{props.children}</h1>
            }
        </>
    );

}

export default Otsikko;
```

Komponentin palautuksessa on toteutettu ehtorakenne ternary-operaattorilla, jossa määritetään otsikon tyyli. Tässä ei ole tyyliä määritelty kovinkaan erityisesti, kunhan on demoamismielessä laitettu kaksi vaihtoehtoa propsin käytön havainnollistamiseksi. Jos komponenttia kutsuttaessa määrittää vaihtoehtoisen tyyli-propsin arvolla "pieni", palauttaa ehtorakenteen tarkistus `true`, ja komponentti tulostetaan pienempänä \<h2>-tason otsikkona. Muuten oletuksena otsikko on \<h1>-tasoa.

## 3. Kun Otsikko-komponenttia käytetään App-komponentissa

Liikennelaskurissa Otsikko-komponentin käyttöä on havainnollistettu kahdella otsikkotasolla, joista toinen otetaan käyttöön määrittelemällä Otsikon tyyli-props.

```tsx
<Otsikko>Demo 3: React-komponentit</Otsikko>
<Otsikko tyyli="pieni">Liikennelaskuri</Otsikko>
```

- Ensimmäinen Otsikko-komponentti ei saa tyyli-propsia, joten se renderöityy h1-elementtinä
- Toinen Otsikko-komponentti saa tyyli-propsiksi "pieni", joten se renderöityy h2-elementtinä