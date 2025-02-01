# Demo 1: Hello World

Tässä demossa perehdytään Vite + React -projektin luomiseen ja React-sovelluksen ohjelmointiin muokkaamalla `App.tsx`-komponenttia. Voit tutustua demo koodeihin ja kokeilla muuttaa niitä testaillen erilaisia näkymiä. Kaikki HTML-sisällön muokkaus tapahtuu tässä App-komponentin returnin sisällä, tyhjien `React.Fragment` väliin.

Sinulla pitäisi olla aiempaa kokemusta HTML/CSS -kielistä ennakkovaatimuksena Sovellusohjelmointi 1 -opintojaksolle. Testaa/harjoittele osaamistasi muotoilemalla App-komponentin näkymää ja muotoilua. Voit myös harjoitella JavaScript-ohjelmointia sekä React-hookien ja tapahtumakäsittelijöiden käyttöä.

Demossa tärkeimmät opeteltavat React-ominaisuudet ovat

- useState-hook, jota käytetään React-sovelluksen tilanhallinnassa. Demossa useState-hookeja käytetään muistamaan tervehdysviesti ja käyttäjän kirjoittama nimi näkymän uudelleenrenderöintien välillä.
- onChange- ja onClick -tapahtumankäsittelijät, joilla hallitaan sovelluksen toimintoja ja tapahtumia. onClick-tapahtumankäsittelijää käytetään tulostamaan tervehdyksestä ja kirjoitetusta nimestä muodostuva viesti selaimen näkymään. onChange-tapahtumankäsittelijää käytetään päivittämään nimi-tieto kirjoitettaessa syöttökenttään. Jokainen muutos syöttökentässä aiheuttaa näkymän uudelleenrenderöinnin, jonka takia on tärkeää seurata nimen tilaa tilamuuttujalla.

Alempana on vielä tarkemmat, tekoälyn tuottamat kuvaukset oleellisimmista asioista. Vaikka tekoälyn tuottamaa tekstiä kohtaan kannattaa aina olla kriittinen ja varmistua myös itse tiedon paikkansa pitävyydestä, on tekoäly todella hyödyllinen apu esimerkiksi opiskellessa ohjelmointiin liittyviä käsitteitä, React-komponentteja ja JavaScript/TypeScript -koodia.

## Vite + React -projektin alustus ja perusteet

1. Vite-kehitysympätistö on pohjimmiltaan Node-paketti, joka voidaan asentaa npm:llä komennolla (asennetaan React + TypeScript template)
    - `npm create vite@latest . -- --template react-ts`

2. Vite asentaa kaikki kehitysympäristön tarvitsemat riippuvuudet ja suorittaa tarvittavat rutiinit, joten React-sovelluksen ohjelmointi voidaan aloittaa saman tien.

3. `index.html` toimii React-sovelluksen sisääntulopisteenä (entry point), joka tulostetaan selaimessa. Kaikki React-sisältö renderöidään root-diviin.
    - Tyypillisesti `index` on osa sovelluksen staattisia tiedostoja `public`-kansiossa, mutta Vite tekee poikkeuksen ja se löytyy sovelluksen juuresta.

4. `main.tsx` viittaa `index.html` root-diviin ja renderöi React-sovelluksen juurikomponentin sen sisälle. `main.tsx` määrittelee, mitä komponentteja React-juuren sisällä näytetään.

5. `App.tsx` on oletuksena ainut näytettävä komponentti. Juuressa oletuksena näytettävän komponentin nimi ei tarvitse olla "App", mutta tämä on yleinen käytäntö.
    - Voit renderöidä useamman komponentin rinnakkain juuressa tai tuoda ne App-komponentin tasolla rinnakkain, ei väliä.

## React-hookit (Tekoälyn (Claude.ai, 2025) tuottamat kuvaukset)

