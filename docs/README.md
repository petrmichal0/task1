## Název a popis projektu
Backend aplikace pro správu úkolů je serverová aplikace napsaná v Node.js, která umožňuje vytváření, čtení, aktualizaci a mazání úkolů (CRUD operace). Poskytuje také dashboard s vtipy o Chucku Norrisovi a kalkulátor data využívající historii přidaných a odebraných dnů. Renderování uživatelského rozhraní je řešeno pomocí šablonovacího systému Mustache.

## Stav projektu
![Static Badge](https://img.shields.io/badge/status-online-brightgreen)

## Demo aplikace
[🔗 Demo aplikace](https://task-1-2a00120ff414.herokuapp.com/)

## Obsah
- [Název a popis projektu](#název-a-popis-projektu)
- [Stav projektu](#stav-projektu)
- [Demo aplikace](#demo-aplikace)
- [Obsah](#obsah)
- [Funkce](#funkce)
- [Instalace](#instalace)
  - [Požadavky](#požadavky)
  - [Postup instalace](#postup-instalace)
  - [Nastavení proměnných prostředí](#nastavení-proměnných-prostředí)
- [Použití](#použití)
  - [Spuštění v režimu vývoje](#spuštění-v-režimu-vývoje)
  - [Spuštění v produkčním režimu](#spuštění-v-produkčním-režimu)
- [API Endpointy](#api-endpointy)
- [Struktura projektu](#struktura-projektu)
- [Použité technologie](#použité-technologie)
- [Knihovny třetích stran](#knihovny-třetích-stran)

## Funkce
- Správa úkolů (vytváření, aktualizace, mazání a zobrazení úkolů)
- Kalkulace dat s historií
- Dynamický dashboard s integrací API pro načítání vtipů o Chucku Norrisovi
- Renderování šablon pomocí Mustache
- Zpracování chyb a validace vstupních dat

## Instalace

### Požadavky
- Node.js (v21.0.0 nebo novější)
- npm (v11 nebo novější)

### Postup instalace

1. Naklonování repozitáře:
    ```bash
    git clone https://github.com/petrmichal0/task1.git
    ```

2. Přejděte do složky projektu:
    ```bash
    cd task1
    ```

3. Instalace závislostí:
    ```bash
    npm install
    ```

### Nastavení proměnných prostředí

1. **Vytvoření souboru `.env`:**  
   V kořenovém adresáři projektu vytvořte soubor `.env`.

2. **Definování požadovaných proměnných prostředí:**  
   Přidejte následující proměnné do vašeho souboru `.env`. 

    ```env
    NODE_ENV=development
    PORT=3000
    ```

3. **Zabezpečení souboru:**
   - Přidejte `.env` do `.gitignore`, aby nebyl nahrán do repozitáře a citlivé údaje zůstaly chráněné.

## Postup spuštění

### Spuštění v režimu vývoje

Spusťte vývojový server pomocí nodemon:

```bash
npm run dev
```

Aplikace se spustí s nodemonem, který ji automaticky restartuje při změně kódu.
Výchozí port: 3000
API bude dostupné na http://localhost:3000.

### Spuštění v produkčním režimu

To start the application in production mode, use the following command:

```bash
npm start
```
Aplikace poběží s `NODE_ENV=production`. na výchozím portu `3000`.

## API Endpointy

<table>
  <tr>
    <th style="background-color:#d6eaf8; color:#000000;">HTTP Metoda</th>
    <th style="background-color:#d6eaf8; color:#000000;">Endpoint</th>
    <th style="background-color:#d6eaf8; color:#000000;">Popis</th>
    <th style="background-color:#d6eaf8; color:#000000;">Příklad požadavku</th>
    <th style="background-color:#d6eaf8; color:#000000;">Příklad odpovědi</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>/tasks</td>
    <td>Získání všech úkolů</td>
    <td>None</td>
    <td>
      {
        "tasks": [
          { "id": 1, "title": "Dokončit dokumentaci", "status": "v řešení" }
        ]
      }
    </td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/tasks/create</td>
    <td>Zobrazení stránky pro vytvoření úkolu</td>
    <td>None</td>
    <td>
      HTML stránka s formulářem pro vytvoření úkolu
    </td>
  </tr>
  <tr>
    <td>POST</td>
    <td>/tasks/create</td>
    <td>Vytvoření nového úkolu</td>
    <td>{ "title": "Nový úkol" }</td>
    <td>
      {
        "id": 1738199195603,
        "title": "Nový úkol",
        "status": "nový",
        "dueDate": "2025-01-30"
      }
    </td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/tasks/:id</td>
    <td>Získání úkolu podle ID</td>
    <td>/tasks/1738199195603</td>
    <td>
      {
        "id": 1738199195603,
        "title": "Nový úkol",
        "status": "nový",
        "dueDate": "2025-01-30"
      }
    </td>
  </tr>
  <tr>
    <td>PATCH</td>
    <td>/tasks/:id</td>
    <td>Aktualizace existujícího úkolu</td>
    <td>{ "title": "Upravený úkol", "status": "v řešení" }</td>
    <td>
      {
        "id": 1738199195603,
        "title": "Upravený úkol",
        "status": "v řešení",
        "dueDate": "2025-01-30"
      }
    </td>
  </tr>
  <tr>
    <td>DELETE</td>
    <td>/tasks/:id</td>
    <td>Smazání úkolu</td>
    <td>/tasks/1738199195603</td>
    <td>
      {
        "message": "Úkol byl smazán."
      }
    </td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/date</td>
    <td>Získání aktuálně vypočítaného data</td>
    <td>/date?numberOfday=5</td>
    <td>
      {
        "date": "2025-02-04",
        "history": ["2025-01-30"],
        "added": ["2025-02-04"],
        "removed": []
      }
    </td>
  </tr>
  <tr>
    <td>GET</td>
    <td>/</td>
    <td>Získání dashboardu</td>
    <td>None</td>
    <td>
      HTML stránka s vtipem o Chucku Norrisovi
    </td>
  </tr>
</table>

## Project Structure

```css
task1/
├── controllers/
│   ├── dashboardController.js
│   ├── dateController.js
│   ├── errorController.js
│   ├── tasksController.js
├── data/
│   └── tasks.json
├── public/
│   ├── createTask.css
│   ├── dashboard.css
│   ├── date.css
│   ├── error.css
│   ├── global.css
│   ├── taskDetails.css
│   └── tasks.css
├── routes/
│   ├── dashboardRoutes.js
│   ├── dateRoutes.js
│   └── tasksRoutes.js
├── utils/
│   ├── createAppError.js
│   └── fileUtils.js
├── validators/
│   ├── dateValidator.js
│   └── tasksValidator.js
├── views/
│   ├── createTask.mustache
│   ├── dashboard.mustache
│   ├── date.mustache
│   ├── dev-error.mustache
│   ├── error.mustache
│   ├── taskDetails.mustache
│   └── tasks.mustache
├── .env
├── .gitignore
├── app.js
├── server.js
├── package.json
```

## Použité technologie

[![Node.js Badge](https://img.shields.io/badge/-Node.js-43853D?style=for-the-badge&labelColor=black&logo=node.js&logoColor=43853D)](#)
[![Express Badge](https://img.shields.io/badge/-Express-000000?style=for-the-badge&labelColor=black&logo=express&logoColor=white)](#)

## Knihovny třetích stran

* **axios**: HTTP klient založený na promise pro provádění požadavků na externí API.
* **date-fns**: Moderní knihovna JavaScriptu pro manipulaci s daty a časy.
* **dotenv**: Modul pro načítání proměnných prostředí ze souboru `.env` do `process.env`.
* **express-validator**: Sada middlewarů pro validaci dat v aplikacích využívajících Express.js.
* **fast-array-diff**: Knihovna pro výpočet rozdílů mezi dvěma poli.
* **Mustache**: Šablonovací engine bez logiky pro renderování HTML šablon.
* **nodemon** (devDependency): Nástroj, který automaticky restartuje server Node.js při změně souborů během vývoje.



