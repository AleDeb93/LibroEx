# LibExplorer App

L'applicazione LibExplorer è un'app basata su Angular che consente agli utenti di cercare libri in base a categorie specifiche tramite le API di Open Library.

## Requisiti per l'ambiente locale

Per provare l'applicazione in locale scarica il file zip oppure usa il comando `git clone` specificando l'URL del repo.

Se non presente installa Node.js sul tuo sistema.
Dopo aver installato Node.js, esegui il seguente comando per installare Angular CLI globalmente; `npm install -g @angular/cli` quindi `cd libroex`

A questo punto puoi avviare l'applicazione sul localhost tramite il comando `ng s`. L'app sarà disponibile all'indirizzo http://localhost:4200/.

## Funzionalità Principali

### Ricerca per Categoria:
Inserisci una categoria nella casella di ricerca.
Fai clic su "Cerca" per visualizzare la lista di libri correlati alla categoria.

### Dettagli del Libro:
Fai clic su un libro per visualizzarne i dettagli.
Puoi leggere la descrizione completa del libro.

## Testing
Per visualizzare la copertura di test eseguire in console il comando `ng test --code-coverage`

## Librerie Esterne
Angular Material: Componenti UI basati su Material Design.

Bootstrap: Utilizzato per la formattazione e la struttura del layout.

Font Personalizzato: Aggiunto nella cartella src/assets/fonts e configurato in styles.css.