React on JavaScript-kirjasto, jota käytetään käyttöliittymien rakentamiseen. React-hookit ovat funktioita, jotka antavat mahdollisuuden käyttää Reactin ominaisuuksia, kuten tilanhallintaa, funktionaalisissa komponenteissa. Tässä ovat yleisimmät React-hookit selitettynä lyhyesti:

### 1. `useState`-tilamuuttuja
`useState` on hook, joka mahdollistaa tilan (state) käytön funktionaalisissa komponenteissa. Se palauttaa taulukon, jossa on kaksi asiaa:
- Nykyinen tilan arvo
- Funktio tilan päivittämiseen

Demossa on kaksi `useState`-tilamuuttujaa:

```typescript
  const [tervehdys, setTervehdys] = useState<string>("");
  const [nimi, setNimi] = useState<string>("");
```

Kun kutsutaan `setTervehdys()` tai `setNimi()`, React päivittää komponentin kutsutun metodin suluissa annetulla arvolla (parametri).

### 2. `onClick`-tapahtumakäsittelijä

`onclick`-reagoi käyttäjän klikkauksiin. Esimerkissä painike tulostaa `tervehdys`-tilamuuttujan.

```tsx
const sanoHeippa = () : void => {

    setTervehdys(`Tervehdys, ${nimi}!`);

  }

<button onClick={sanoHeippa}>Sano heippa</button>

{(Boolean(tervehdys)) 
        ? <div className="tervehdysteksti">
            {tervehdys}
          </div> 
        : null
      }
```

Demossa `tervehdys` on oletuksena tyhjä. `sanoHeippa()` asettaa tervehdykseksi "Tervehdys" + `nimi`-tilamuuttujan arvon. Demossa on alempana koodia ohjausrakenne (ternary operaattori, eli lyhennetty if-ehtolause), joka tarkastaa `tervehdys` totuusarvon.
- Muunnetaan string-tyyppi booleaniksi (`true`/`false`). Boolean on `true`, jos `tervehdys` sisältää merkkejä. Boolean on `false`, jos `tervehdys` on tyhjä.
- Jos ehto on `false`, suoritetaan ternarylauseen `:` jälkeinen osa `null`, eli ei mitään.
- Jos ehto on `true`, ternarylauseen `?` jälkeinen osa palautetaan, eli näytetään tervehdyksen div-elementti.

### 3. `onChange`-tapahtumakäsittelijä

`onchange` aktivoituu aina kun kentän arvo muuttuu. React välittää tapahtumaobjektin (event/e) käsittelijäfunktiolle ja tekstikentän arvo löytyy `e.target.value`:sta.

```tsx
const [nimi, setNimi] = useState<string>("");

<input type="text" placeholder="Anna nimesi..." onChange={ ( e ) => { setNimi(e.target.value) } } />
```

Nuolifunktion käyttö on hyvä opetella, koska silloin ei tarvitse joka kerta määrittää erillistä funktiota, jota kutsutaan. `onChange`-lohkossa ajetaan nuolifunktio, jonka parametriksi on annettu tapahtumaobjekti `e`. Tämä saadaan input-kentästä automaattisesti, kun se määritetään käyttämään `onChange`-tapahtumakäsittelijää. Tapahtumaobjekti `e` sisältää tiedon `target`, jolla viitataan tapahtumaobjektin kohteeseen (tässä input-kenttä). `target`-tiedon alla on `value`, jolla nimensä mukaisesti viitataan valitun kohteen sisältämään arvoon (eli tässä input-kenttä on valittu ja sen arvo on sen sisältämä kirjoitus).

Tapahtumakäsittelijä suoritetaan joka muutoksella, eli `nimi` päivittyy joka kerta, kun input-kenttään tehdään muutos. Voit testata reaaliaikaista tiedon muutosta luomalla väliaikaisen tulostuksen nimelle komponentin palautukseen, joka näkyy selaimessa. Esim:

```tsx
<input type="text" placeholder="Anna nimesi..." onChange={ ( e ) => { setNimi(e.target.value) } } />


<p>{nimi}</p>
```

.